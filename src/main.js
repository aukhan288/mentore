import React,{useEffect} from "react";
import { Text } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import MainStackNavigation from "./navigations/MainStackNavigation"
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { getData } from './asyncStorage';
let us=null;
const Main =()=>{
    
    useEffect( ()=>{
        // SplashScreen.show();
        getData('@user').then(u=>{
        //   dispatch(setUser(u))
       us=u;
            }).catch(e=>{
                SplashScreen.hide();
          
         })
    },[])
    return(
        // <DrawerNavigation/>
        <Provider store={store}>
        <MainStackNavigation user={us}/>
        </Provider>
    )
}

export default Main;
