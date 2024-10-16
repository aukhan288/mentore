import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, StyleSheet, Alert } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { submitForgotPassword } from '../services/userServices';
import InputFieledComponent from "../components/InputFieledComponent";
import { COLORS } from "../config";

const { height, width } = Dimensions.get('screen');
const ChangeForgotPassword = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(null);
  const [confirmChangePassword, setconfirmChangePassword] = useState(null);
  const [changePasswordError, setChangePasswordError] = useState(null);
  const [confirmChangePasswordError, setConfirmChangePasswordError] = useState(null);
  const navigation = useNavigation();
  const submit =()=>{
    submitForgotPassword({
      changePassword:changePassword, 
      confirmChangePassword:confirmChangePassword, 
      otp:props?.route?.params?.otp,
      email:props?.route?.params?.email
    })
    .then(res=>{
      console.log('==============>',res)
      Alert.alert(res?.message);
      if(res?.success){
        navigation.navigate('Login');
      }
      
    })
  }
  return (
    <View style={styles.mainContainer}>
   <Text style={{width:width, paddingHorizontal:width*0.04, color:COLORS.BLUE, fontWeight:'700',fontSize:width*0.06, marginBottom:30}}>Change Password</Text>
   <View style={{width:width, height:80}}>
          <InputFieledComponent label='Change Password' text={changePassword} setText={setChangePassword} setErr={setChangePasswordError} />
        </View>
   <View style={{width:width, height:80}}>
          <InputFieledComponent label='Confirm Change Password' text={confirmChangePassword} setText={setconfirmChangePassword} setErr={setConfirmChangePasswordError} />
        </View>
        <TouchableOpacity 
        onPress={()=>submit()}
        style={styles.loginBtn}>
          <Text style={styles.loginText}>Submit</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    backgroundColor: '#FFFFFF',
    display: "flex",
    flex: 1,
    flexDirection: "column",
    paddingTop:height*0.05,
    alignItems: "center",
    paddingHorizontal: width * 0.2
  },

  formView: {
    width: width,
    alignItems: 'center', marginTop: height * 0.05,
    paddingHorizontal: width * 0.1
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderBlockColor: "#0008",
    paddingLeft: 10,
    borderRadius: 7,
    marginBottom: 15
  },
  loginBtn: {
    backgroundColor: '#1B2A56',
    width: width*0.92,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 7,
    marginTop: 20,
    position:'absolute',
    bottom:20
  },
  loginText: {
    color: '#FFF'
  },
 
})
export default ChangeForgotPassword;