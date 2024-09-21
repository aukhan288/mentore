import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import ForgotPassword from '../screens/ForgotPasswordScreen';
import GetStarted from "../screens/GetStartedScreen";
import DrawerStack from '../navigations/DrawerNavigation'
import StripeCard from '../screens/StripeCardScreen'



const Stack = createNativeStackNavigator();

function AuthStackNavigation() {
  
  return (
      <Stack.Navigator>
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
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: '#1B2A56' },
                headerTintColor: '#FFF',
                headerTitle: 'Forgot Password',
              }}
            />
             <Stack.Screen
              name="StripeCard"
              component={StripeCard}
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: '#031D53' },
                headerTintColor: '#FFF',
                headerTitle: 'Stripe Payment',
              }}
            />
            <Stack.Screen
              name="DrawerStack"
              component={DrawerStack}
              options={{
                headerShown: false,
                headerStyle: { backgroundColor: '#1B2A56' },
                headerTintColor: '#FFF',
                headerTitle: '',
              }}
            />
        
      </Stack.Navigator>
  );
}

export default AuthStackNavigation;
