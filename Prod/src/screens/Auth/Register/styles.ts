import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
  },
  heading: {
    fontSize: 30,
    color: 'white',
    marginVertical: 40,
    fontWeight: 'bold',
  },
  input: {
    width: 300,
    height: 50,
    color: 'white',
    marginVertical: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  signup: {
    width: 300,
    height: 50,

    flexDirection: 'row',
    columnGap: 10,
    marginVertical: 10,
    backgroundColor: Colors.theme_red,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupWithGoogle: {
    width: 300,
    height: 50,
    flexDirection: 'row',
    columnGap: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  signupWithGoogleText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    columnGap: 10,
    width: 300,
    justifyContent: 'center',
    marginTop: 80,
  },
  LogInText: {
    color: 'white',
    fontSize: 15,
  },
  logInBtnText: {
    color: Colors.theme_red,
    fontSize: 15,
    fontWeight: 'bold',
  },
  splashImage: {
    width: 200,
    height: 200,
  },
  error: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default styles;
