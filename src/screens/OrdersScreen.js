import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView, FlatList,useWindowDimensions } from "react-native"
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';

const { height, width } = Dimensions.get('screen');
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
  
  <View style={{marginTop:height*0.02}}>
      
        <Text style={{marginHorizontal:width*0.04}}>Heading</Text>
        <View style={styles.item}>
        <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
        <Text style={{color:'#031D53', fontWeight:'400', fontSize:width*0.04}}>LA56120</Text>
         {/* <Icon name='check-circle' size={width*0.06} color='#09C126'/> */}
         <Image source={require('../assetes/images/pending.png')} style={{height:width*0.05, width:width*0.05}} />
        </View>  
      <View style={styles.itemDetailRow}>
        <Text>Subject Area: </Text>
        <Text>Discrete Mathematics </Text>
      </View>
      <View style={styles.itemDetailRow}>
        <Text>Service: </Text>
        <Text>Coursework </Text>
      </View>
      <View style={styles.itemDetailRow}>
        <Text>University Name: </Text>
        <Text>Glasgow Caledonian University</Text>
      </View>
      <View style={styles.itemDetailRow}>
        <Text>Wordcount: </Text>
        <Text>3000</Text>
      </View>
      <View style={styles.itemDetailRow}>
        <Text>Deadline: </Text>
        <Text>25/09/2024</Text>
      </View>
    </View>
    </View>
  );
const Orders = (props) => {
  console.log(props);
  
    const FirstRoute = () => (
        <View>
        <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
         <TouchableOpacity style={{backgroundColor:'#FF5F00', marginHorizontal:width*0.04, paddingVertical:15, marginTop:height*0.1}}>
      <Text style={{textAlign:'center', color:'#FFF'}}>Order Now</Text>
    </TouchableOpacity>
      </View>
      );
      
      const SecondRoute = () => (
        
        <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
   
      
      );
      
      const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      });
      const [index, setIndex] = React.useState(0);
      const [routes] = React.useState([
        { key: 'first', title: 'In-Process' },
        { key: 'second', title: 'Completed' },
      ]);
      const CustomTabBar = props => {
        const { navigationState, position, jumpTo } = props;
      
        return (
          <View style={styles.tabBar}>
            {navigationState.routes.map((route, index) => {
              const isActive = index === navigationState.index;
              const backgroundColor = isActive ? '#031D53' : '#C3C3C3'; // Active tab color
              const color = isActive ? 'white' : 'black'; // Inactive tab color
      
              return (
                <TouchableOpacity
                  key={route.key}
                  style={[styles.tab, { backgroundColor }]}
                  onPress={() => jumpTo(route.key)}
                >
                  <Text style={[styles.label, { color }]}>{route.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      };
      
  return (
    <View style={styles.mainContainer}>
      <TabView
     renderTabBar={props => <CustomTabBar {...props} />}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: width }}
    />
      
      </View> 
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    flexDirection: "column",
    backgroundColor: '#FFF',
    position:'relative',
    
  },
  item: {
    backgroundColor: '#FFF',
    padding: 20,
    marginTop:height*0.01,
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

  },
  title: {
    fontSize: 32,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'lightgray', // Tab bar background color
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height*0.025,
  },
  label: {
    fontSize: width*0.04,
  },
  itemDetailRow:{
    flexDirection:'row'
  }
})
export default Orders;