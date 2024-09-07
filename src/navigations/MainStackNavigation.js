import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from "./DrawerNavigation";
import EditProfile from '../screens/EditProfileScreen';
import ChangePassword from '../screens/ChangePasswordScreen';
import AddOrder from '../screens/NewAssignmentScreen';
import WebViewScreen from '../screens/WebViewScreen';
import StripeCard from '../screens/StripeCardScreen';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/userReducer';



const Stack = createNativeStackNavigator();

function MainStackNavigation(props) {
  const dispatch = useDispatch();

  useEffect(()=>{
       dispatch(setUser(props?.user))
  },[])


  return (
    <NavigationContainer>
      <Stack.Navigator>
            <Stack.Screen
              name="DrawerStack"
              component={DrawerNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddOrder"
              component={AddOrder}
              options={{ headerTitle: "New Order" }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: '#031D53' },
                headerTintColor: '#FFF',
                headerTitle: 'Change Password',
              }}
            />
            <Stack.Screen
              name="WebViewScreen"
              component={WebViewScreen}
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: '#031D53' },
                headerTintColor: '#FFF',
                headerTitle: 'Web View',
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
   
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigation;
