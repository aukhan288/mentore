import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/HomeScreen';
import 'react-native-gesture-handler';

import CustomDrawerHeader from '../components/CustomDrawerHeader'

const Drawer = createDrawerNavigator();

const DrawerNavigation=(props)=> {
    return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} 
        options={{headerTitleAlign:'center',headerTitle:()=>{return(<CustomDrawerHeader/>)}}}
      />
      {/* Add more screens here */}
    </Drawer.Navigator>
    );
}

export default DrawerNavigation;
