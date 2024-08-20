import React from 'react'
import { View, Text, Dimensions } from 'react-native'
const { height, width } = Dimensions.get('screen');
const ErrorComponent=(props)=> {
  return (
    <View>
      <Text style={{color:'red',width:width*0.9, fontSize:10}}>{props?.error}</Text>
    </View>
  )
}
export default ErrorComponent