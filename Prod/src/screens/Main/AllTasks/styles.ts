import {StyleSheet} from 'react-native';
import colors from '../../../Constants/colors';
import {height} from '../../../Constants/dimensions';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  taskList: {
    width: '100%',
    flexDirection: 'column',
    paddingBottom: responsiveHeight(10),
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(2),
    padding: responsiveHeight(2.5),
    backgroundColor: colors.theme_dark,
    borderRadius: 10,
  },
  taskItemTitle: {
    color: 'white',
    fontSize: responsiveFontSize(2.8),
    fontWeight: 'bold',
  },
  taskDuration: {
    color: colors.theme_gray,
    fontSize: responsiveFontSize(2),
    marginTop: 5,
  },
  task: {
    width: 200,
    marginLeft: 25,
    height: 'auto',
  },
  checkBox: {
    width: 0,
    backgroundColor: 'white',
  },
  btnView: {
    display: 'flex',
    flexDirection: 'row',

    columnGap: 3,
  },
  startPomodoro: {
    backgroundColor: colors.theme_red,
    fontSize: 12,
    width: responsiveHeight(5),
    height: responsiveHeight(5),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  delete: {
    backgroundColor: colors.theme_red,
    fontSize: 12,
    width: responsiveHeight(5),
    height: responsiveHeight(5),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});

export default styles;
