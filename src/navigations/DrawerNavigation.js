import * as React from 'react';
import 'react-native-gesture-handler';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
import { NavigationContainer, CommonActions  } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/HomeScreen';
import Orders from '../screens/OrdersScreen';
import Profile from '../screens/ProfileScreen';
import GetStartedScreen from '../navigations/MainStackNavigation';

import CustomDrawerHeader from '../components/CustomDrawerHeader';
import NewAssignment from '../screens/NewAssignmentScreen';
import Wallet from '../screens/WalletScreen';
import Settings from '../screens/SettingsScreen';
import Referral from '../screens/ReferralScreen';
import Policy from '../screens/PolicyScreen';
import Support from '../screens/SupportScreen';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL,IMAGE_PATH } from '../services/userServices';
import { COLORS } from '../config';
import { userLogout } from '../services/userServices'
import { removeData } from '../asyncStorage';
import { setUser } from '../redux/userReducer';

const { height, width } = Dimensions.get('screen');
const Drawer = createDrawerNavigator();

// Define an image map
const imageMap = {
  Home: require('../assetes/images/home-not-fill.png'),
  'New Assignment': require('../assetes/images/add-assignment.png'),
  Wallet: require('../assetes/images/wallet.png'),
  'My Orders': require('../assetes/images/orders.png'),
  Settings: require('../assetes/images/settings.png'),
  Referral: require('../assetes/images/referral.png'),
  Policy: require('../assetes/images/policy.png'),
  Support: require('../assetes/images/support.png'),
  Profile: require('../assetes/images/user.png'),
};

const CustomDrawerItem = ({ label, onPress, isActive }) => {
  
  const user = useSelector((state) => state.userReducer.userInfo);
  const image = imageMap[label] || require('../assetes/images/home.png'); // Fallback image

  return (
   label === 'Profile'?
    <TouchableOpacity
      style={[styles.drawerItemProfile, isActive && styles.drawerItemActive]}
      onPress={onPress}
    >
      <Image source={
              user?.image
                ? { uri: BASE_URL + IMAGE_PATH + user.image }
                : require('../assetes/images/profile.png')
            } style={{height:width*0.14,marginRight:10, width:width*0.14, borderRadius:100}} />
      <View>
      <Text style={[styles.drawerItemActive,{color:'#FF5F00',fontWeight:'bold',fontSize:width*0.04}]}>
      {user?.name}
      </Text>
      <Text style={[styles.drawerItemActive,{color:'#e2e2e2',fontSize:width*0.025}]}>
      {user?.email}
      </Text>
      </View>
    </TouchableOpacity>:label === 'GetStartedScreen'?null:
    <TouchableOpacity
    style={[styles.drawerItem, isActive && styles.drawerItemActive]}
    onPress={onPress}
  >
    <Image source={image} style={styles.drawerItemImage} />
    <Text style={[ styles.drawerItemText, isActive && styles.drawerItemTextActive, isActive?styles.drawerItemActiveText:styles.drawerItemText]}>
      {label}
    </Text>
  </TouchableOpacity>
  );
};

const CustomDrawer = (props) => {
  const dispatch=useDispatch();
  const { state, navigation } = props;
  const { routes, index } = state;
  const logout = async () => {
    dispatch(setUser(null));
    await userLogout();
    await removeData('@token');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'GetStartedScreen' }],
      })
    ); // Ensure 'Login' is in your navigation structure
  };

  return (
    <View style={styles.drawerContainer}>
      <Text style={{ marginTop: height * 0.08, marginBottom: height * 0.04, paddingHorizontal: width * 0.05, fontSize: width * 0.07 }}>Menu</Text>
      <View style={styles.drawerContent}>
        {routes.map((route, idx) => (
          <CustomDrawerItem
            key={route.key}
            label={route.name}
            onPress={() => navigation.navigate(route.name)}
            isActive={index === idx}
          />
        ))}
         <Pressable
         style={{paddingHorizontal:width*0.045, paddingVertical:width*0.04, borderBottomWidth:1, borderBottomColor:COLORS.LIGTH_GRAY, flexDirection:'row'}}
         onPress={()=>logout()}
         >
        <Image
          source={require('../assetes/images/logout.png')}
          style={styles.drawerItemImage}
        />
        <Text>Logout</Text>
      </Pressable>
      </View>
     
    </View>
  );
};

const DrawerNavigation = () => (
  <>
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerTitle: () => <Image source={require('../assetes/images/logo.png')} style={{ height: 40, width: 120 }} />,
        headerTitleAlign: 'center',
        drawerStyle: {
          width: width * 0.7,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{}}
      />
      <Drawer.Screen
        name="New Assignment"
        component={NewAssignment}
        options={{ title: 'New Assignment' }}
      />
      <Drawer.Screen
        name="Wallet"
        component={Wallet}
        options={{ title: 'Wallet' }}
      />
      <Drawer.Screen
        name="My Orders"
        component={Orders}
        options={{ title: 'My Orders' }}
      />
      <Drawer.Screen
        name="Referral"
        component={Referral}
        options={{ title: 'Referral' }}
      />
      <Drawer.Screen
        name="Policy"
        component={Policy}
        options={{ title: 'Policy' }}
      />
      <Drawer.Screen
        name="Support"
        component={Support}
        options={{ title: 'Support' }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          headerStyle: { backgroundColor: '#FFF' },
          headerTintColor: '#031D53',
        }}
      />      
      <Drawer.Screen
        name="GetStartedScreen"
        component={GetStartedScreen}
        options={{
           headerShown:false
        }}
      />      
    </Drawer.Navigator>
  </>
);

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    position: 'relative',
  },
  drawerContent: {
    flex: 1,
  },
  drawerItem: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFF', // Default background color
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    flexDirection: 'row', // Align image and text horizontally
    alignItems: 'center',
  },
  drawerItemProfile: {
    width: '100%',
    paddingTop: 15,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: '#031D53', // Default background color
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row', // Align image and text horizontally
    alignItems: 'center',
  },
  drawerItemActive: {
    backgroundColor: '#031D53', // Background color for the active item
  },
  drawerItemText: {
    color: '#031D53', // Default text color
    fontSize: 16,
  },
  drawerItemActiveText: {
    color: '#FFF', // Default text color
    fontSize: 16,
  },
  drawerItemProfileText: {
    color: '#FFF', // Default text color
    fontSize: 16,
  },
  drawerItemTextActive: {
    fontWeight: 'bold', // Style for the text of the active item
  },
  drawerItemImage: {
    width: 24, // Adjust as needed
    height: 24, // Adjust as needed
    marginRight: 10, // Space between image and text
  },
});

export default DrawerNavigation;
