import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ImageBackground, Dimensions, StyleSheet, ScrollView,  } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { policy } from "../services/userServices";
import { useIsFocused } from '@react-navigation/native';

import RenderHtml from 'react-native-render-html';
  

const { height, width } = Dimensions.get('screen');
const Policy = (props) => {
  const [ source, setSource ]=useState('');
  const [ policyTitle, setPolicyTitle ]=useState('');
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.userReducer.userInfo);
  useEffect(()=>{
    policy('privacy')
    .then(res=>{
      setPolicyTitle(res?.title)
      setSource(res?.policy?.policy)
    })

  },[isFocused])
  const navigation = useNavigation();
  return (
    <ScrollView
    scrollEnabled={true}
    >
    <View style={styles.mainContainer}>
      <Text style={{color:'#1B2A56', fontWeight:'700', fontSize:width*0.08, textTransform:'capitalize', marginVertical:height*0.01}}>{policyTitle}</Text>
    {source &&<RenderHtml
      contentWidth={width}
      source={{
        html: source,
    }}
    />}
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {

    display: "flex",
    flex:1,
    flexDirection: "column",
    paddingHorizontal:width*.04,
    paddingTop:width*.04,
    paddingBottom:width*.08,
    position:'relative',
    backgroundColor:'#FFFEFB',
    minHeight:height,
    width:width
  }
})
export default Policy;