import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { WebView } from 'react-native-webview';

const { height, width } = Dimensions.get('screen');

const WebViewScreen = () => {
  const [loader, setLoader] = useState(true);

  const jsCode = `
    (function() {
      // Hide all elements
      document.body.style.visibility = 'hidden';

      // Show the specific div
      var targetDiv = document.getElementById('pc-form');
      if (targetDiv) {
        targetDiv.style.visibility = 'visible';
      }

      // Optionally, you can send the content of the div back to the React Native app
      // window.ReactNativeWebView.postMessage(targetDiv ? targetDiv.innerHTML : 'Content not found');
    })();
  `;

  const handleMessage = (event) => {
    // Handle the message sent from the injected JavaScript
    Alert.alert('Content received:', event.nativeEvent.data);
  };

  return (
    <View style={styles.mainContainer}>
      {loader && <Spinner
        visible={loader}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />}
      <WebView
        javaScriptEnabled={true}
        // injectedJavaScript={jsCode}
        onLoadStart={() => setLoader(true)}
        onLoadEnd={() => setLoader(false)}
        onError={() => setLoader(false)} // Handle loading errors
        onMessage={handleMessage} // Handle messages from injected JavaScript
        source={{ uri: 'https://assignmentmentor.co.uk/plagiarism-checker/' }}
        style={styles.webView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    flex: 1,
    backgroundColor: '#FFFEFB'
  },
  webView: {
    flex: 1
  },
  spinnerTextStyle: {
    color: '#FFF'
  }
});

export default WebViewScreen;
