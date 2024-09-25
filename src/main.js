import React,{useEffect, useState} from "react";
import MainStackNavigation from "./navigations/MainStackNavigation"
import { Provider } from 'react-redux';
import { store } from './redux/store';



const Main =()=>{   

   

    return(
        <Provider store={store}>
        <MainStackNavigation />
        </Provider>
    )
}

export default Main;
