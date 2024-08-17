import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet, ImageBackground, Image, TouchableOpacity } from "react-native"
// import "@fontsource/manrope";
import { useNavigation } from '@react-navigation/native';
// import { Icon } from "react-native-vector-icons/Icon";
const { height, width } = Dimensions.get('screen');
const GetStarted = () => {
const navigation=useNavigation()
  
  return(
    <ImageBackground
    source={require('../assetes/images/splash.png')}
    style={{ flex:1, resizeMode: 'cover'}}
    >
    <View style={styles.mainContainer}>
      <Image
      source={require('../assetes/images/logo.png')}
      style={{marginTop:height*0.03, width:width*0.36, height:width*0.1}}
      />
      {/* <Image
      source={require('../assetes/images/small_logo.png')}
      style={{marginTop:height*0.03}}
      /> */}
      <View style={{marginTop:height*0.038}}>
        <Text style={{color:'#01143C', fontFamily:'Manrope',fontSize:width*0.055, fontWeight:'100'}}>Achieve Top Grades with</Text>
        <View style={{flexDirection:'row'}}> 
            <Text style={{color:'#01143C', fontFamily:'Manrope', fontSize:width*0.07,marginRight:width*0.02}}>Expert</Text> 
            <Text style={{color:'#FF5F00', fontFamily:'Manrope', fontSize:width*0.07}}>Assignment Help</Text> 
        </View>
        <Text style={{color:'#01143C', fontFamily:'Manrope', fontSize:width*0.075,marginRight:width*0.02}}>Services</Text>
        <TouchableOpacity 
        onPress={()=>{navigation.navigate('Login')}}
        style={{backgroundColor:'#01143C', flexDirection:'row',width:width*0.3,borderRadius:8,alignItems:'center',justifyContent:'space-between',paddingVertical:width*0.02,paddingHorizontal:width*0.03,marginTop:height*0.015}}>
            <Image source={require('../assetes/images/plus.png')} />
            <Text style={{color:'#fff'}}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    paddingHorizontal:width*0.04,
    paddingVertical:height*0.02
  },
  
})
export default GetStarted;