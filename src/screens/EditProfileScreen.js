import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView, TextInput, Platform } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { setUser } from '../redux/userReducer'
import { getData } from "../asyncStorage";
import { COLORS, COUNTRY_LIST } from "../config";
import axios from 'axios';
import InputFieledComponent from "../components/InputFieledComponent";
import { CountryPicker } from "react-native-country-codes-picker";
import { updateUser, BASE_URL, IMAGE_PATH, updateProfile, attachmentUpload, getToken, API } from "../services/userServices";
import { setData } from '../asyncStorage'

const { height, width } = Dimensions.get('screen');
const EditProfile = (props) => {
  const user = useSelector((state) => state.userReducer.userInfo);
  const [updatedUserImage, setUpdatedUserImage] = useState(null)
  const [updatedUserName, setUpdatedUserName] = useState(null)
  const [updatedUserEmail, setUpdatedUserEmail] = useState(null)
  const [updatedUserContact, setUpdatedUserContact] = useState(null)
  const [signUpLoader, setSignUpLoader] = useState(false)


  const [show, setShow] = useState(false);
  const [updatedCountryCode, setUpdatedCountryCode] = useState(null);
  const [updatedCountryFlag, setUpdatedCountryFlag] = useState(null);

  useEffect(() => {
    if(user?.image){
      setUpdatedUserImage(user?.image)
    }
    setUpdatedUserName(user?.name)
    setUpdatedUserEmail(user?.email)
    setUpdatedCountryFlag(user?.country_flag)
    user?.country_code && setUpdatedCountryCode(user?.country_code)
    setUpdatedUserContact(user?.contact)
  }, [user])

  const discardChanges = () => {
    getData('@user').then(u => {
      console.log(u);

      dispatch(setUser(u))
    })
  }
  const saveChanges = async () => {

    updateProfile({
      user_id:user?.id,
      name:updatedUserName,
      country_code:updatedCountryCode,
      contact:updatedUserContact,
      image:updatedUserImage
    })
    .then(res=>{
      console.log('rrrrrrrrrrrrrr',res);
      if(res?.code==200){
        setUser(res?.data?.user)
      }
      
    })

  };



  const openGallery = async () => {
    try {
        // Launch the image library
        const result = await ImagePicker.openPicker({
            width: 150, // Set the width of the cropped area
            height: 150, // Set the height of the cropped area
            cropping: true, // Enable cropping
            cropperCircleOverlay: true, // Show a circular overlay for cropping
        });

        const token = getToken();
        const data = new FormData();

        // Check if the attachment is available and append it
        if (result) {
            // Ensure `attachment` is a valid object and its properties are available
            data.append('attachment', {
                uri: result.path, // Use result.path directly
                type: result.mime, // Ensure this is the correct MIME type
                name: `${user?.name || 'image'}.${result.mime.split('/')[1]}`, // Use a default name and add the extension
            });
        } else {
            return Promise.reject({ status: 'No Attachment', data: 'No file provided for upload' });
        }

        // Send the POST request
        const response = await axios.post(
            `${BASE_URL + API}/file-upload`,
            data,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        console.log('Response received:', response.data?.file_path);
          
        // Get the cropped image URI and log it
        const imageUri = result.path;
        console.log('Cropped image URI:', imageUri);
        setUpdatedUserImage(response.data?.file_path);
        
    } catch (error) {
        // Handle and log errors appropriately
        console.error('Error opening gallery: ', error);
        if (error.response) {
            console.error('Upload error response:', error.response.data);
        }
    }
};

  return (
    <ScrollView height={height}>
      {console.log(updatedUserImage)}
      
      <View style={styles.mainContainer}>
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: height * 0.4, paddingTop: height * 0.02 }}>
          <View style={{ position: 'relative' }}>
            {console.log('1111111111',BASE_URL+IMAGE_PATH+updatedUserImage)
            }
            <Image  source={
              updatedUserImage
                ? { uri: BASE_URL+IMAGE_PATH+updatedUserImage }
                : require('../assetes/images/profile.png')
            } style={{ borderWidth: 2, borderColor: '#FF5F00', borderRadius: 100, height: width * 0.35, width: width * 0.35 }} />

            <TouchableOpacity
              onPress={() => openGallery()}
              style={{ position: 'absolute', right: 4, bottom: 4 }}
            >
              <Image source={require('../assetes/images/camera.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ width: width, padding: width * 0.04, backgroundColor: '#FFF', height: height * 0.75, bottom: 0, position: 'absolute', paddingTop: height * 0.05 }}>
          <View style={{ paddingVertical: 20 }}>
            <View style={{ marginBottom: 20, height: 60 }}>

              <InputFieledComponent label={'Name'} text={updatedUserName} setText={setUpdatedUserName} />
            </View>
            <View style={{ marginBottom: 20, height: 60 }}>

              <InputFieledComponent label={'Email'} editAble={false} text={updatedUserEmail} setText={setUpdatedUserEmail} />
            </View>
            <View style={[styles.phoneInputRow, { borderColor: '#0004', overflow: 'hidden', borderWidth: 0.5, borderRadius: 8, width: width * 0.85, alignSelf: 'center', flexDirection: 'row' }]}>
              <TouchableOpacity
                searchMessage={true}
                disabled={signUpLoader}
                onPress={() => setShow(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: 80,
                  height: 50,
                  justifyContent: 'center',
                  backgroundColor: '#0002'
                }}
              >
                <Text style={{
                  verticalAlign: 'middle'
                }}>
                  {console.log('nnnnnnnnnnnnnnn', typeof updatedCountryCode,COUNTRY_LIST[updatedCountryCode])
                  }
                  {COUNTRY_LIST[updatedCountryCode]?.flag} {updatedCountryCode}
                </Text>
              </TouchableOpacity>
             
              <TextInput
                keyboardType="phone-pad"
                editable={!signUpLoader}
                placeholder="Phone Number"
                value={updatedUserContact}
                onChangeText={(text) => setUpdatedUserContact(text)}
              />
          
              <CountryPicker
              inputPlaceholder="Select"
                show={show}
                initialState={updatedCountryFlag}
                // when picker button press you will get the country object with dial code
                pickerButtonOnPress={(item) => {
                  setUpdatedCountryCode(item.dial_code);
                  setShow(false);
                }}
                style={{
                  modal: {
                    height: height * 0.5,
                  },
                }}
              />
            </View>
          </View>
          <View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: width * 0.04 }}>
              <TouchableOpacity
                onPress={() => { discardChanges() }}
                style={[styles.editButn, { backgroundColor: '#939393' }]}
              >
                <Text style={{ color: '#FFF' }}>Discard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => saveChanges()}
                style={[styles.editButn, { backgroundColor: '#FF5F00' }]}
              >
                <Text style={{ color: '#FFF' }}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    position: 'relative',
    backgroundColor: '#031D53'
  },
  editButn: {
    width: width / 2.5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.02
  },
  orderBox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#031D53', height: width * 0.25, width: width * 0.27, borderRadius: 15, justifyContent: 'center', alignItems: 'center'
  },
  bottomTabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10

  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
})
export default EditProfile;