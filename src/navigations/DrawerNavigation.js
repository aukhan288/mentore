import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/HomeScreen';
import CustomDrawer from '../components/CustomDrawer';
import CustomDrawerHeader from '../components/CustomDrawerHeader';
import { Image, Text, View, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
const Drawer = createDrawerNavigator();

const DrawerNavigation = (props) => {
  
  return (
      <Drawer.Navigator
      detachInactiveScreens
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitle: () => <CustomDrawerHeader />,
          drawerStyle: {
            // backgroundColor: '#f5f5f5', // Customize drawer background color
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
        {/* Add more screens here */}
      </Drawer.Navigator>
  );
};

export default DrawerNavigation;
