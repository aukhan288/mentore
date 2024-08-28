import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView, TextInput } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { setUser } from '../redux/userReducer'
import { getData } from "../asyncStorage";
import { COLORS } from "../config";
import axios from 'axios';
import InputFieledComponent from "../components/InputFieledComponent";
import { CountryPicker } from "react-native-country-codes-picker";

const { height, width } = Dimensions.get('screen');
const ChangePassword = (props) => {
  const user = useSelector((state) => state.userReducer.user);
  const [updatedPassword, setUpdatedPassword] = useState(null)
  const [updatedNewPassword, setUpdatedNewPassword] = useState(null)
  const [updatedRetypeNewPassword, setUpdatedRetypeNewPassword] = useState(null)


  useEffect(() => {
    setUpdatedPassword(user?.password)
    setUpdatedNewPassword(user?.name)
    setUpdatedRetypeNewPassword(user?.email)
  }, [user])


  return (
    <ScrollView height={height}>
      <View style={styles.mainContainer}>


       
      <View style={{position:'absolute',top:height*0.15, alignSelf:'center'}}>
      <View style={{ marginBottom: height*0.04, height: 60,width:width }}>

<InputFieledComponent label={'Old Password'} text={updatedPassword} setText={setUpdatedPassword} />
</View>
<View style={{ marginBottom: height*0.04, height: 60,width:width }}>

<InputFieledComponent label={'New Password'}  text={updatedNewPassword} setText={setUpdatedNewPassword} />
</View>
<View style={{ marginBottom: height*0.04, height: 60,width:width }}>

<InputFieledComponent label={'Retype New Password'}  text={updatedRetypeNewPassword} setText={setUpdatedRetypeNewPassword} />
</View>
<TouchableOpacity
  onPress={() => saveChanges()}
  style={[styles.editButn, { backgroundColor: '#FF5F00' }]}
>
  <Text style={{ color: '#FFF' }}>Save Password</Text>
</TouchableOpacity>
      </View>
          </View>
       
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    flexDirection: "column",
    backgroundColor: '#FFF',
    position:'relative'
  },
  editButn: {
    width: width*0.91 ,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    paddingVertical: height * 0.02
  },
 
  bottomTabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10

  },
})
export default ChangePassword;