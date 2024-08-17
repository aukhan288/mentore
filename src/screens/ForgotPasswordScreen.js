import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get('screen');
const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
   
      <View style={styles.formView}>
        <TextInput 
          placeholder="Email" 
          keyboardType="email-address" 
          style={styles.textInput} />
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Submit</Text>
        </TouchableOpacity>
        

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
    width: '100%',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 7,
    marginTop: 20
  },
  loginText: {
    color: '#FFF'
  },
 
})
export default ForgotPassword;