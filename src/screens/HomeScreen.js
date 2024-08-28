import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, StyleSheet,  } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const images = [
  'https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww',
  'https://plus.unsplash.com/premium_photo-1681506669115-cb6b2d30dbc7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://media.istockphoto.com/id/2021524810/photo/business-people-enhance-your-cyber-security-with-cutting-edge-solutions-protect-data-prevent.jpg?s=2048x2048&w=is&k=20&c=55FpNeV9naNFWX_jcwqBSMstdEAxNjDx51tMI6OPvU4=',
  'https://farm9.staticflickr.com/8295/8007075227_dc958c1fe6_z_d.jpg',
];
const { height, width } = Dimensions.get('screen');
const Home = (props) => {
  const navigation = useNavigation();
  
  const user = useSelector((state) => state.userReducer.user);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.mainContainer}>
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
            onSnapToItem={(index) => console.log('current index:', index)}
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
      <View style={{ width:width, paddingHorizontal:width*0.02, backgroundColor:'#FFF', height:height*0.6, bottom:0,position:'absolute', borderTopLeftRadius:25, borderTopRightRadius:25 }}>
        <Text style={{marginTop:height*0.02, marginHorizontal:width*0.02, color:'#1C1B1F'}}>Orders</Text>
        <View style={{padding:10, flexDirection:'row',justifyContent:'space-between'}}>
          <TouchableOpacity
          style={styles.orderBox}
          >
           <Text style={{color:'#fff', fontSize:width*0.1}}>O</Text>
           <Text style={{color:'#fff'}}>Total</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.orderBox}
          >
           <Text style={{color:'#fff', fontSize:width*0.1}}>O</Text>
           <Text style={{color:'#fff'}}>In Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.orderBox}
          >
           <Text style={{color:'#fff', fontSize:width*0.1}}>O</Text>
           <Text style={{color:'#fff'}}>Completed</Text>
          </TouchableOpacity>
        </View> 
        <Text style={{marginTop:height*0.015, marginBottom:height*0.01, marginHorizontal:width*0.02, color:'#1C1B1F'}}>Current Orders</Text>
        <TouchableOpacity style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          overflow:'hidden',
          elevation: 3,
          backgroundColor:'#031D53',justifyContent:'center', alignItems:'center', borderRadius:15, paddingVertical:width*0.07, marginHorizontal:width*0.03}}>
           <Image source={require('../assetes/images/box.png')} 
           style={{marginBottom:height*0.025}}
           />
           <Text style={{color:'#FFFFFFE5'}}>Grab the Golden Opportunity, Order Now!</Text>
           <Text style={{color:'#FFFFFFE5'}}>Once you place orders, they  will appear here.</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{backgroundColor:'#FF5F00', width:width*0.5, alignSelf:'center', marginTop:height*0.03,justifyContent:'center',alignItems:'center', paddingVertical:10, borderRadius:8}}
        >
          <Text style={{color:'#FFF'}}>Order Now</Text>
        </TouchableOpacity>
      </View>
      <View style={{ 
        backgroundColor:'#031D53', width:width*0.9, position:'absolute', paddingVertical:5, 
        bottom:0, alignSelf:'center',borderRadius:width*0.02, marginBottom:height*0.01, display:'flex', flexDirection:'row',justifyContent:'space-around'   
        }}
      >
        <TouchableOpacity
        style={styles.bottomTabBtn}
        >
          <Image source={require('../assetes/images/home-active.png')} 
            style={{width:width*0.06, height:width*0.06,}}
          />
        </TouchableOpacity>
        <TouchableOpacity
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
          top:-26,
          marginHorizontal:'auto'         
 
        }}
        >
          <Image source={require('../assetes/images/plus.png')} style={{height:width*0.06,width:width*0.06}} />
          {/* <Icon name="plus" color={'#FFF'} size={30} /> */}
        </TouchableOpacity>
        </View>
        <TouchableOpacity
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
           <Image source={require('../assetes/images/profile.png')} 
            style={{width:width*0.06, height:width*0.06}}
          />
        </TouchableOpacity>
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
export default Home;