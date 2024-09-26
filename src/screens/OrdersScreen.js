import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, FlatList, ActivityIndicator, Pressable } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { orderList } from "../services/userServices";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation,useIsFocused } from '@react-navigation/native';

const { height, width } = Dimensions.get('screen');



const Orders = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.userReducer.userInfo.user);
  const [assignments, setAssignments] = useState([]);
  const [loader, setLoader] = useState(false);
  const isFocused = useIsFocused();
  
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'In-Process' },
    { key: 'second', title: 'Completed' },
  ]);

  useEffect(() => {
    setLoader(true);
    const fetchAssignments = async () => {
      try {
        const res = await orderList(index);
        setLoader(false);
        if (res?.data?.success) {
          setAssignments(res?.data?.assignments);
        }
      } catch (error) {
        setLoader(false);
        console.error('Error fetching assignments:', error);
      }
    };

    if (isFocused) {
      fetchAssignments();
    }
  }, [isFocused, index]);

  const handleIndexChange = (newIndex) => {
    setAssignments([]); // Clear assignments when changing tabs
    setIndex(newIndex);
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      style={{backgroundColor:'#FFF', display:'flex',height:60}}
      indicatorStyle={styles.indicator}
      renderLabel={({ route, focused }) => (        
          <Text style={[styles.tabLabel, focused && styles.activeTabLabel,{width:width/2,paddingBottom:20, height:60, textAlignVertical:'center', backgroundColor:focused?'#031D53':'#C3C3C3'}]}>{route.title}</Text>
      )}
    />
  );

  const renderAssignmentList = () => (
    <View>
      {loader && <ActivityIndicator size="small" color="#000" />}
      <FlatList
        data={assignments}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id.toString()}
      />
         {index==0 && <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>New Order</Text>

      </TouchableOpacity>} 
      
    </View>
  );

  const renderScene = SceneMap({
    first: renderAssignmentList,
    second: renderAssignmentList,
  });
  const Item = React.memo(({ item }) => (
    <View style={{ marginTop: height * 0.02 }}>
      <Text style={{ marginHorizontal: width * 0.04 }}>Heading</Text>
      <View style={styles.item}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginHorizontal:16, paddingVertical:20 }}>
          <Text style={{ color: '#031D53', fontWeight: '400', fontSize: width * 0.04 }}>{item?.assignments_id}</Text>
          {(index==0)?
          <Image source={require('../assetes/images/pending.png')} style={{ height: width * 0.05, width: width * 0.05 }} />
          :<Icon name="check-circle" color={'#09C126'} size={30} />}
        </View>
        <View style={styles.itemDetailRow}>
          <Text>Subject Area: </Text>
          <Text>{item.subject}</Text>
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
          <Text>{item.pages * 250 || 'N/A'}</Text>
        </View>
        <View style={styles.itemDetailRow}>
          <Text>Deadline: </Text>
          <Text>{item.deadline || 'N/A'}</Text>
        </View>
        {(index==1) &&
        <Pressable
        onPress={()=>{navigation.navigate('AssignmentRevision')}}
        style={{backgroundColor:'#FF5F00',borderBottomRightRadius:8,overflow:'hidden', borderBottomLeftRadius:8,marginTop:15}}>
        <Text style={{color:'#FFF',textAlign:'center', paddingVertical:10}}>Apply for Rivision</Text>
      </Pressable>
        }
      </View>
      
    </View>
  ));
  return (
    <View style={styles.mainContainer}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={handleIndexChange}
        renderTabBar={renderTabBar}
        initialLayout={{ width: width }}
      />
   
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    backgroundColor: '#FFF',
  },
  tabBar: {
    backgroundColor: '#FFF',
    height: 50, // Tab bar height
  },
  indicator: {
    backgroundColor: '#FF5F00', // Color of the indicator
  },
  tabLabelContainer: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    width: '100%', // Full width
    height: '100%', // Full height
  },
  tabLabel: {
    color: '#000', // Color of the inactive tab labels
    fontWeight: 'bold',
    textAlign: 'center', // Center text within the label
    flex: 1,
    paddingVertical: 10, // Optional: Adjust padding for height
  },
  activeTabLabel: {
    color: '#FFF', // Color of the active tab label
    backgroundColor: '#031D53', // Background color for the active tab
  },
  item: {
    backgroundColor: '#FFF',
    padding: 4,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  itemDetailRow: {
    flexDirection: 'row',
    paddingHorizontal:16
  },
  orderButton: {
    backgroundColor: '#FF5F00',
    marginHorizontal: width * 0.04,
    paddingVertical: 15,
    marginTop: height * 0.1,
  },
  orderButtonText: {
    textAlign: 'center',
    color: '#FFF',
  },
});

export default Orders;
