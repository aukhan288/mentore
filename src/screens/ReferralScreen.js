import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ImageBackground, Dimensions, StyleSheet, Pressable } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import BottomTab from "../components/BottomTab";
import { BASE_URL, IMAGE_PATH } from "../services/userServices";
import Share from 'react-native-share';

const { height, width } = Dimensions.get('screen');
const Referral = (props) => {
  const user = useSelector((state) => state.userReducer.userInfo);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  
  const shareCode=(code)=>{
    Share.open({
      title:'Share Code',
      'message': `Please submit my referral code ${code} with your first order to support me—thank you!`
    })
  .then((res) => {
    console.log('===============>>>>>>>>>>>>>>',res);
  })
  .catch((err) => {
    err && console.log('eeeeeeeeeeee',err);
  });
  }

  return (
    <View style={styles.mainContainer}>
      {console.log(user?.image)
      }
      <ImageBackground source={require('../assetes/images/bg-blue.jpg')}>
        <View style={{display:'flex',flexDirection:'column',alignItems:'center', height:height*0.4, paddingTop:height*0.02}}>
            <Image 
             source={
              user?.image
                ? { uri: BASE_URL + IMAGE_PATH + user.image }
                : require('../assetes/images/profile.png')
            }
            style={{borderWidth:2,borderColor:'#FF5F00',borderRadius:100, height:width*0.25,width:width*0.25}} />
            <Text style={{color:'#FFF',fontWeight:'700',marginTop:5}}>{user?.name}</Text>
            <Text style={{color:'#FF5F00'}}>{user?.email}</Text>
        </View>
      </ImageBackground>  
     
      <View style={{ width:width, padding:width*0.04, backgroundColor:'#FFF', height:height*0.6, bottom:0,position:'absolute',  }}>
        
      <Text style={{fontWeight:'600',fontSize:width*0.05,color:'#000',marginTop:height*0.03}}>Referral Code</Text>       
      <Text>Share your referral code with friends to earn rewards when they submit their first order!</Text>
      <View style={{flexDirection:'row',marginVertical:20, display:'flex', alignItems:'center', overflow:'hidden', borderRadius:8,borderColor:'#e6e6e6',height:50}}>

        <Text style={{backgroundColor:'#e2e2e2',height:50, flex:2.5, borderColor:'#cecece',borderWidth:1,textAlignVertical:'center', paddingHorizontal:10 }}>{user?.referral_code}</Text>
         <Pressable
          onPress={()=>shareCode(user?.referral_code)}
          style={{backgroundColor:'#FF5F00', flex:1,height:50}}><Text style={{color:'#FFF', fontSize:width*0.04, flex:1, textAlign:'center', textAlignVertical:'center'}}>Share</Text></Pressable>
        </View>
      </View>

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
    backgroundColor:'#031D53'
  },
  orderBox:{
    shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  overflow:'hidden',
  elevation: 3,
    backgroundColor:'#031D53', height:width*0.25, width:width*0.27,borderRadius:15, justifyContent:'center', alignItems:'center'
  },
  bottomTabBtn:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:10
    
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius:10,
    resizeMode: 'cover',
},
})
export default Referral;