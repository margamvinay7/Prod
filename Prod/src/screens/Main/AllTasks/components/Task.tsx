import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../styles';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Task = ({index, task}: any) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [checked, setChecked] = useState<boolean>(false);

  const [remainingTasks, setRemainingTasks] = useState([]);
  console.log('checked value', checked);

  const handleChecked = async () => {
    console.log('checked function');
    getTasks();

    setChecked(!checked);

    let updatedStatus;
    if (task?.status) {
      console.log('checked handle', !checked);
      !checked ? (updatedStatus = 'completed') : (updatedStatus = 'pending');
    }

    task = {
      ...task,
      status: updatedStatus,
    };
    console.log(' status updated task', task);
    await AsyncStorage.setItem(
      'taskData',
      JSON.stringify([task, ...remainingTasks]),
    );

    navigation.goBack();
  };

  const handleDelete = async () => {
    getTasks();
    console.log('deleting function');
    await AsyncStorage.setItem('taskData', JSON.stringify(remainingTasks));
    navigation.goBack();
  };

  const handleCheck = () => {
    return checked;
  };

  const getTasks = async () => {
    const taskData: any = await AsyncStorage.getItem('taskData');
    const ParsedData = JSON.parse(taskData);
    const remainTasks = ParsedData.filter((item: any) => {
      console.log('item id', item?.id, '  task id', task?.id);
      item?.id !== task?.id;
    });
    console.log('remaining tasks', remainTasks);
    setRemainingTasks(remainTasks);
  };

  return (
    <View style={styles.taskItem} key={index}>
      <View style={styles.checkBox}>
        <BouncyCheckbox
          size={25}
          fillColor="green"
          unfillColor="#FFFFFF"
          disableBuiltInState
          isChecked={false}
          iconStyle={{borderColor: 'red'}}
          innerIconStyle={{borderWidth: 1}}
          textStyle={{fontFamily: 'JosefinSans-Regular'}}
          onPress={() => handleChecked()}
        />
      </View>
      <View style={styles.task}>
        <Text style={styles.taskItemTitle}>{task.title}</Text>
        <Text style={styles.taskDuration}>{task.time}</Text>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity
          style={styles.startPomodoro}
          onPress={() => navigation.navigate('Pomodoro')}>
          {/* <FontAwesome5 name="play" size={20} color="white" /> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => {
            handleDelete();
          }}>
          <Text>D</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Task;
