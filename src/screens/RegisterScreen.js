import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {CountryPicker} from "react-native-country-codes-picker";
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'
const { height, width } = Dimensions.get('screen');
const Register = () => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
    function ListHeaderComponent({countries, lang, onPress}) {
        return (
            <View
                style={{
                    paddingBottom: 20,
                }}
            >
                <Text>
                    Popular countries
                </Text>
                {countries?.map((country, index) => {
                    return (
                        <CountryButton key={index} item={country} name={country?.name?.[lang || 'en']} onPress={() => onPress(country)} />
                    )
                })}
            </View>
        )
    }

  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('🇵🇰 +92');
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={{width:width,paddingHorizontal:width*0.04}}>
      <Image source={require('../assetes/images/logo.png')} 
      style={{marginTop:height*0.03, width:width*0.36, height:width*0.1}}
      />
      <Text style={{fontSize:width*0.07, color:'#1B2A56',marginTop:height*0.05}}>Create Account</Text>
      </View>
      <View style={styles.formView}>
      
        <TextInput 
          placeholder="Name" 
          keyboardType="default" 
          style={styles.textInput} />
        <TextInput 
          placeholder="Email" 
          keyboardType="email-address" 
          style={styles.textInput} />
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
        <View style={styles.passwordInputRow}>
          <TextInput 
          placeholder="Password" 
          style={{ flex: 0.9 }} 
          secureTextEntry={showPassword} />
          <TouchableOpacity
            style={styles.eyeBtn}
            onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <Icon name="eye" size={30} color="#0007" /> :
              <Icon name="eye-slash" size={30} color="#0007" />}
          </TouchableOpacity>
        </View>
        <View style={styles.passwordInputRow}>
          <TextInput 
          placeholder="Confirm Password" 
          style={{ flex: 0.9 }} 
          secureTextEntry={showConfirmPassword} />
          <TouchableOpacity
            style={styles.eyeBtn}
            onPress={() => setConfirmShowPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <Icon name="eye" size={30} color="#0007" /> :
              <Icon name="eye-slash" size={30} color="#0007" />}
          </TouchableOpacity>
        </View>
         
        <TouchableOpacity style={styles.loginBtn}>
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
      </View>
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
    marginBottom:height*0.02
  },
  phoneInputRow: {
    display: "flex",
    width:'100%',
    flexDirection: 'row',
    position: 'relative',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom:height*0.02,
    alignItems:'center'
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