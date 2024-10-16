import { View, Text, StyleSheet, Dimensions, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../config';
import { useNavigation } from '@react-navigation/native';
import { verifyOtp } from '../services/userServices'
import ErrorComponent from '../components/ErrorComponent';

const { height, width } = Dimensions.get('screen');

const ForgotOTP = (props) => {

    const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '']); // State to hold each digit of the OTP
  const [otpError, setOtpError] = useState(null); // State to hold each digit of the OTP

  // Function to handle OTP input change
  const handleInputChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, ''); // Only allow digits
    setOtp(newOtp);

    // Move focus to the next input
    if (text && index < 3) {
      const nextInput = index + 1;
      inputs[nextInput].focus();
    }
  };

  const inputs = [];
const submitOtp=()=>{
  setOtpError(null)
    let userOtp="";
    otp.map(o=>{userOtp=userOtp+o})
      verifyOtp(JSON.stringify({
        otp:otp,
        email:props?.route?.params?.email
      })).then(res=>{
        console.log('111111',res);
        if(res?.success){
          navigation.navigate('ChangeForgotPassword',{otp:otp, email:props?.route?.params?.email})
        }else{
          setOtpError(res?.message)
        }
      })
}
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={{paddingHorizontal:width*0.04, marginBottom:10}}>
        <ErrorComponent error={otpError} />
        </View>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            value={digit}
            onChangeText={(text) => handleInputChange(text, index)}
            keyboardType="numeric"
            maxLength={1} // Only allow one character
            ref={(input) => { inputs[index] = input }} // Reference to input for focus management
          />
        ))}
      </View>
      <Pressable 
      onPress={()=>submitOtp()}
      style={{backgroundColor:COLORS.BLUE, width:width*0.9, justifyContent:'center', position:'absolute', bottom:20, alignItems:'center', padding:10, borderRadius:8, }}>
        <Text style={{color:COLORS.LIGTH_GRAY}}>Continue</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    backgroundColor: '#F4FAEB',
    display: "flex",
    flex: 1,
    flexDirection: "column",
    paddingTop: height * 0.05,
    alignItems: "center",
    position:'relative',
    paddingHorizontal: width * 0.2,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    paddingHorizontal:20
  },
  input: {
    height: width/8,
    width: width/6,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default ForgotOTP;
