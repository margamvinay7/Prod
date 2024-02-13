import {StyleSheet} from 'react-native';
import colors from '../../../Constants/colors';
import {height} from '../../../Constants/dimensions';

const styles = StyleSheet.create({
  scrollcontainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    // minHeight: '100%',

    justifyContent: 'flex-start',
    padding: 10,
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    marginTop: 25,
  },
  scrollview: {
    maxWidth: '100%',
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.theme_gray,
    marginBottom: 55,
  },
  input: {
    width: 350,
    height: 60,
    color: 'white',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 15,
    padding: 20,
    backgroundColor: '#1F222A',
  },
  buttons: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 10,

    // flexDirection: 'row',
    // columnGap: 10,

    // justifyContent: 'center',
    // marginBottom: 100,
  },
  skipBtn: {
    backgroundColor: '#35383F',
    flex: 1,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtn: {
    backgroundColor: colors.theme_red,
    flex: 1,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
