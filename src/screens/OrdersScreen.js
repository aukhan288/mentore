import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView, FlatList,useWindowDimensions } from "react-native"
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
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
    <View>
        <Text>Heading</Text>
        <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
    </View>
  );
const Orders = (props) => {
    const FirstRoute = () => (
        <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
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
})
export default Orders;