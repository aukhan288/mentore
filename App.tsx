/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Main from './src/main';
import { NavigationContainer } from '@react-navigation/native';


function App(): React.JSX.Element {
  return (
    <NavigationContainer>
    <Main/>
    </NavigationContainer>
  );
}

export default App;
