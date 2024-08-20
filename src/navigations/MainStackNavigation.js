import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import ForgotPassword from '../screens/ForgotPasswordScreen';
import DrawerNavigation from "./DrawerNavigation";
import GetStarted from "../screens/GetStartedScreen"
import Home from '../screens/HomeScreen';
import 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();

function MainStackNavigation(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Authentication Stack */}
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="GetStarted" 
          component={GetStarted} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
       
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPassword} 
          options={{ 
            headerShown: true, 
            headerStyle: { backgroundColor: '#1B2A56' }, 
            headerTintColor: '#FFF', 
            headerTitle: 'Forgot Password' 
          }} 
        />
        
        {/* Main App Stack */}
        <Stack.Screen 
          name="DrawerStack" 
          component={DrawerNavigation} 
          options={{ headerShown: false }} // Hide the header for the drawer stack
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigation;
