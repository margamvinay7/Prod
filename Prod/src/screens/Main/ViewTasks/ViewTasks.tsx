import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import WeekCalendar from './components/WeeklyCalendar';
import {dayTasks} from '../../../data';

const ViewTasks = () => {
  const month = new Date().getMonth;
  const year = new Date().getFullYear;

  return (
    <View style={styles.pageContainer}>
      <WeekCalendar month={2} year={2024} />
    </View>
  );
};

export default ViewTasks;
