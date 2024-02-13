import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EditProfile, Profile, ProfileSetup} from '../../screens/Main';

const ProfileStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
