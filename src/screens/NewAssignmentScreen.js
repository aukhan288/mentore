import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ImageBackground, Dimensions, StyleSheet, TextComponent,  } from "react-native"

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import InputFieldComponent from "../components/InputFieledComponent";
const { height, width } = Dimensions.get('screen');
const NewAssignment = (props) => {
  const user = useSelector((state) => state.userReducer.user);

  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <Text style={{textAlign:'center',fontWeight:'900', fontSize:width*0.05,color:'#000',marginBottom:height*0.03}}>Fill Your Order Details</Text>
      <View style={{height:60}}>
       <InputFieldComponent label={'Subject Area'} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    paddingTop:40,
    display: "flex",
    flexDirection: "column",
    backgroundColor:'#FFFFFF'
  }
})
export default NewAssignment;