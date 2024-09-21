import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, FlatList, ScrollView, Pressable } from "react-native";
import { useSelector } from 'react-redux';
import { orderList,assignmentStatusList } from "../services/userServices";

const { height, width } = Dimensions.get('screen');


const Orders = () => {
  const user = useSelector((state) => state.userReducer.userInfo.user);
  const [assignments, setAssignments] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  
  useEffect(() => {
    assignmentStatusList(user?.token)
    .then(res => {
      console.log(JSON.stringify(res));
      if (res?.data?.success) {
        setStatuses(res?.data?.assignmentStatuses);
        setActiveTab(res?.data?.assignmentStatuses[0].id);
      }
    })
    .catch(error => {
      console.error('Error fetching assignments:', error);
    });
  
  }, []);

  useEffect(()=>{
    setAssignments([])
    orderList(user?.id, activeTab, user?.token)
    .then(res => {
      console.log(JSON.stringify(res));
      if (res?.data?.success) {
        setAssignments(res?.data?.assignments);
      }
    })
    .catch(error => {
      console.error('Error fetching assignments:', error);
    });
  },[activeTab])


  const Item = ({ item }) => (
    <View style={{ marginTop: height * 0.02 }}>
      <Text style={{ marginHorizontal: width * 0.04 }}>Heading</Text>
      <View style={styles.item}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:20 }}>
          <Text style={{ color: '#031D53', fontWeight: '400', fontSize: width * 0.04 }}>LA56120</Text>
          <Image source={require('../assetes/images/pending.png')} style={{ height: width * 0.05, width: width * 0.05 }} />
        </View>
        <View style={styles.itemDetailRow}>
          <Text>Subject Area: </Text>
          <Text> {item.subject}</Text>
        </View>
        <View style={styles.itemDetailRow}>
          <Text>Service: </Text>
          <Text>{item.service || 'Coursework'}</Text>
        </View>
        <View style={styles.itemDetailRow}>
          <Text>University Name: </Text>
          <Text>{item.university || 'N/A'}</Text>
        </View>
        <View style={styles.itemDetailRow}>
          <Text>Wordcount: </Text>
          <Text>{item.pages*250 || 'N/A'}</Text>
        </View>
        <View style={[styles.itemDetailRow,{marginBottom:20}]}>
          <Text>Deadline: </Text>
          <Text>{item.deadline || 'N/A'}</Text>
        </View>
       { item?.status=='accepted'?
         <Pressable
         style={{backgroundColor:'#031D53', width:'100%', paddingVertical:10, marginTop:10,borderBottomLeftRadius: 8, borderBottomRightRadius:8}}
         >
           <Text style={{color:'#FFF', textAlign:'center'}}>Pay Now</Text>
         </Pressable>
         :item?.status=='completed'?
         <Pressable
         style={{backgroundColor:'#FF5F00', width:'100%', paddingVertical:10, marginTop:10,borderBottomLeftRadius: 8, borderBottomRightRadius:8}}
         >
           <Text style={{color:'#FFF', textAlign:'center'}}>Apply for Revision</Text>
         </Pressable>
         :null
       }
      </View>
      
    </View>
  );
  




  return (
    <View style={styles.mainContainer}>
      <View>
      <ScrollView
      horizontal={true}
      >
        <View style={{flexDirection:'row',height:width*0.06, width:width,paddingHorizontal:width*0.02, justifyContent:'space-between',display:'flex' }}>
        { statuses?.length > 0 && statuses?.map(item=>{
          return (
            <Pressable
            key={item?.id} 
            style={{flex:1,borderRadius:25,backgroundColor:item.id==activeTab?item?.color:'#e5e5e5', paddingVertical:5, marginRight:5,}}
            onPress={()=>setActiveTab(item?.id)}>
          <Text style={{textTransform: 'capitalize',fontSize:width*0.025,  textAlign:'center',  color:'#FFF'  }}>{item?.name}</Text>
          </Pressable>
        )
        })
        }

        </View>
      </ScrollView>
      </View>
      <FlatList
        data={assignments}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
   flex:1,
    // height: height,
    // width: width,
    flexDirection: "column",
    backgroundColor: '#FFF',
    // position: 'relative',
  },
  item: {
    backgroundColor: '#FFF',
    marginTop: height * 0.01,
    paddingHorizontal:2,
    paddingTop:20,
    paddingBottom:2,
    marginBottom: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  itemDetailRow: {
    flexDirection: 'row',
    marginHorizontal:18
  },
});

export default Orders;
