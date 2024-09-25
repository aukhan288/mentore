import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getData } from '../asyncStorage';
import { setUser } from '../redux/userReducer';
import DrawerStack from '../navigations/DrawerNavigation';
import EditProfile from '../screens/EditProfileScreen';
import ChangePassword from '../screens/ChangePasswordScreen';
import AddOrder from '../screens/NewAssignmentScreen';
import WebViewScreen from '../screens/WebViewScreen';
import StripeCard from '../screens/StripeCardScreen';
import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import ForgotPassword from '../screens/ForgotPasswordScreen';
import GetStarted from '../screens/GetStartedScreen';
import { getProfile } from '../services/userServices';
import { setToken } from '../services/userServices'; // Import the token management functions

const Stack = createNativeStackNavigator();

function MainStackNavigation() {
  const user = useSelector((state) => state.userReducer.userInfo);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getData('@token');
        if (token) {
          setToken(token); // Set the token using the new function
          const res = await getProfile(token);
          dispatch(setUser(res));
        }
      } catch (error) {
        console.error('Failed to fetch token or user profile:', error);
      } finally {
        setIsLoading(false); // Ensure loading state is set to false
      }
    };

    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4FAEB' }}>
        <ActivityIndicator size="large" color="#1B2A56" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {user && Object.keys(user).length > 0 ? (
        <>
          <Stack.Screen
            name="DrawerStack"
            component={DrawerStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddOrder"
            component={AddOrder}
            options={{ headerTitle: "New Order" }}
          />
          <Stack.Screen name="EditProfile" component={EditProfile} />
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
        </>
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
}

export default MainStackNavigation;
