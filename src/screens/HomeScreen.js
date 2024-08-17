import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('screen');
const Home = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={{ width:width, backgroundColor:'#FFF', height:height*0.55, bottom:0,position:'absolute', borderTopLeftRadius:25, borderTopRightRadius:25 }}>

      </View>
      <View style={{ 
        backgroundColor:'#031D53', width:width*0.9, position:'absolute', 
        bottom:0, alignSelf:'center',borderRadius:width*0.02, marginBottom:height*0.01, display:'flex', flexDirection:'row',justifyContent:'space-around'   
        }}
      >
        <TouchableOpacity
        style={styles.bottomTabBtn}
        >
          <Icon
          name="home"
          color={'red'}
          />
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.bottomTabBtn}
        >
          <Icon
          name="home"
          color={'red'}
          />
        </TouchableOpacity>
        <TouchableOpacity
        style={{
          

        }}
        >
          <Icon
             name="plus"
             color={'#FFF'}
             size={width*0.08}
          />
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.bottomTabBtn}
        >
          <Icon
              name="whatsapp"
              color={'#FFF'}
              size={width*0.06}
          />
        </TouchableOpacity>
        <TouchableOpacity
       style={styles.bottomTabBtn}
        >
          <Icon
          name="user-circle"
          color={'#FFF'}
          size={width*0.06}
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
  bottomTabBtn:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:10
    
  }
})
export default Home;