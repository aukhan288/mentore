import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, StyleSheet, ImageBackground } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
const { height, width } = Dimensions.get('screen');
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  return (
    <View style={styles.mainContainer}>
      <View style={{width:width,paddingHorizontal:width*0.04}}>
      <Image source={require('../assetes/images/logo.png')} 
      style={{marginTop:height*0.04, width:width*0.36, height:width*0.1}}
      />
      <Text style={{fontSize:width*0.07, color:'#1B2A56',marginTop:height*0.05}}>Login</Text>
      </View>
      <View style={styles.formView}>
        <TextInput 
          placeholder="Email" 
          keyboardType="email-address" 
          style={styles.textInput} />
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
        <View style={{flexDirection:'row',justifyContent:'space-between',width:width*0.91}}>
        <View style={{flexDirection:'row',alignItems:'center',marginTop:height*0.03}}>
        <CheckBox
    disabled={false}
    value={toggleCheckBox}
    tintColors={{ true: '#1B2A56', false: '#CCCCCC' }} 
    onValueChange={(newValue) => setToggleCheckBox(newValue)}
  />
  <Text>Remember me</Text>
        </View>
        <TouchableOpacity
        onPress={()=>{navigation.navigate('ForgotPassword')}}
        style={{ alignSelf: 'flex-end', marginTop: height * 0.01 }}>
          <Text style={{color:'#FF5F00'}}>Forgot Password?</Text>
        </TouchableOpacity>
        </View>
       
      </View>
      <View style={{position:'absolute',bottom:height*0.02,width:width,justifyContent:'center',}}>
      <TouchableOpacity 
        onPress={()=>{navigation.navigate('DrawerStack')}}
        style={styles.loginBtn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        {/* <View style={styles.orRow}>
          <View style={styles.hrView}></View>
          <Text style={{ fontWeight: '700', fontSize: 20 }}>OR</Text>
          <View style={styles.hrView}></View>
        </View> */}
        <View style={{ flexDirection: 'row', alignItems:'center',justifyContent:'center', marginTop: 20 }}>
          <Text>New here?</Text>
          <TouchableOpacity style={{ paddingLeft: 8 }}
            onPress={() => { navigation.navigate('Register') }}
          >
            <Text style={styles.signUpTxt}>Create Account</Text>
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
    position:'relative'
  },
  logo: {
    marginTop:height*0.03, 
    width:width*0.36, 
    height:width*0.1
  },
  formView: {
    width: width,
    alignItems: 'center', marginTop: height * 0.05,
    paddingHorizontal: width * 0.05
  },
  passwordInputRow: {
    display: "flex",
    flexDirection: 'row',
    position: 'relative',
    borderRadius: 8,
    borderWidth: 1,
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderBlockColor: "#0008",
    paddingLeft: 10,
    borderRadius: 7,
    marginBottom: height*0.03
  },
  loginBtn: {
    backgroundColor: '#1B2A56',
    width: width*0.91,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 7,
    marginTop: 20,
    alignSelf:'center'
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
    // textDecorationLine: 'underline'
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
export default Login;