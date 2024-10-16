import { AppRegistry,PermissionsAndroid } from 'react-native';
import 'react-native-gesture-handler'; 
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

// Create a function to configure the notification channel
messaging().requestPermission();
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
const configureNotificationChannel = () => {
    PushNotification.createChannel(
        {
            channelId: "my_channel_id", // Unique channel ID
            channelName: "My App Notifications", // User-friendly name
            channelDescription: "A channel for my app notifications", // Optional description
            sound: "default", // Default sound for notifications
            importance: PushNotification.Importance.HIGH, // Importance level
            vibrate: true, // Vibration setting
        },
        (created) => console.log(`createChannel returned '${created}'`) // Optional callback
    );
};

// Configure notification channel on app launch
configureNotificationChannel();

// Handle background messages
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
    
    // Show a local notification for background messages
    // PushNotification.localNotification({
    //     channelId: "my_channel_id", // Use the channel ID created above
    //     title: remoteMessage.notification?.title || "Notification",
    //     message: remoteMessage.notification?.body || "You have a new message.",
    // });
});

// Handle foreground messages
messaging().onMessage(async (remoteMessage) => {
    console.log('Foreground message received:', remoteMessage);
    
    // Show a local notification for foreground messages
    PushNotification.localNotification({
        channelId: "my_channel_id",
        title: remoteMessage.notification?.title || 'Notification',
        message: remoteMessage.notification?.body || 'You have a new message.',
    });
});
messaging().requestPermission();

// Register the main application component
AppRegistry.registerComponent(appName, () => App);
