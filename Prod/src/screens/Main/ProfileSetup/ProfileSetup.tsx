import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {doc, setDoc} from 'firebase/firestore';
import {database} from '../../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';

const ProfileSetup = ({navigation}: any) => {
  const route = useRoute();

  const [userDetails, setUserDetails] = useState({
    name: '',
    nickname: '',
    email: '',
    phone: '',
  });

  const getUser = async () => {
    try {
      console.log('getting user details');
      const user: any = await AsyncStorage.getItem('userDetails');
      setUserDetails(JSON.parse(user));
      console.log('the user details is :', user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileSetup = async () => {
    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
      console.log('userDetails are saved');
    } catch (error) {
      console.log(error);
    }

    try {
      console.log('getting user details');
      const user: any = await AsyncStorage.getItem('userDetails');
      setUserDetails(JSON.parse(user));
      console.log('the user details is :', user);
    } catch (error) {
      console.log(error);
    }

    navigation.goBack();
  };

  const skipSetup = () => {
    AsyncStorage.setItem('profileCompleted', 'pending');
    console.log('skipped');
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      enabled
      keyboardVerticalOffset={100}
      style={styles.scrollcontainer}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.container}>
          <Text style={styles.title}>Fill Your Profile</Text>
          <Text style={styles.subtitle}>
            Don't worry, you can always change it later, and you can skip it for
            now
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={'white'}
            value={userDetails.name}
            onChangeText={text => setUserDetails({...userDetails, name: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Nickname"
            placeholderTextColor={'white'}
            value={userDetails.nickname}
            onChangeText={text =>
              setUserDetails({...userDetails, nickname: text})
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={'white'}
            value={userDetails.email}
            onChangeText={text => setUserDetails({...userDetails, email: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor={'white'}
            value={userDetails.phone}
            onChangeText={text => setUserDetails({...userDetails, phone: text})}
          />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.skipBtn} onPress={skipSetup}>
              <Text style={styles.btnText}>Skip</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.startBtn}
              onPress={handleProfileSetup}>
              <Text style={styles.btnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileSetup;
