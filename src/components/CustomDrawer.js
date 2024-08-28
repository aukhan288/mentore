import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';


const { height, width } = Dimensions.get('screen');

function CustomDrawer(props) {
  const user = useSelector((state) => state.userReducer.user);
  const navigation = useNavigation();

  return (
    <>
      <DrawerContentScrollView {...props} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Menu</Text>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          icon={() => <Image style={styles.icon} source={require('../assetes/images/add-assignment.png')} />}
          label="New Assignment"
          onPress={() => navigation.navigate('NewAssignment')} // Adjust navigation target
        />
        <DrawerItem
          icon={() => <Image style={styles.icon} source={require('../assetes/images/wallet.png')} />}
          label="Wallet"
          onPress={() => navigation.navigate('Wallet')} // Adjust navigation target
        />
        <DrawerItem
          icon={() => <Image style={styles.icon} source={require('../assetes/images/document.png')} />}
          label="My Orders"
          onPress={() => navigation.navigate('Orders')} // Adjust navigation target
        />
        <DrawerItem
          icon={() => <Image style={styles.icon} source={require('../assetes/images/settings.png')} />}
          label="Settings"
          onPress={() => navigation.navigate('Settings')} // Adjust navigation target
        />
        <DrawerItem
          icon={() => <Image style={styles.icon} source={require('../assetes/images/referral.png')} />}
          label="Referral"
          onPress={() => navigation.navigate('Referral')} // Adjust navigation target
        />
        <DrawerItem
          icon={() => <Image style={styles.icon} source={require('../assetes/images/referral.png')} />}
          label="tools" 
          onPress={() => navigation.navigate('Referral')} // Adjust navigation target
        />
        <DrawerItem
          icon={() => <Image style={styles.icon} source={require('../assetes/images/policy.png')} />}
          label="Policy"
          onPress={() => navigation.navigate('Policy')} // Adjust navigation target
        />
        <DrawerItem
          icon={() => <Image style={styles.icon} source={require('../assetes/images/support.png')} />}
          label="Support"
          onPress={() => navigation.navigate('Support')} // Adjust navigation target
        />
      </DrawerContentScrollView>
      
      <TouchableOpacity style={styles.userContainer}>
        <Image style={styles.userIcon} source={require('../assetes/images/user.png')} />  
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:0
  },
  header: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    height: 20,
    width: 20,
  },
  userContainer: {
    backgroundColor: '#031C53',
    flexDirection: 'row',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
    alignItems: 'center',
  },
  userIcon: {
    height: 30,
    width: 30,
  },
  userInfo: {
    marginLeft: width * 0.04,
  },
  userName: {
    color: '#FFF',
  },
  userEmail: {
    color: '#FFF8',
  },
});

export default CustomDrawer;
