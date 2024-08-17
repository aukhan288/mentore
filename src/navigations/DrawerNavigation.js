import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/HomeScreen';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

const DrawerNavigation=(props)=> {
    return (
      <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      {/* Add more screens here */}
    </Drawer.Navigator>
    </NavigationContainer>
    );
}

export default DrawerNavigation;
