import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, FlatList } from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { orderList } from "../services/userServices";
import { useIsFocused } from '@react-navigation/native';

const { height, width } = Dimensions.get('screen');

const Item = ({ item }) => (
  <View style={{ marginTop: height * 0.02 }}>
    <Text style={{ marginHorizontal: width * 0.04 }}>Heading</Text>
    <View style={styles.item}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
      <View style={styles.itemDetailRow}>
        <Text>Deadline: </Text>
        <Text>{item.deadline || 'N/A'}</Text>
      </View>
    </View>
  </View>
);

const Orders = () => {
  const user = useSelector((state) => state.userReducer.userInfo.user);
  const [assignments, setAssignments] = useState([]);

  const isFocused = useIsFocused();
  
  useEffect(() => {
    setAssignments([])
    orderList(user?.id, index, user?.token)
      .then(res => {
        if (res?.data?.success) {
          setAssignments(res?.data?.assignments);
        }
      })
      .catch(error => {
        console.error('Error fetching assignments:', error);
      });
  }, [isFocused, index]);

  const renderAssignmentList = () => (
    <View>
      <FlatList
        data={assignments}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity style={{ backgroundColor: '#FF5F00', marginHorizontal: width * 0.04, paddingVertical: 15, marginTop: height * 0.1 }}>
        <Text style={{ textAlign: 'center', color: '#FFF' }}>Order Now</Text>
      </TouchableOpacity>
      {console.log(index)
      }
    </View>
  );

  const renderScene = SceneMap({
    first: renderAssignmentList,
    second: renderAssignmentList, // Assuming you want to show the same data for both tabs; adjust accordingly.
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'In-Process' },
    { key: 'second', title: 'Completed' },
  ]);

  return (
    <View style={styles.mainContainer}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: width }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    flexDirection: "column",
    backgroundColor: '#FFF',
    position: 'relative',
  },
  item: {
    backgroundColor: '#FFF',
    padding: 20,
    marginTop: height * 0.01,
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
  },
});

export default Orders;
