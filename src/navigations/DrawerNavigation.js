import * as React from 'react';
import 'react-native-gesture-handler';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/HomeScreen';
import Orders from '../screens/OrdersScreen';

const { width } = Dimensions.get('screen');
const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({ label, onPress, isActive }) => (
  <TouchableOpacity
    style={[styles.drawerItem, isActive && styles.drawerItemActive]}
    onPress={onPress}
  >
    <Text style={[styles.drawerItemText, isActive && styles.drawerItemTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const CustomDrawer = (props) => {
  const { state, navigation } = props;
  const { routes, index } = state;

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerContent}>
        {routes.map((route, idx) => (
          <CustomDrawerItem
            key={route.key}
            label={route.name}
            onPress={() => navigation.navigate(route.name)}
            isActive={index === idx}
          />
        ))}
      </View>
    </View>
  );
};

const DrawerNavigation = () => (
  <Drawer.Navigator
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerTitleAlign: 'center',
      drawerStyle: {
        width: width * 0.8, // Adjust width if needed
      },
    }}
  >
    <Drawer.Screen
      name="Home"
      component={Home}
      options={{
        title: 'Home',
      }}
    />
    <Drawer.Screen
      name="My Orders"
      component={Orders}
      options={{
        title: 'My Orders',
      }}
    />
    {/* Add more screens as needed */}
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
    // justifyContent: 'center',
  },
  drawerItem: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFF', // Default background color
    alignItems: 'flex-start',
    borderBottomWidth:1,
    borderBottomColor:'#e2e2e2'
  },
  drawerItemActive: {
    backgroundColor: '#fff5e5', // Background color for the active item
  },
  drawerItemText: {
    color: '#0007', // Default text color
    fontSize: 16,
  },
  drawerItemTextActive: {
    fontWeight: 'bold', // Style for the text of the active item
  },
});

export default DrawerNavigation;
