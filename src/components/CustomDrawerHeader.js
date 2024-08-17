import React from 'react'
import { View, Text, Image } from 'react-native'

const CustomDrawerHeader =()=> {
  return (
    <View>
      <Image source={require('../assetes/images/logo.png')} style={{width:120, height:30}}/>
      
    </View>
  )
}

export default CustomDrawerHeader;