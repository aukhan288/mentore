import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView, TextInput, Platform } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { setUser } from '../redux/userReducer'
import { getData } from "../asyncStorage";
import { COLORS } from "../config";
import axios from 'axios';
import InputFieledComponent from "../components/InputFieledComponent";
import { CountryPicker } from "react-native-country-codes-picker";
import { updateUser, BASE_URL, IMAGE_PATH } from "../services/userServices";
import { setData } from '../asyncStorage'

const { height, width } = Dimensions.get('screen');
const EditProfile = (props) => {
  const user = useSelector((state) => state.userReducer.userInfo);
  const [updatedUserImage, setUpdatedUserImage] = useState(null)
  const [updatedUserName, setUpdatedUserName] = useState(null)
  const [updatedUserEmail, setUpdatedUserEmail] = useState(null)
  const [updatedUserContact, setUpdatedUserContact] = useState(null)
  const [signUpLoader, setSignUpLoader] = useState(false)

console.log('***********',user);

  const [show, setShow] = useState(false);
  const [updatedCountryCode, setUpdatedCountryCode] = useState(null);
  const [updatedCountryFlag, setUpdatedCountryFlag] = useState(null);

  useEffect(() => {
    setUpdatedUserImage(BASE_URL+IMAGE_PATH+user?.image)
    setUpdatedUserName(user?.name)
    setUpdatedUserEmail(user?.email)
    setUpdatedCountryFlag(user?.country_flag)
    setUpdatedCountryCode(user?.country_code)
    setUpdatedUserContact(user?.contact)
  }, [user])

  const discardChanges = () => {
    getData('@user').then(u => {
      console.log(u);

      dispatch(setUser(u))
    })
  }
  const saveChanges = async () => {
    //  updateUser({
    //     id:user?.id,
    //     name:updatedUserName,
    //     countryFlag:updatedCountryFlag,
    //     countryCode:updatedCountryCode,
    //     contact:updatedUserContact,
    //     image:updatedUserImage,
    //     plate_form:Platform?.OS
    //  },user?.token)

     const data = new FormData();
     
         // Append form data
         data.append('name', updatedUserName || '');
         data.append('country_flag', updatedCountryFlag || '');
         data.append('country_code', updatedCountryCode || '');
         data.append('contact', updatedUserContact || '');
         data.append('plate_form', Platform?.OS || '');
     
     
             data.append('image', {
              uri: updatedUserImage,
              type: 'image/jpeg', // or the actual type of the file
              name: 'image.jpg' // or the actual file name
          }
        );
     
         try {
             const response = await axios.post(
                 `https://app.assignmentmentor.co.uk/mentore-api/public/api/profile-update/${user?.id}`,
                 data,
                 {
                     headers: {
                         'Accept':'application/json',
                         'Content-Type': 'multipart/form-data',
                         'Authorization': `Bearer ${user?.token}`,
                     },
                 }
             );
           
           
             
             setUser(response?.data?.data?.user)
             console.log(user);
             
             
             return response.data;
         } catch (error) {
             console.error('Error:', error.response ? error.response.data : error.message);
             let err = {
                 status: error.response ? error.response.status : 'Unknown',
                 data: error.response ? error.response.data : error.message,
             };
             return Promise.reject(err);
         }
  };



  const openGallery = async () => {

    // Launch the image library
    try {
      const result = await ImagePicker.openPicker({
        width: 150, // Set the width of the cropped area
        height: 150, // Set the height of the cropped area
        cropping: true, // Enable cropping
        cropperCircleOverlay: true, // Show a circular overlay for cropping
      });

      // Log the result to see the image data

      // Get the cropped image URI
      const imageUri = result.path;
      console.log('mmmmmmmmm',result);
      setUpdatedUserImage(imageUri)
      console.log(imageUri);
    } catch (error) {
      console.error('Error opening gallery: ', error);
    }

  };
  return (
    <ScrollView height={height}>
      <View style={styles.mainContainer}>
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: height * 0.4, paddingTop: height * 0.02 }}>
          <View style={{ position: 'relative' }}>
            <Image source={{ uri: updatedUserImage }} style={{ borderWidth: 2, borderColor: '#FF5F00', borderRadius: 100, height: width * 0.35, width: width * 0.35 }} />

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
                  {updatedCountryCode}
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
                  setUpdatedCountryFlag(item.flag);
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