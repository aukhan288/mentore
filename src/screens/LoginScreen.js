import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { setData } from "../asyncStorage";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import { loginUser } from '../services/userServices';
import ErrorComponent from "../components/ErrorComponent";
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/userReducer';

const { height, width } = Dimensions.get('screen');

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [loginLoader, setLoginLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState([]);
  const [passwordError, setPasswordError] = useState('');

  const login = async () => {
    setLoginLoader(true);
    setLoginError('');
    setEmailError([]);
    setPasswordError('');

    // Basic validation
    if (!email || !password) {
      setLoginLoader(false);
      if (!email) setEmailError(['Email is required']);
      if (!password) setPasswordError(['Password is required']);
      return;
    }

    const result = await loginUser({ email, password });

    setLoginLoader(false);
    if (result.code === 200) {
      // Dispatch user info to Redux
      dispatch(setUser(result.data.user));
      // Save token in AsyncStorage
      await setData('@token', result.data.user.token);
      navigation.navigate('DrawerStack');
    } else {
      // Handle errors
      if (result.status === 401) {
        setLoginError(result.data.error);
      }
      if (result.status === 422) {
        if (result.data.errors.email) {
          setEmailError(result.data.errors.email);
        }
        if (result.data.errors.password) {
          setPasswordError(result.data.errors.password);
        }
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      {loginLoader && (
        <Spinner visible={loginLoader} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />
      )}
      <View style={{ width, paddingHorizontal: width * 0.04 }}>
        <Image
          source={require('../assetes/images/logo.png')}
          style={{ marginTop: height * 0.04, width: width * 0.36, height: width * 0.1 }}
        />
        <Text style={{ fontSize: width * 0.07, color: '#1B2A56', marginTop: height * 0.05 }}>Login</Text>
      </View>

      <View style={styles.formView}>
        {loginError && <ErrorComponent error={loginError} />}
        {emailError.length > 0 && <ErrorComponent error={emailError} />}
        {passwordError && <ErrorComponent error={passwordError} />}
        
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={[styles.textInput, { marginTop: 5 }]}
          onChangeText={setEmail}
        />
        <View style={styles.passwordInputRow}>
          <TextInput
            placeholder="Password"
            style={{ flex: 0.9 }}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeBtn}
            onPress={() => setShowPassword(prev => !prev)}
          >
            <Icon name={showPassword ? "eye" : "eye-slash"} size={30} color="#0007" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 0.91 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: height * 0.03 }}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              tintColors={{ true: '#1B2A56', false: '#CCCCCC' }}
              onValueChange={setToggleCheckBox}
            />
            <Text>Remember me</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={{ alignSelf: 'flex-end', marginTop: height * 0.01 }}
          >
            <Text style={{ color: '#FF5F00' }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ position: 'absolute', bottom: height * 0.02, width, justifyContent: 'center' }}>
        <TouchableOpacity onPress={login} style={styles.loginBtn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <Text>New here?</Text>
          <TouchableOpacity style={{ paddingLeft: 8 }} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signUpTxt}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height,
    width,
    backgroundColor: '#F4FAEB',
    flex: 1,
    position: 'relative'
  },
  formView: {
    width,
    alignItems: 'center',
    marginTop: height * 0.05,
    paddingHorizontal: width * 0.05
  },
  passwordInputRow: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    width: '100%',
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#0008",
    paddingLeft: 10,
    borderRadius: 7,
    marginBottom: height * 0.03
  },
  loginBtn: {
    backgroundColor: '#1B2A56',
    width: width * 0.91,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 7,
    marginTop: 20,
    alignSelf: 'center'
  },
  loginText: {
    color: '#FFF'
  },
  eyeBtn: {
    justifyContent: 'center',
    paddingHorizontal: width * 0.02
  },
  signUpTxt: {
    fontWeight: '700',
    fontSize: 16,
    color: '#FF5F00',
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});

export default Login;
