import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ImageBackground, Dimensions, StyleSheet, FlatList } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

const imageMap = {
    'Call Now': require('../assetes/images/home-not-fill.png'),
    WhatsApp: require('../assetes/images/add-assignment.png'),
    Email: require('../assetes/images/wallet.png'),
  };
  
const { height, width } = Dimensions.get('screen');
const Support = (props) => {
  const user = useSelector((state) => state.userReducer.user);
  const image = imageMap[label] || require('../assetes/images/home.png'); // Fallback image

  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <FlatList
  ItemSeparatorComponent={
    Platform.OS !== 'android' &&
    (({highlighted}) => (
      <View
        style={[style.separator, highlighted && {marginLeft: 0}]}
      />
    ))
  }
  data={[{title: 'Call Now', content:'+923001234567', key: 'item1'},{title: 'WhatsApp', content:'+92345123456', key: 'item2'},{title: 'Email', content:'help@assignmentmentor.co.uk', key: 'item3'}]}
  renderItem={({item, index, separators}) => (
    <TouchableOpacity
    style={{
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

    }}
      key={item.key}
      onPress={() => this._onPress(item)}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}>
      <View style={{backgroundColor: 'white'}}>
        <View>
        <Text style={{color:'#031D53', fontWeight:'700'}}>{item.title}</Text>
        <Text style={{color:'#18273B', fontSize:width*0.03}}>{item.content}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )}
/>
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
    backgroundColor:'#FFFEFB'
  }
})
export default Support;