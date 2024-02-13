import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import {useSelector, useDispatch} from 'react-redux';
import {addTask as addTaskSlice} from '../../../redux/features/taskSlice';

import styles from './styles';
import {categories} from '../../../data';

import Feather from 'react-native-vector-icons/Feather';
import Ioncicons from 'react-native-vector-icons/Ionicons';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SelectList} from 'react-native-dropdown-select-list';
import Slider from '@react-native-community/slider';
import colors from '../../../Constants/colors';
import {width} from '../../../Constants/dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTask = ({navigation}: any) => {
  const [isDateVisible, setDateVisible] = useState(false);
  const [isTimeVisible, setTimeVisible] = useState(false);
  const [date, setDate] = useState('Select Date');
  const [time, setTime] = useState('Select Time');
  const [workingSessions, setWorkingSessions] = useState(2);
  const [longBreak, setLongBreak] = useState(15);
  const [shortBreak, setShortBreak] = useState(5);
  const [selected, setSelected] = useState('');
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  const addTask = async () => {
    if (
      date !== 'Select Date' &&
      time !== 'Select Time' &&
      selected !== undefined &&
      title
    ) {
      const timeArray = time.split(':');
      const hoursAndMinutes = ` ${timeArray[0]}:${timeArray[1]}`;
      const noon = timeArray[2].split(' ')[1];
      const task: any = {
        id: uuid.v4(),
        title,
        category: selected,
        date,
        time: hoursAndMinutes + ' ' + noon,
        workingSessions,
        longBreak,
        shortBreak,
        status: 'pending',
      };

      // it is mandatory for adding previous tasks and new tasks into the storage
      let oldTasks: any = [];
      try {
        oldTasks /*storedValue */ = await AsyncStorage.getItem('taskData');
        // if (storedValue !== null) {
        //   oldTasks = storedValue;
        // }
      } catch (error) {
        console.log(error);
      }

      // adding new tasks
      try {
        const parsedData = JSON.parse(oldTasks);
        let storableData;

        parsedData.length === 0
          ? (storableData = [task])
          : parsedData.length > 1
          ? (storableData = [task, ...parsedData])
          : (storableData = [task, parsedData[0]]);

        await AsyncStorage.setItem('taskData', JSON.stringify(storableData));
      } catch (error) {
        console.log(error);
      }

      // not required just for checking is task added or not
      // try {
      //   const data: any = await AsyncStorage.getItem('taskData');

      //   console.log(data);
      // } catch (error) {
      //   console.log(error);
      // }

      // clear the values of input fields
      // setDate('Select Date');
      // setTime('Select Time');
      // setDateVisible(false);
      // setTimeVisible(false);
      // setLongBreak(15);
      // setShortBreak(5);
      // setWorkingSessions(2);
      // setTitle('');
      // setSelected('');

      navigation.navigate('Home');

      ToastAndroid.show('Task Added!', ToastAndroid.SHORT);
      // navigation.goBack();
      // console.log('task added state', selecter.payload.task);
    } else {
      ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={val => {
            setTitle(val);
          }}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.halfParent}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.inputTitle}>Date</Text>
            <Pressable
              style={styles.specialInput}
              onPress={() => {
                setDateVisible(true);
              }}>
              <Text style={styles.input}>{date}</Text>
              <Feather name="calendar" size={20} color="white" />
            </Pressable>
            <DateTimePickerModal
              isVisible={isDateVisible}
              mode="date"
              onConfirm={date => {
                setDate(`${date.toDateString()}`);
                setDateVisible(false);
              }}
              onCancel={() => {
                setDateVisible(false);
              }}
            />
          </View>
        </View>
        <View style={styles.halfParent}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.inputTitle}>Time</Text>
            <Pressable
              style={styles.specialInput}
              onPress={() => {
                setTimeVisible(true);
              }}>
              <Text style={styles.input}>{time}</Text>
              <Ioncicons name="time-outline" size={20} color="white" />
            </Pressable>
            <DateTimePickerModal
              isVisible={isTimeVisible}
              mode="time"
              onConfirm={time => {
                setTime(time.toLocaleTimeString());
                setTimeVisible(false);
              }}
              onCancel={() => {
                setTimeVisible(false);
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Select Category</Text>
        <SelectList
          boxStyles={styles.select_input}
          arrowicon={<Feather name="chevron-down" size={20} color="white" />}
          data={categories}
          search={false}
          closeicon={<Ioncicons name="close" size={20} color="white" />}
          save="value"
          dropdownStyles={styles.input}
          setSelected={setSelected}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.row}>
          <Text style={styles.inputTitle}>Working Sessions</Text>
          <Text style={styles.selectValue}>{workingSessions}</Text>
        </View>
        <Slider
          style={{width: width * 0.9, height: 40}}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor={colors.theme_red}
          maximumTrackTintColor={colors.theme_gray}
          thumbTintColor={colors.theme_red}
          onValueChange={val => setWorkingSessions(val)}
          step={1}
          tapToSeek={true}
          value={workingSessions}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.row}>
          <Text style={styles.inputTitle}>Long Break</Text>
          <Text style={styles.selectValue}>{longBreak}</Text>
        </View>
        <Slider
          style={{width: width * 0.9, height: 40}}
          minimumValue={0}
          maximumValue={40}
          minimumTrackTintColor={colors.theme_red}
          maximumTrackTintColor={colors.theme_gray}
          thumbTintColor={colors.theme_red}
          onValueChange={val => setLongBreak(val)}
          step={5}
          tapToSeek={true}
          value={longBreak}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.row}>
          <Text style={styles.inputTitle}>Short</Text>
          <Text style={styles.selectValue}>{shortBreak}</Text>
        </View>
        <Slider
          style={{width: width * 0.9, height: 40}}
          minimumValue={0}
          maximumValue={20}
          minimumTrackTintColor={colors.theme_red}
          maximumTrackTintColor={colors.theme_gray}
          thumbTintColor={colors.theme_red}
          onValueChange={val => setShortBreak(val)}
          step={5}
          value={shortBreak}
          tapToSeek={true}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addTask();
        }}>
        <Text style={styles.buttonText}>Create Task</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AddTask;
