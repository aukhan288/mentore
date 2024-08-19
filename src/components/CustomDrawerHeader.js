import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions,StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
const { height, width } = Dimensions.get('screen');
const CustomDrawerHeader =()=> {
  return (
    <View style={{flexDirection:'row',width:width*0.75, justifyContent:'space-between', paddingLeft:width*0.17, alignItems:'center'}}>
      <Image source={require('../assetes/images/logo.png')} style={{width:120, height:30,}}/>
      <TouchableOpacity 
      style={{padding:10}}>
        <Icon name="bell" color={'#031D53'} size={20} />
      </TouchableOpacity>
      
    </View>
  )
}

export default CustomDrawerHeader;