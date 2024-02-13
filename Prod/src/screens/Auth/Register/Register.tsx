import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
// import {createUserWithEmailAndPassword} from 'firebase/auth';
// import {auth, provider} from '../../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {width} from '../../../Constants/dimensions';
import {userLogin, createUser} from '../../../redux/features/userSlice';
import {useDispatch} from 'react-redux';
import colors from '../../../Constants/colors';
import {signInWithPopup} from 'firebase/auth';
import auth from '@react-native-firebase/auth';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

export default function Register({navigation}: any) {
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
    }, 3000);
  }, [error]);

  // GoogleSignin.configure({
  //   webClientId:
  //     '321280827781-qc2k28eblb1ohvbfroi8noml035r0ppt.apps.googleusercontent.com',
  //   offlineAccess: false,
  // });

  const handleRegisterGoogle = async () => {
    //321280827781-qc2k28eblb1ohvbfroi8noml035r0ppt.apps.googleusercontent.com
    const signInWithGoogleWeb = async () => {
      try {
        const provider = new auth.GoogleAuthProvider();
        await auth().signInWithPopup(provider);
        // User signed in successfully
      } catch (error) {
        console.log('Google Sign-In Error:', error);
      }
      // try {
      //   await GoogleSignin.hasPlayServices();
      //   const userInfo = await GoogleSignin.signIn();
      //   console.log(userInfo);
      //   // You can now authenticate with Firebase using userInfo.idToken
      // } catch (error) {
      //   console.log('Google Sign-In Error:', error);
      // }
    };
  };

  const handleRegister = async () => {
    setLoading(true);
    if (credentials.email === '' || credentials.password === '') {
      setLoading(false);
      setError('Please fill in all fields');
    } else {
      dispatch(createUser(credentials));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>hi</Text>
      <Image
        style={styles.splashImage}
        source={require('../../../assets/Frame.png')}
      />
      <Text style={styles.heading}>Create Your Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="white"
        keyboardType="email-address"
        autoCapitalize="none"
        value={credentials.email}
        onChangeText={text => setCredentials({...credentials, email: text})}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        placeholderTextColor="white"
        secureTextEntry
        value={credentials.password}
        onChangeText={text => setCredentials({...credentials, password: text})}
      />
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      {loading ? (
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: 'grey',
            },
            styles.signup,
          ]}
          disabled>
          <Text style={styles.signupText}>Signing UP...</Text>
        </Pressable>
      ) : (
        <>
          <Pressable
            style={({pressed}) => [
              {
                opacity: pressed ? 0.8 : 1,
              },
              styles.signup,
            ]}
            onPress={handleRegister}>
            <Text style={styles.signupText}>Sign UP</Text>
            <Icon name="rss" size={20} color="#fff" />
          </Pressable>
          <Pressable
            style={({pressed}) => [
              {
                opacity: pressed ? 0.8 : 1,
              },
              styles.signupWithGoogle,
            ]}
            onPress={handleRegisterGoogle}>
            <Text style={styles.signupWithGoogleText}>Register </Text>
            <Image
              style={{width: 30, height: 30}}
              source={require('../../../assets/search.png')}
            />
          </Pressable>
        </>
      )}
      <KeyboardAvoidingView style={styles.row}>
        <Text style={styles.LogInText}>Already have an account?</Text>
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.logInBtnText}>Login</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
