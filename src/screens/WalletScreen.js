import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, TouchableHighlight, TurboModuleRegistry, FlatList, ImageBackground, Dimensions, StyleSheet, Modal,  } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { userWallet } from '../services/userServices'
import { useIsFocused } from '@react-navigation/native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
const Item = ({title}) => (
  
  <View style={{marginTop:height*0.02, marginHorizontal:width*0.04}}>
      
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{ flexDirection:'row', alignItems:'center' }}>
       
         {/* <Icon name='check-circle' size={width*0.06} color='#09C126'/> */}
         <Image source={require('../assetes/images/user.png')} style={{height:width*0.14, width:width*0.14, marginRight:10}} />
         <View style={{flexDirection:'column'}}>
          <Text style={{fontWeight:'700'}}>Jhon Eliven</Text>
          <Text style={{fontSize:10, color:'#0007'}}>Jhon Eliven</Text>
         </View>
        </View>  
        <Text style={{color:'#B83232', fontWeight:'400', fontSize:width*0.04}}>$35.23</Text>
    </View>
    </View>
  );
const { height, width } = Dimensions.get('screen');
const Wallet = (props) => {
  const isFocused = useIsFocused();
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const [showBalence, setShowBalence]=useState(false)
  const navigation = useNavigation();
  const [paymentOptionModal,setPaymentOptionModal] = useState(false)
  const [balance,setBalance] = useState('0.00')

  useEffect(()=>{
    userWallet(userInfo?.user?.id,userInfo?.user?.token)
    .then(res=>{
      console.log(res);
      
      setBalance(res?.wallet?.balance)
    })
  },[isFocused])
  return (
    <View style={styles.mainContainer}>
    <ImageBackground
     source={require('../assetes/images/bg-blue.jpg')}

    >
     <View style={{justifyContent:'center', alignItems:'center',paddingTop:height*0.08, paddingBottom:20}}>
     <Text style={{color:'#FFF', fontWeight:'400', fontSize:width*0.05}}>Your Balence</Text>
     <View style={{flexDirection:'row', alignItems:'center'}}>
     {showBalence?<Text style={{color:'#FFF',fontWeight:'700', fontSize:width*0.1}}>{'£ '+ balance}</Text>
     :<Text style={{color:'#FFF',fontWeight:'700', fontSize:width*0.05}}>****</Text>}
      <TouchableOpacity 
      onPress={()=>setShowBalence(!showBalence)}
      style={{paddingHorizontal:15}}>
        <Icon name={showBalence?'eye-slash':'eye'} color='#FF5F00' size={width*0.08} />
      </TouchableOpacity>
     </View>
     <Text style={{color:'#FF5F00'}}>Total: £ 243</Text>
     <TouchableOpacity
     onPress={()=>setPaymentOptionModal(!paymentOptionModal)}
     style={{backgroundColor:'#FF5F00', flexDirection:'row', width:width*0.9, justifyContent:'center', 
      paddingVertical:10, borderRadius:8,
      alignItems:'center'}}
     >
      <Image source={require('../assetes/images/recharge.png')} style={{ width:20,height:20, marginRight:10 }}/> 
      <Text style={{color:'#FFF'}}>Recharge Your Wallet</Text>
     </TouchableOpacity>
     </View>
    </ImageBackground>

    <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:width*0.04,marginVertical:height*0.02}}>
      <Text>Latest Transactions</Text>
      <TouchableOpacity>
        <Text>View all</Text>
      </TouchableOpacity>
    </View>
    <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />

      <Modal 
      
      animationType="slide"
      transparent={true}
      visible={paymentOptionModal}
      style={{flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,}}
      >
      <TouchableHighlight
      onPress={()=>setPaymentOptionModal(false)}
      style={{zIndex:-9999, height:height,width:width, alignItems:'center',justifyContent:'center', backgroundColor:'#0005'}}
      >
        <View
        
        style={{   margin: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 35,
    width:width*0.9,
    zIndex:9999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    justifyContent:'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,}}>
         <TouchableOpacity style={{marginBottom:height*0.05, flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderWidth:1, borderColor:'#e2e2e2', borderRadius:10, padding:10}}>
          
            <Image
            source={require('../assetes/images/paypal.png')}
            style={{width:130, height:30}}
            />
             <Image
            source={require('../assetes/images/arrow-forward.png')}
            style={{width:50, height:30}}
            />
         </TouchableOpacity>
         <TouchableOpacity 
         onPress={()=>navigation.navigate('StripeCard')}
         style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderWidth:1, borderColor:'#e2e2e2', borderRadius:10, padding:10}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image
            source={require('../assetes/images/credit-card.png')}
            style={{width:50, height:50, marginRight:10}}
            />
            <Text style={{fontWeight:'700', color:'#031D53'}}>Credit / Debit Card</Text>
            </View>
            <Image
            source={require('../assetes/images/arrow-forward.png')}
            style={{width:50, height:30}}
            />
         </TouchableOpacity>
        </View>
        </TouchableHighlight>
      </Modal>
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
export default Wallet;