import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Button, TouchableOpacity} from 'react-native';
import moment from 'moment';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../../Constants/colors';
import {dayTasks} from '../../../../data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {tasks} from '../../../../data';

const WeeklyCalendar = ({month, year}: any) => {
  const [selectedDate, setSelectedDate]: any = useState(moment());
  const [taskData, setTaskData]: any = useState(tasks);

  const getData = async (date: any = 0) => {
    try {
      const data: any = await AsyncStorage.getItem('taskData');
      const parsedData = JSON.parse(data);
      // console.log('parsed Data', parsedData);
      var todayTasks: any = [];
      let currentDate = moment();
      if (date !== 0) {
        console.log(date);
        currentDate = moment(date);
        console.log('current date', currentDate);
      }

      todayTasks = parsedData.filter(task => {
        const taskDate = moment(task.date, 'ddd MMM DD YYYY').date();
        return taskDate == currentDate.date();
      });

      setTaskData(todayTasks);
    } catch (error) {
      console.log(error);
    }
  };

  const currentDate = moment();

  // console.log('taskdate', );
  // setSelectedDate(currentDate);
  // Get the start date of the current week (Sunday)
  const startDateOfWeek = currentDate.clone().startOf('week');

  // Get the end date of the current week (Saturday)
  const endDateOfWeek = currentDate.clone().endOf('week');

  // Format the dates as needed
  const startDateFormatted = startDateOfWeek.format('YYYY-MM-DD');
  const endDateFormatted = endDateOfWeek.format('YYYY-MM-DD');

  const days = [];
  const week: any = [];

  for (let i = 0; i < 7; i++) {
    days.push({
      date: startDateOfWeek.clone().add(i, 'day'),
    });
    week.push({
      date: startDateOfWeek.clone().add(i, 'day').format('DD-MM-YYYY'),
    });
  }

  useEffect(() => {
    setSelectedDate(moment());
    getData();
  }, []);

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedDate(moment(item.date));
        getData(item.date);
        console.log('render', item);
      }}>
      <View
        style={[
          styles.day,
          selectedDate.day() === item.date.day() && {
            backgroundColor: colors.theme_red,
          },
        ]}>
        <Text style={styles.dayName}>{item.date.format('dd')}</Text>
        <Text style={styles.date}>{item.date.format('D')}</Text>
      </View>
    </TouchableOpacity>
  );

  const handlePrevWeek = () => {
    setSelectedDate(selectedDate.clone().subtract(1, 'week'));
  };

  const handleNextWeek = () => {
    setSelectedDate(selectedDate.clone().add(1, 'week'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlePrevWeek}>
            <Feather name="chevron-left" size={30} />
          </TouchableOpacity>
          <View style={styles.dates}>
            <Text style={styles.month}>{selectedDate.format('MMMM')}</Text>
            <Text style={styles.year}>{selectedDate.format('YYYY')}</Text>
          </View>
          <TouchableOpacity onPress={handleNextWeek}>
            <Feather name="chevron-right" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.daysList}>
        <FlatList
          horizontal
          contentContainerStyle={styles.daysList}
          data={days}
          renderItem={renderItem}
          keyExtractor={item => item.date.format('yyyy-mm-dd')}
        />
      </View>
      <View style={styles.taskContainer}>
        {/* dayTasks[selectedDate.format('YYYY-MM-DD')] */}
        {taskData.length !== 0 ? (
          <FlatList
            // data={dayTasks[selectedDate.format('YYYY-MM-DD')]}
            data={taskData}
            contentContainerStyle={styles.tasksList}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.dayTaskContainer}>
                <View style={styles.taskLeft}>
                  <Text style={styles.taskTime}>{item.time}</Text>
                </View>
                <View style={styles.taskRight}>
                  <Text style={styles.taskTitle}>{item.title}</Text>
                  <Text
                    style={[
                      styles.taskStatus,
                      item.status == 'completed'
                        ? {color: 'lightgreen'}
                        : {color: colors.theme_red},
                    ]}>
                    {item.status}
                  </Text>
                </View>
              </View>
            )}
          />
        ) : (
          <View style={styles.noTaskContainer}>
            <Text style={styles.noTaskTitle}>No tasks for this day!</Text>
            <Text style={styles.noTaskMessage}>
              Click the (+) Icon to create a new task!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default WeeklyCalendar;
