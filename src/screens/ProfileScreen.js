import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ImageBackground, Dimensions, StyleSheet,  } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import BottomTab from "../components/BottomTab";
import { BASE_URL, IMAGE_PATH, userLogout } from "../services/userServices";
import { removeData } from '../asyncStorage';
import { setUser } from '../redux/userReducer';
const { height, width } = Dimensions.get('screen');
const Profile = (props) => {
  const user = useSelector((state) => state.userReducer.userInfo);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const dispatch=useDispatch();
  const signOut=async()=>{
    dispatch(setUser(null));
    await userLogout();
    await removeData('@token');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'GetStartedScreen' }],
      })
    );
  }
  return (
    <View style={styles.mainContainer}>

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
        
      <Text style={{fontWeight:'600',fontSize:width*0.05,color:'#000',marginTop:height*0.03}}>Account Settings</Text>

      <TouchableOpacity
      onPress={()=>{navigation.navigate('EditProfile')}}
      style={{backgroundColor:'#F1EEEE', flexDirection:'row',justifyContent:'space-between',alignItems:'center', borderRadius:8, paddingVertical:15,paddingHorizontal:10, marginTop:height*0.03}}
      >
        <Text>Edit Profile</Text>
        <Image source={require('../assetes/images/arrow-forward.png')} style={{width:30, height:30, backgroundColor:'#FFF', padding:10, borderRadius:8}} />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=>{navigation.navigate('ChangePassword')}}
      style={{backgroundColor:'#F1EEEE', flexDirection:'row',justifyContent:'space-between',alignItems:'center', borderRadius:8, paddingVertical:15,paddingHorizontal:10, marginTop:height*0.03}}
      >
        <Text>Change Password</Text>
        <Image source={require('../assetes/images/arrow-forward.png')} style={{width:30, height:30, backgroundColor:'#FFF', padding:10, borderRadius:8}} />
      </TouchableOpacity>

      <TouchableOpacity
      onPress={()=>signOut()}
      style={{backgroundColor:'#FF5F00', flexDirection:'row',justifyContent:'center',alignItems:'center', borderRadius:8, paddingVertical:20,paddingHorizontal:10, marginTop:height*0.06}}
      >
        <Text style={{color:'#FFF',fontWeight:'600',fontSize:width*0.04}}>Logout</Text>
        </TouchableOpacity>
       
      </View>
      <BottomTab screen={'Profile'}/>
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
export default Profile;