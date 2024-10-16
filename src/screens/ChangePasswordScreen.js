import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView, TextInput, Alert } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import InputFieledComponent from "../components/InputFieledComponent";
import { changePassword } from '../services/userServices';
import ErrorComponent from "../components/ErrorComponent";

const { height, width } = Dimensions.get('screen');
const ChangePassword = (props) => {
  const user = useSelector((state) => state.userReducer.userInfo);
  
  const [ oldPassword, setOldPassword]=useState(null)
  const [ newPassword, setNewPassword]=useState(null)
  const [ newConfirmPassword, setNewConfirmPassword]=useState(null)
  const [ oldPasswordError, setOldPasswordError]=useState(null)
  const [ newPasswordError, setNewPasswordError]=useState(null)
  const [ newConfirmPasswordError, setNewConfirmPasswordError]=useState(null)
  const saveChanges=()=>{
    changePassword({
      user_id:user?.id,
      oldPassword:oldPassword, 
      newPassword:newPassword, 
      newConfirmPassword:newConfirmPassword
    })
    .then(res=>{
      Alert.alert(res?.message);
      console.log('kkkkkkkkkkkk',res);
      
      if(res?.data?.errors.hasOwnProperty('current_password')){
        setOldPasswordError(res?.data?.errors?.current_password[0])
      }
      if(res?.data?.errors.hasOwnProperty('newPassword')){
        setNewPasswordError(res?.data?.errors?.newPassword[0])
      }
      if(res?.data?.errors.hasOwnProperty('confirmPassword')){
        setNewConfirmPasswordError(res?.data?.errors?.confirmPassword[0])
      }
      
      
    })
  }

  return (
    <ScrollView height={height}>
      <View style={styles.mainContainer}>


       
      <View style={{position:'absolute',top:height*0.15, alignSelf:'center'}}>
      <View style={{  height: 60,width:width }}>

<InputFieledComponent label={'Old Password'} text={oldPassword} setText={setOldPassword} err={oldPasswordError}/>
</View>
<View style={{paddingHorizontal:width*0.04,marginBottom: height*0.04,}}>
<ErrorComponent error={oldPasswordError}/>
</View>
<View style={{  height: 60,width:width }}>

<InputFieledComponent label={'New Password'}  text={newPassword} setText={setNewPassword} err={newPasswordError}/>
</View>
<View style={{paddingHorizontal:width*0.04, marginBottom: height*0.04,}}>
<ErrorComponent error={newPasswordError}/>
</View>
<View style={{  height: 60,width:width }}>

<InputFieledComponent label={'Retype New Password'}  text={newConfirmPassword} setText={setNewConfirmPassword} err={newConfirmPasswordError}/>
</View>
<View style={{paddingHorizontal:width*0.04, marginBottom: height*0.04,}}>
<ErrorComponent error={newConfirmPasswordError}/>
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