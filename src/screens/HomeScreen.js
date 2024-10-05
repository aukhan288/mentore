import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView, ImageBackground, Pressable  } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTab from "../components/BottomTab";
import ButtonComponent from "../components/ButtonComponent";
import { getOrdersCounts } from "../services/userServices"
import { getData } from "../asyncStorage";
const images = [
  'https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww',
  'https://plus.unsplash.com/premium_photo-1681506669115-cb6b2d30dbc7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://media.istockphoto.com/id/2021524810/photo/business-people-enhance-your-cyber-security-with-cutting-edge-solutions-protect-data-prevent.jpg?s=2048x2048&w=is&k=20&c=55FpNeV9naNFWX_jcwqBSMstdEAxNjDx51tMI6OPvU4=',
  'https://farm9.staticflickr.com/8295/8007075227_dc958c1fe6_z_d.jpg',
];
const { height, width } = Dimensions.get('screen');
const Home = (props) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  
  const user = useSelector((state) => state.userReducer.userInfo);
 
  
  
  const [total, setTotal]=useState(0)
  const [inprogres, setInprogres]=useState(0)
  const [completed, setCompleted]=useState(0)
  const [showPassword, setShowPassword] = useState(false);

  useEffect(()=>{

    
    getOrdersCounts(user?.token)
    .then(res=>{
      if(res?.succes){
        setTotal(res?.data?.total)
        setInprogres(res?.data?.inprogress)
        setCompleted(res?.data?.completed)
      }
    })
  },[isFocused])
  return (
    <View style={styles.mainContainer}>
   <ScrollView>
    <View style={{flex:1,display: "flex",
    flexDirection: "column",
    position:'relative',
    backgroundColor:'#031D53', minHeight:height, width:width}}>
   <Text style={{color:'#FFF',marginLeft:width*.03,marginTop:height*0.01, fontSize:width*0.06 }}>Hey, {user?.name} !</Text>
      <View style={{ flex: 1 }}>
      <Carousel
            loop
            width={width}
            height={width / 2}
            mode="parallax"
            autoPlay={true}
            data={images}
            scrollAnimationDuration={1000}
            pagingEnabled={true}
            // onSnapToItem={}
            renderItem={({ item }) => (
                <View style={styles.container}>
                    <Image
                        source={{ uri: item }}
                        style={styles.image}
                    />
                </View>
            )}
        />
        </View>
      <View style={{ width:width, paddingHorizontal:width*0.02, backgroundColor:'#FFF',  bottom:0,position:'absolute',paddingBottom:80, borderTopLeftRadius:25, borderTopRightRadius:25 }}>
        <Text style={{marginTop:height*0.02, marginHorizontal:width*0.02, color:'#1C1B1F'}}>Orders</Text>
        <View style={{padding:10, flexDirection:'row',justifyContent:'space-between'}}>
          <TouchableOpacity
          style={styles.orderBox}
          >
           <Text style={{color:'#fff', fontSize:width*0.1}}>{total.toString()}</Text>
           <Text style={{color:'#fff'}}>Total</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.orderBox}
          >
            {console.log(inprogres)
            }
           <Text style={{color:'#fff', fontSize:width*0.1}}>{inprogres+""}</Text>
           <Text style={{color:'#fff'}}>In Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.orderBox}
          >
           <Text style={{color:'#fff', fontSize:width*0.1}}>{completed.toString()}</Text>
           <Text style={{color:'#fff'}}>Completed</Text>
          </TouchableOpacity>
        </View> 
        
      <ButtonComponent {...props} />
      <View
      style={{position:'relative', paddingHorizontal:width*0.04, marginTop:height*0.02}}>
        <Text style={{fontWeight:'700',fontSize:width*0.045}}>Get Accurate Results Instantly</Text>
        <Text style={{fontWeight:'700',fontSize:width*0.045}}>with Our <Text style={{fontWeight:'700',fontSize:width*0.045,color:'#FF5F00'}}>Plagiarism Checker!</Text></Text>
        <View style={{backgroundColor:'#031D53', borderRadius:8, padding:10 }}>
          <Text style={{color:'#FFF', width:width*0.5, }}>Ensure your work is original and free from plagiarism with just one click.</Text>
        <Pressable 
        onPress={()=>navigation.navigate('WebViewScreen')}
        style={{backgroundColor:'#FF5F00', marginTop:20, width:width*0.3, borderRadius:5, justifyContent:'center', alignItems:'center',padding:5, marginTop:10}}>
          <Text style={{color:'#FFF'}}>Check Now!</Text>
        </Pressable>
        </View>
        <Image
          source={require('../assetes/images/doctor.png')} style={{position:'absolute', bottom:0, right:10,height:width*0.4, width:width*0.75}}
          />

      </View>
  <View
      style={{position:'relative', paddingHorizontal:width*0.04, marginTop:height*0.02}}>
        <Text style={{fontWeight:'700',fontSize:width*0.045}}>Get Accurate Results Instantly</Text>
        <Text style={{fontWeight:'700',fontSize:width*0.045}}>with Our <Text style={{fontWeight:'700',fontSize:width*0.045,color:'#FF5F00'}}>Plagiarism Checker!</Text></Text>
        <View style={{backgroundColor:'#031D53', borderRadius:8, padding:10 }}>
          <Text style={{color:'#FFF', width:width*0.5, }}>Ensure your work is original and free from plagiarism with just one click.</Text>
        <Pressable 
        onPress={()=>navigation.navigate('WebViewScreen')}
        style={{backgroundColor:'#FF5F00', marginTop:20, width:width*0.3, borderRadius:5, justifyContent:'center', alignItems:'center',padding:5, marginTop:10}}>
          <Text style={{color:'#FFF'}}>Check Now!</Text>
        </Pressable>
        </View>
        <Image
          source={require('../assetes/images/doctor.png')} style={{position:'absolute', bottom:0, right:10,height:width*0.4, width:width*0.75}}
          />

      </View>
      </View>
      
      </View>
 
   </ScrollView>
    <BottomTab screen={'Home'}/>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    height:height, width:width,
    flexDirection:'column',
    flex:1
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
export default Home;