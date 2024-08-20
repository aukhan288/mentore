import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, StyleSheet, KeyboardAvoidingView, KeyboardAvoidingViewBase } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {CountryPicker} from "react-native-country-codes-picker";
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'
import ErrorComponent from "../components/ErrorComponent";
import { createUser } from '../services/signup'

const { height, width } = Dimensions.get('screen');
const Register = () => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [dob, setDob] = useState('');
  const [nameError, setNameError] = useState(null);
  const [emailError,setEmailError] = useState(null);
  const [cellError,setCellError] = useState(null);
  const [dobError,setDobError] = useState(null);
  const [passwordError,setPasswordError] = useState(null);
  const [confirmPasswordError,setConfirmPasswordError] = useState(null);

   
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('🇵🇰 +92');
  const navigation = useNavigation();

  const signUp=()=>{
    createUser({name:name,email:email}).then(res=>{
      console.log("#########")
      console.log(res)
    })
    .catch(e=>{
      console.log("*************")
      console.log(e)
    })
  }
  return (
    <View style={styles.mainContainer}>
      <View style={{width:width,paddingHorizontal:width*0.04}}>
      <Image source={require('../assetes/images/logo.png')} 
      style={{marginTop:height*0.03, width:width*0.36, height:width*0.1}}
      />
      <Text style={{fontSize:width*0.07, color:'#1B2A56',marginTop:height*0.05}}>Create Account</Text>
      </View>
      <KeyboardAvoidingView style={styles.formView}>
      
        <TextInput 
          placeholder="Name" 
          keyboardType="default"
          onChangeText={(text) => setName(text)}
          maxLength={30}
          style={[styles.textInput, {borderColor: nameError?'red':"#0008"}]} />
          {nameError && <ErrorComponent error={nameError} />}
          
        <TextInput 
          placeholder="Email" 
          keyboardType="email-address" 
          onChangeText={(text) => setEmail(text)}
          style={[styles.textInput, {borderColor: nameError?'red':"#0008"}]}/>
          {emailError && <ErrorComponent error={emailError} />}
        <View style={styles.phoneInputRow}>
        <TouchableOpacity
        searchMessage={true}
        onPress={() => setShow(true)}
        style={{
            display:'flex',
            alignItems:'center',
            width:80,
            height:50,
            justifyContent:'center',
            backgroundColor:'#0002'
        }}
      >
        <Text style={{
            verticalAlign:'middle'
        }}>
            {countryCode}
        </Text>
      </TouchableOpacity>
      <TextInput 
       keyboardType="phone-pad"
       placeholder="Phone Number"
       />
      <CountryPicker
        show={show}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          console.log(item.flag);  
          setCountryCode(item.flag+" "+item.dial_code);
          setShow(false);
        }}
        style={{
          modal: {
            height: height*0.5,
          }, 
        }}
        />
        </View>
        {emailError && <ErrorComponent error={emailError} />}

        <TouchableOpacity
          style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:width*0.92, marginBottom:height*0.02, borderWidth:1,borderRadius:8,paddingHorizontal:width*0.025,paddingVertical:height*0.01}}
            onPress={() => setOpen(true)}
            >
            <Text>Select Date</Text>
            <Icon name="calendar" size={width*0.08} />
          </TouchableOpacity>
      <DatePicker
      mode="date"
        modal
        dividerColor="#FF5F00"
        buttonColor="#FF5F00"
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
        <View style={[styles.passwordInputRow,{borderColor:passwordError?'red':'#0004'}]}>
          <TextInput 
          placeholder="Password" 
          style={{ flex: 0.9 }} 
          onChangeText={(text=>setPasswordError(text))}
          secureTextEntry={showPassword} />
          <TouchableOpacity
            style={styles.eyeBtn}
            onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <Icon name="eye" size={30} color="#0007" /> :
              <Icon name="eye-slash" size={30} color="#0007" />}
          </TouchableOpacity>
        </View>
        {passwordError && <ErrorComponent error={passwordError} />}
        <View style={[styles.passwordInputRow,{borderColor:confirmPasswordError?'red':'#0004'}]}>
          <TextInput 
          placeholder="Confirm Password" 
          style={{ flex: 0.9 }} 
          onChangeText={(text=>setConfirmPasswordError(text))}
          secureTextEntry={showConfirmPassword} />
          <TouchableOpacity
            style={styles.eyeBtn}
            onPress={() => setConfirmShowPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <Icon name="eye" size={30} color="#0007" /> :
              <Icon name="eye-slash" size={30} color="#0007" />}
          </TouchableOpacity>
        </View>
        {confirmPasswordError && <ErrorComponent error={confirmPasswordError} />}
         
        <TouchableOpacity
        onPress={signUp}
        style={styles.loginBtn}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.orRow}>
          <View style={styles.hrView}></View>
          <Text style={{ fontWeight: '700', fontSize: 20 }}>OR</Text>
          <View style={styles.hrView}></View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text>Already have account?</Text>
          <TouchableOpacity style={{ paddingLeft: 8 }}
            onPress={() => { navigation.navigate('Register') }}
          >
            <Text style={styles.signUpTxt}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    backgroundColor: '#F4FAEB',
    display: "flex",
    flex: 1,
    alignItems: "center",
  },
  signHeading:{
    alignSelf:'center',
    width:'100%',
    color:'#1B2A56',
    fontWeight:'800',
    fontSize:width*0.09,
    marginBottom:height*0.02
  },
  logo: {
    height: width * 0.25,
    width: width * 0.8
  },
  formView: {
    width: width,
    alignItems: 'center', marginTop: height * 0.02,
    paddingHorizontal: width * 0.04
  },
  passwordInputRow: {
    display: "flex",
    flexDirection: 'row',
    position: 'relative',
    borderRadius: 8,
    borderWidth: 1,
    marginTop:height*0.02
  },
  phoneInputRow: {
    display: "flex",
    width:'100%',
    flexDirection: 'row',
    position: 'relative',
    borderRadius: 8,
    borderWidth: 1,
    marginTop:height*0.02,
    alignItems:'center'
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 7,
    marginTop: 15
  },
  loginBtn: {
    backgroundColor: '#1B2A56',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 7,
    marginTop: 20
  },
  loginText: {
    color: '#FFF'
  },
  eyeBtn: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.02
  },
  signUpTxt: {
    fontWeight: '700',
    fontSize: 16,
    color: '#FF5F00',
    textDecorationLine: 'underline'
  },
  orRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  hrView: {
    borderBottomWidth: 1,
    width: '40%'
  }
})
export default Register;