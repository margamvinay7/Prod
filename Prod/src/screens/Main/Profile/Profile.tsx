import {View, Text, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import React from 'react';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../Constants/colors';
import {useState, useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {settings} from '../../../data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Profile = ({navigation}: any) => {
  const isFocused = useIsFocused();
  const [user, setUser] = useState({
    name: 'Margam vinay',
    nickname: 'Vinay',
    email: 'margamvinay77@gmail.com',
    phone: '9999999999',
  });

  const getUser = async () => {
    const userData: any = await AsyncStorage.getItem('userDetails');
    console.log('loading now');
    userData !== null
      ? setUser(JSON.parse(userData))
      : navigation.navigate('ProfileSetup', {reload: true});
  };

  useEffect(() => {
    getUser();
  }, [isFocused]);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.profilePicContainer}>
        <Image
          style={styles.profilePic}
          source={require('../../../assets/vinayPic.jpeg')}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Feather name="edit" size={25} color={colors.theme_red} />
        </TouchableOpacity>
      </View>
      <View style={styles.moreDetails}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={styles.options}>
        {settings.map((item, index) => (
          <TouchableOpacity
            style={styles.option}
            key={index}
            onPress={() => {
              if (item.name == 'Edit Profile') {
                navigation.navigate('ProfileSetup');
              }
              if (item.name === 'Logout') {
                ToastAndroid.show(
                  'Thanks For Trying The App😄',
                  ToastAndroid.SHORT,
                );
              }
            }}>
            {item.family === 'FontAwesome5' ? (
              <FontAwesome5
                name={item.icon}
                size={25}
                color={colors.theme_red}
              />
            ) : (
              <AntDesign name={item.icon} size={25} color={colors.theme_red} />
            )}

            <Text style={styles.optionText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Profile;
