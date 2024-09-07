import React,{useEffect, useState} from "react";
import MainStackNavigation from "./navigations/MainStackNavigation"
import AuthStackNavigation from "./navigations/AuthStackNavigation";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { getData } from './asyncStorage';
import SplashScreen from "react-native-splash-screen";

const Main =()=>{   
    const [loading, setLoading]=useState(true);
    const [isUser, setIsUser]=useState(null);
    useEffect(()=>{
        getData('@user')
        .then(async data=>{
            console.log('ddddddd',data);
            setLoading(false);
            setIsUser(data);
            // SplashScreen.hide();
            
        })
        .catch(e=>{
            setLoading(false);
            // SplashScreen.hide();
            console.log('eeeeeeeeee',e);
            
        })
    },[])
if (loading) {
    return null;
}
    return(
        <Provider store={store}>
        {isUser? <MainStackNavigation user={isUser} />:<AuthStackNavigation/>}
        </Provider>
    )
}

export default Main;
