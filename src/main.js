import React from "react";
import { Text } from "react-native";
import MainStackNavigation from "./navigations/MainStackNavigation"
import Login from "./screens/LoginScreen";
import DrawerNavigation from "./navigations/DrawerNavigation";
const Main =()=>{
    return(
        // <DrawerNavigation/>
        <MainStackNavigation/>
    )
}

export default Main;
