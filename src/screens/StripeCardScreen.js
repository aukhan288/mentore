import React, { useState, useRef } from "react";
import { View, Text, TextInput, Image,Alert, TouchableOpacity, Modal, Dimensions, StyleSheet, ImageBackground } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { captureRef } from 'react-native-view-shot';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
  
const { height, width } = Dimensions.get('screen');

const StripeCard = (props) => {
    const viewRef = useRef(null);
  const user = useSelector((state) => state.userReducer.user);
const [confirmationModal,setConfirmationModal] = useState(false);
const [slipModal,setSlipModal] = useState(false);
const [cvc, setCvc]=useState();
const [cardExpiry, setCardExpiry]=useState();
const [cardNumber, setCardNumber]=useState();
  const navigation = useNavigation();

  const saveToGallery= async ()=>{
    try {
      // Capture the screenshot
      const uri = await captureRef(viewRef.current, {
        result: 'tmpfile',
        format: 'png',
        quality: 0.8,
      });

      console.log('Screenshot Captured', uri);

      // Save to gallery
      const saved = await CameraRoll.save(uri, { type: 'photo' });

      console.log('Image saved to gallery:', saved);
      Alert.alert('Success', 'Image saved to gallery!');
    } catch (error) {
      console.error('Failed to capture screenshot or save image:', error);
      Alert.alert('Error', 'Failed to capture screenshot or save image.');
    }
  }

  const confirmPayment=()=>{
    setConfirmationModal(false),
    
    setSlipModal(true)
  }
  return (
    <View style={styles.mainContainer}>
    <View
        style={styles.supportCard}>
       <View style={{borderBottomWidth:1, borderColor:'#e2e2e2', width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
        <TextInput
        style={{paddingVertical:20, }}
        onChangeText={(txt)=>{setCardNumber}}
       placeholder="Card Number"
        />
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <Image source={require('../assetes/images/visa-card.png')} style={{width:46, height:30}} />
        <Image source={require('../assetes/images/master-card.png')} style={{width:60, height:40}} />
        </View>
       
       </View>
       <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%', alignItems:'center', paddingHorizontal:10}}>
            <TextInput 
            placeholder="MM/YY"
            onChangeText={(txt)=>setCardExpiry(txt)}
            style={{paddingVertical:20, borderRightWidth:1, borderColor:'#e2e2e2', flex:0.5}}
            />
            <View style={{justifyContent:'space-between', flexDirection:'row',flex:0.5, alignItems:'center'}}>
            <TextInput 
            placeholder="CVC"
            onChangeText={(txt)=>setCvc(txt)}
            style={{paddingVertical:20, paddingLeft:10, flex:0.8}}
            />
            <Image
            source={require('../assetes/images/master-card.png')}
            style={{height:44,width:32}}
            />
            </View>
        </View>
    </View>
    <TouchableOpacity
    onPress={()=>setConfirmationModal(!confirmationModal)}
     style={{backgroundColor:'#FF5F00', flexDirection:'row', alignSelf:'center', marginTop:height*0.05,  width:width*0.9, justifyContent:'center', 
      paddingVertical:15, borderRadius:8,
      alignItems:'center'}}
     >
       <Text style={{color:'#FFF'}}>Pay Now</Text>
     </TouchableOpacity>
     
     <Modal 
      
      animationType="slide"
      transparent={true}
      visible={confirmationModal}
      style={{flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,}}
      >
      <View
      style={{zIndex:-9999, height:height,width:width, alignItems:'center', paddingTop:height*0.2, backgroundColor:'#0007'}}
      >
        <View
        
        style={{   margin: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    width:width*0.9,
    zIndex:9999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    overflow:'hidden',
    justifyContent:'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,}}>
        <View style={{alignItems:'center', paddingVertical:height*0.04}}>
        <Image
        style={{width:width*0.3, height:width*0.3}}
        source={require('../assetes/images/esc-icon.png')}
        />
        <Text style={{color:'#031D53', fontWeight:'700', fontSize:width*0.05}}>Confirm Purchase!</Text>
        <Text style={{color:'#0005', fontWeight:'400',fontSize:width*0.04}}>Would you like to proceed with this</Text>
        <Text style={{color:'#0005', fontWeight:'400',fontSize:width*0.04}}>transaction?</Text>
        </View>
       <View style={{width:'100%', flexDirection:'row'}}>
            <TouchableOpacity 
            onPress={()=>setConfirmationModal(false)}
            style={{flex:1, paddingVertical:20, justifyContent:'center', alignItems:'center', backgroundColor:'#D9D9D9'}}>
                <Text>Cancle</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>confirmPayment()}
            style={{flex:1, paddingVertical:20, justifyContent:'center', alignItems:'center', backgroundColor:'#FF6D00'}}>
                <Text style={{color:'#FFF'}}>Confirm</Text>
            </TouchableOpacity>
        </View>
        </View>
        </View>
      </Modal>
     <Modal 
      
      animationType="slide"
      transparent={true}
      visible={slipModal}
      style={{flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,}}
      >
      <View
      style={{zIndex:-9999, height:height,width:width, alignItems:'center', paddingTop:height*0.1, backgroundColor:'#031D53'}}
      >
        <View
        ref={viewRef}
        style={{   margin: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    width:width*0.9,
    zIndex:9999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    overflow:'hidden',
    justifyContent:'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,}}>
        <ImageBackground
        source={require('../assetes/images/parti-paper.png')}
        >

        <View style={{alignItems:'center', paddingTop:height*0.08, }}>
          <Image
           source={require('../assetes/images/shield-icon.png')}
           style={{height:width*0.18, width:width*0.18, backgroundColor:'#FFF5E5', borderRadius:10}}
          />
        </View>
        </ImageBackground>
        <View style={{alignItems:'center', marginBottom:height*0.04, marginTop:height*0.05}}>
            <Text style={{color:'#031D53', fontWeight:'bold', fontSize:width*0.06}}>Transaction Successful</Text>
            <Text style={{color:'#838A93', fontWeight:'700', marginBottom:height*0.04}}>Your order has been confirmed</Text>
            <Text style={{color:'#838A93', fontWeight:'700'}}>Transferred Amount</Text>
            <Text style={{color:'#031D53', fontWeight:'bold', fontSize:width*0.06}}>200.00 GBP</Text>
        </View>
        <View style={{position:'relative', width:'100%', marginBottom:height*0.06, justifyContent:'center'}}>
        <View style={{position:'absolute',height:width*0.06,width:width*0.06, backgroundColor:'#031D53',  borderRadius:100, left:-width*0.03}}></View>
        <View style={{borderBottomWidth:1, borderStyle:'dashed', borderColor:'#0005', marginHorizontal:30  }}></View>
        <View style={{position:'absolute', height:width*0.06,width:width*0.06, backgroundColor:'#031D53',  borderRadius:100, right:-width*0.03}}></View>
        </View>

        {/* <Text style={{paddingHorizontal:width*0.04, color:'#838A93', fontWeight:'400', fontSize:width*0.05}}>Total Top Up</Text> */}
       
       <View style={{width:'100%', flexDirection:'row', marginBottom:height*0.04, paddingHorizontal:width*0.04}}>
            <TouchableOpacity 
            onPress={()=>setSlipModal(false)}
            style={{flex:1, paddingVertical:15, justifyContent:'center', alignItems:'center', backgroundColor:'#D9D9D9'}}>
                <Text>Cancle</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>saveToGallery()}
            style={{flex:1, paddingVertical:15, justifyContent:'center', alignItems:'center', backgroundColor:'#031D53'}}>
                <Text style={{color:'#FFF'}}>Save to Gallery</Text>
            </TouchableOpacity>
        </View>
        <View style={{width: width*0.8, alignSelf:'center', flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{height:width*0.06,width:width*0.06, backgroundColor:'#031D53',  borderRadius:100, marginBottom:-width*0.03}}></View>
            <View style={{height:width*0.06,width:width*0.06, backgroundColor:'#031D53',  borderRadius:100, marginBottom:-width*0.03}}></View>
            <View style={{height:width*0.06,width:width*0.06, backgroundColor:'#031D53',  borderRadius:100, marginBottom:-width*0.03}}></View>
            <View style={{height:width*0.06,width:width*0.06, backgroundColor:'#031D53',  borderRadius:100, marginBottom:-width*0.03}}></View>
            <View style={{height:width*0.06,width:width*0.06, backgroundColor:'#031D53',  borderRadius:100, marginBottom:-width*0.03}}></View>
            <View style={{height:width*0.06,width:width*0.06, backgroundColor:'#031D53',  borderRadius:100, marginBottom:-width*0.03}}></View>
            <View style={{height:width*0.06,width:width*0.06, backgroundColor:'#031D53',  borderRadius:100, marginBottom:-width*0.03}}></View>
            <View style={{height:width*0.06,width:width*0.06, backgroundColor:'#031D53',  borderRadius:100, marginBottom:-width*0.03}}></View>
            <View style={{height:width*0.06,width:width*0.06, backgroundColor:'#031D53',  borderRadius:100, marginBottom:-width*0.03}}></View>
        </View>
        </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    flexDirection: "column",
    backgroundColor:'#FFFEFB'
  },
  supportCard:{
    backgroundColor: '#FFF',
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
    justifyContent:'space-between',
    alignItems:'center'
},

})
export default StripeCard;