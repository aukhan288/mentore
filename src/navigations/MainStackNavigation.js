import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Image, Dimensions, Alert, Modal, Platform, PERMISSIONS, Text } from 'react-native';
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
import Support from '../screens/SupportScreen';
import AssignmentRevision from "../screens/AssignmentRevisionScreen"
import AssignmentDetail from "../screens/AssignmentDetailScreen"
import ForgotPassword from '../screens/ForgotPasswordScreen';
import GetStarted from '../screens/GetStartedScreen';
import { getProfile, setUdid } from '../services/userServices';
import { setToken } from '../services/userServices'; // Import the token management functions
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import ForgotOTP from '../screens/ForgotOTP'
import ChangeForgotPassword from '../screens/ChangeForgotPasswordScreen'


const Stack = createNativeStackNavigator();
const {hieght, width}=Dimensions.get('screen')
function MainStackNavigation(props) {
  
  const user = useSelector((state) => state.userReducer.userInfo);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
 console.log('>>>>>>>>>>>>>>>>>***********',user);
 

  useEffect(() => {
    
    const fetchData = async () => {
      await messaging().registerDeviceForRemoteMessages();
      const udid = await messaging().getToken();
      console.log('uuuuuuu',udid);
      
      setUdid(udid)

      
      try {
        const token = await getData('@token');
        if (token) {
          setToken(token); // Set the token using the new function
          const res = await getProfile(token);
          console.log('ffffffffffff',res);
          if(res?.success){
            dispatch(setUser(res?.user));
          }else{
            dispatch(setUser(null));
          }
          
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
        <Image source={require('../assetes/images/logo.png')} style={{width:width*0.4, height:width*0.14}}/>
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
            name="Add Order"
            component={AddOrder}
            options={{ headerTitle: "New Order" }}
          />
          <Stack.Screen
            name="AssignmentRevision"
            component={AssignmentRevision}
            options={{ headerTitle: "Feedback" }}
          />
          <Stack.Screen
            name="AssignmentDetail"
            component={AssignmentDetail}
            options={{ headerTitle: "Assignment Detail" }}
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
            name="Support"
            component={Support}
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
          <Stack.Screen
            name="ChangeForgotPassword"
            component={ChangeForgotPassword}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: '#1B2A56' },
              headerTintColor: '#FFF',
              headerTitle: 'ChangeForgotPassword',
            }}
          />
          <Stack.Screen
            name="ForgotOTP"
            component={ForgotOTP}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: '#1B2A56' },
              headerTintColor: '#FFF',
              headerTitle: 'Forgot OTP',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default MainStackNavigation;
