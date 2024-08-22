import React,{useEffect} from "react";
import { Text } from "react-native";
import MainStackNavigation from "./navigations/MainStackNavigation"
import Login from "./screens/LoginScreen";
import DrawerNavigation from "./navigations/DrawerNavigation";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { setUser } from './redux/userReducer'
import SplashScreen from 'react-native-splash-screen'
const Main =()=>{
    useEffect(()=>{
        SplashScreen.show();
        setTimeout(() => {
            SplashScreen.hide();
        }, 5000);
    },[])
    return(
        // <DrawerNavigation/>
        <Provider store={store}>
        <MainStackNavigation/>
        </Provider>
    )
}

export default Main;
