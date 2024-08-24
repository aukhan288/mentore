import  React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import ForgotPassword from '../screens/ForgotPasswordScreen';
import DrawerNavigation from "./DrawerNavigation";
import GetStarted from "../screens/GetStartedScreen"
import Profile from '../screens/ProfileScreen';
import EditProfile from '../screens/EditProfileScreen'
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/userReducer'
import SplashScreen from 'react-native-splash-screen'

import { getData } from '../asyncStorage';


const Stack = createNativeStackNavigator();


function MainStackNavigation(props) {
  console.log('aaaaaa',props);
  
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  useEffect( ()=>{
    // SplashScreen.show();
    // getData('@user').then(u=>{
      dispatch(setUser(props?.user))
      SplashScreen.hide();
    //     }).catch(e=>{
    //         SplashScreen.hide();
      
    //  })
},[])
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        {/* Authentication Stack */}
       {user?
        <Stack.Screen 
        name="DrawerStack" 
        component={DrawerNavigation} 
        options={{ headerShown: false }} // Hide the header for the drawer stack
      />
       : 
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
            headerTitle: 'Forgot Password' 
          }} 
        />
         <Stack.Screen 
         name="Profile" 
         component={Profile} 
         options={{
           headerShown: true,
           headerStyle: { backgroundColor: '#031D53' }, 
           headerTintColor: '#FFF', 
           headerTitle: 'Profile',
           
         }} 
       />
         <Stack.Screen 
         name="EditProfile" 
         component={EditProfile} 
        
         options={{
           headerShown: true,
           headerStyle: { backgroundColor: '#031D53' }, 
           headerTintColor: '#FFF', 
           headerTitle: 'Edit Profile',
           
         }} 
       />
      
        </>
      }
        
        
        {/* Main App Stack */}
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigation;
