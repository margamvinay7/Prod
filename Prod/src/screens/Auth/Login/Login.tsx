import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ioncicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

import {useDispatch} from 'react-redux';
import {userLogin} from '../../../redux/features/userSlice';

const Login = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 5000);
  }, [error]);

  const handleLogin = () => {
    setLoading(true);
    if (credentials.email === '' || credentials.password === '') {
      setError('Please fill in all fields');
      setLoading(false);
    } else {
      dispatch(userLogin(credentials));
      console.log('login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.splashImage}
        source={require('../../../assets/Frame.png')}
      />
      <Text style={styles.heading}>Let's Get You In!</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={credentials.email}
        placeholderTextColor="grey"
        onChangeText={(text: string) =>
          setCredentials({...credentials, email: text})
        }
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        placeholderTextColor="grey"
        onChangeText={(pass: string) =>
          setCredentials({...credentials, password: pass})
        }
      />
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      {loading ? (
        <>
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: 'grey',
              },
              styles.login,
            ]}
            disabled>
            <Text style={styles.loginText}>Loggin In...</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable
            style={({pressed}) => [
              {
                opacity: pressed ? 0.8 : 1,
              },
              styles.login,
            ]}
            onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
            <Ioncicons name="chevron-forward" size={20} color="#fff" />
          </Pressable>
          <Pressable
            style={({pressed}) => [
              {
                opacity: pressed ? 0.8 : 1,
              },
              styles.signupWithGoogle,
            ]}
            onPress={handleLogin}>
            <Text style={styles.signupWithGoogleText}>Login </Text>
            <Image
              style={{width: 30, height: 30}}
              source={require('../../../assets/search.png')}
            />
          </Pressable>
        </>
      )}

      <Pressable
        style={({pressed}) => [
          {
            opacity: pressed ? 0.8 : 1,
            marginVertical: 15,
          },
        ]}
        onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.signUpBtnText}>Forgot Password ?</Text>
      </Pressable>
      <KeyboardAvoidingView style={styles.row}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signUpBtnText}>Register</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
