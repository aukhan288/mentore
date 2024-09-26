import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ImageBackground, Dimensions, StyleSheet, FlatList, Linking } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import BottomTab from "../components/BottomTab";
  
const { height, width } = Dimensions.get('screen');
const Support = (props) => {
  const user = useSelector((state) => state.userReducer.user);

  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
         <TouchableOpacity
    style={styles.supportCard}>
      <View style={styles.supportCardMainView}>
        <Image style={styles.supportCardImage} 
         source={require('../assetes/images/call.png')}
        />
        <View style={{marginLeft:width*0.03}}>
        <Text style={styles.supportCardTitle}>Call Now</Text>
        <Text style={styles.supportCardLink}>+44 7386 783749</Text>
        </View>
      </View>
      <Image 
       source={require('../assetes/images/arrow-forward.png')} 
       style={styles.linkArrowImage} 
      />
    </TouchableOpacity>
         <TouchableOpacity
    style={styles.supportCard}>
      <View style={styles.supportCardMainView}>
        <Image 
         style={styles.supportCardImage} 
         source={require('../assetes/images/whatsapp-orange.png')}
        />
        <View style={{marginLeft:width*0.03}}>
        <Text style={styles.supportCardTitle}>WhatsApp</Text>
        <Text style={styles.supportCardLink}>+44 7386 783749</Text>
        </View>
      </View>
      <Image 
       source={require('../assetes/images/arrow-forward.png')} 
       style={styles.linkArrowImage} 
      />
    </TouchableOpacity>
    <TouchableOpacity
    style={styles.supportCard}>
      <View style={styles.supportCardMainView}>
        <Image 
         style={styles.supportCardImage} 
         source={require('../assetes/images/email.png')}
        />
        <View style={{marginLeft:width*0.03}}>
        <Text style={styles.supportCardTitle}>Email</Text>
        <Text style={styles.supportCardLink}>help@assignmentmentor.co.uk</Text>
        </View>
      </View>
      <Image 
       source={require('../assetes/images/arrow-forward.png')} 
       style={styles.linkArrowImage} 
      />
    </TouchableOpacity>
    <TouchableOpacity
    onPress={()=>{ Linking.openURL('https://assignmentmentor.co.uk/') }}
    style={styles.supportCard}>
      <View style={styles.supportCardMainView}>
        <Image 
         style={styles.supportCardImage} 
         source={require('../assetes/images/website.png')}
        />
        <View style={{marginLeft:width*0.03}}>
        <Text style={styles.supportCardTitle}>Email</Text>
        <Text style={styles.supportCardLink}>help@assignmentmentor.co.uk</Text>
        </View>
      </View>
      <Image 
       source={require('../assetes/images/arrow-forward.png')} 
       style={styles.linkArrowImage} 
      />
    </TouchableOpacity>
    <BottomTab screen={'Home'}/>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    position:'relative',
    display:'flex',
    flex:1,
    flexDirection: "column",
    backgroundColor:'#FFFEFB'
  },
  supportCard:{
    backgroundColor: '#FFF',
    padding: 20,
    marginTop:height*0.04,
    marginBottom: 8,
    marginHorizontal: 16,
    overflow:'hidden',
    borderRadius:8,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
},
supportCardTitle:{color:'#031D53', fontWeight:'700'},
supportCardLink:{color:'#18273B', fontSize:width*0.03},
supportCardImage:{height:width*0.12, width:width*0.12},
supportCardMainView:{backgroundColor: 'white', flexDirection:'row',alignItems:'center'},
linkArrowImage:{width:width*0.12,height:width*0.05}
})
export default Support;