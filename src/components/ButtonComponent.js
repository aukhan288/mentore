import React from 'react'
import { View, Text, Dimensions,TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get('screen');
const ButtonComponent=(props)=> {
    const navigation = useNavigation();
  return (
    <TouchableOpacity
        
        onPress={()=>navigation.navigate('Add Order')}
        style={{backgroundColor:'#FF5F00', width:width*0.9, alignSelf:'center', marginTop:height*0.02,justifyContent:'center',alignItems:'center', paddingVertical:15, borderRadius:8}}
        >
          <Text style={{color:'#FFF'}}>Order Now</Text>
        </TouchableOpacity>
  )
}
export default ButtonComponent