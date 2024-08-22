import  React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import ForgotPassword from '../screens/ForgotPasswordScreen';
import DrawerNavigation from "./DrawerNavigation";
import GetStarted from "../screens/GetStartedScreen"
import Home from '../screens/HomeScreen';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/userReducer'

import { getData } from '../asyncStorage';

import { Provider } from 'react-redux';
import { store } from '../redux/store';
const Stack = createNativeStackNavigator();


function MainStackNavigation(props) {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  useEffect( ()=>{
       getData('@user').then(u=>{
          console.log('jjjjjjj',u);
          dispatch(setUser(u))
          
       }).catch(e=>{
        console.log(e);
        
       })
  },[])
  return (
    <Provider store={store}>
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
        </>
      }
        
        
        {/* Main App Stack */}
       
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default MainStackNavigation;
