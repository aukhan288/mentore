import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ImageBackground, Dimensions, StyleSheet,  } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

const { height, width } = Dimensions.get('screen');
const Settings = (props) => {
  const user = useSelector((state) => state.userReducer.user);

  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
    <Text>Settings</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    display: "flex",
    flex:1,
    flexDirection: "column",
    position:'relative',
    backgroundColor:'#FFFEFB'
  }
})
export default Settings;