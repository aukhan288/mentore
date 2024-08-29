import React from 'react'
import {  View, Text, TextInput, Image, TouchableOpacity, Dimensions, StyleSheet, Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get('screen');
const  BottomTab=(props)=> {
  const navigation = useNavigation();
    console.log('**************',props)
  return (
    <View style={{ 
        backgroundColor:'#031D53', width:width*0.9, position:'absolute', 
        bottom:0, alignSelf:'center',borderRadius:width*0.02, marginBottom:height*0.01, display:'flex', flexDirection:'row',justifyContent:'space-around'   
        }}
      >
        <TouchableOpacity
           onPress={()=>navigation.navigate('Home')}
        style={styles.bottomTabBtn}
        >
          {props?.screen=='Home'?
          <Image source={require('../assetes/images/home-active.png')} 
          style={{width:width*0.06, height:width*0.06,}}
        />
          :
          <Image source={require('../assetes/images/home.png')} 
            style={{width:width*0.06, height:width*0.06,}}
          />
          } 
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>Linking.openURL(`tel:${'03124676603'}`)}

        style={styles.bottomTabBtn}
        >
          <Image source={require('../assetes/images/contacts.png')} 
            style={{width:width*0.06, height:width*0.06}}
          />
        </TouchableOpacity>
        <View style={{
           flex:2,
           alignItems:'center',
           justifyContent:'center',
           padding:10
        }}>
        <TouchableOpacity
        style={{
          borderWidth:3,
          borderColor:'#FFF',
          borderRadius:100,alignItems:'center',
          justifyContent:'center',
          height:width*0.15,
          width:width*0.15,
          backgroundColor:'#FF5F00',
          position:'absolute',
          alignSelf:'center',
          top:-23,
          marginHorizontal:'auto'         
 
        }}
        >
          <Image source={require('../assetes/images/plus.png')} style={{height:width*0.08,width:width*0.08}} />
          {/* <Icon name="plus" color={'#FFF'} size={30} /> */}
        </TouchableOpacity>
        </View>
        <TouchableOpacity
        onPress={()=>Linking.openURL('whatsapp://send?text=hello&phone=03124676603')}
        style={styles.bottomTabBtn}
        >
     <Image source={require('../assetes/images/whatsapp.png')} 
            style={{width:width*0.06, height:width*0.06}}
          />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>navigation.navigate('Profile')}
       style={styles.bottomTabBtn}
        >
          

       {props?.screen=='Profile'?
          <Image source={require('../assetes/images/profile-active.png')} 
          style={{width:width*0.06, height:width*0.06,}}
        />
          :
          <Image source={require('../assetes/images/profile.png')} 
            style={{width:width*0.06, height:width*0.06,}}
          />
          }
        </TouchableOpacity>
      </View>
  )
}
const styles = StyleSheet.create({
    bottomTabBtn:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10
        
      },
})
export default BottomTab