import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import {tasks} from '../../../data';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './components/Task';
import {useIsFocused} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../Constants/colors';
const AllTasks = ({navigation}: any) => {
  const [checked, setChecked] = useState<boolean>(false);

  // const [remainingTasks, setRemainingTasks] = useState([]);

  const [taskData, setTaskData]: any = useState();

  var remainingTasks: any;
  // const [targetTask,setTargetTask]=useState()

  // const getData = async () => {
  //   try {
  //     const data: any = await AsyncStorage.getItem('taskData');
  //     const parsedData = JSON.parse(data);
  //     console.log('parsed Data', parsedData);
  //     data !== null ? setTaskData(parsedData) : setTaskData(tasks);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getData = async () => {
  //   const taskData: any = await AsyncStorage.getItem('taskData');
  //   const ParsedData = JSON.parse(taskData);
  //   // const remainTasks = ParsedData.filter((item: any) => {
  //   //   console.log('item id', item?.id, '  task id',targetTask?.id);
  //   //   item?.id !==targetTask?.id;
  //   // });
  //   // console.log('remaining tasks', remainTasks);
  //   // setRemainingTasks(remainTasks);
  // };

  const getTasks = async (id: any = '') => {
    const taskData: any = await AsyncStorage.getItem('taskData');
    const ParsedData = JSON.parse(taskData);
    console.log(' data retrieving');
    ParsedData !== null ? setTaskData(ParsedData) : setTaskData();
    console.log('check here', id);
    if (id !== '') {
      const remainTasks = ParsedData.filter((item: any) => item?.id !== id);
      console.log('remaining tasks', remainTasks);
      remainingTasks = remainTasks;
      console.log(' after remain tasks', remainingTasks);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleCheck = (task: any): boolean => {
    if (task.status == 'completed') {
      return true;
    } else {
      return false;
    }
  };

  const handleChecked = async (task: any) => {
    await getTasks(task.id);

    let updatedStatus;
    if (task?.status == 'completed') {
      updatedStatus = 'pending';
    } else {
      updatedStatus = 'completed';
    }

    const updatedTask = {
      ...task,
      status: updatedStatus,
    };

    console.log(' status updated task', updatedTask);
    console.log(' reamianjdfk', remainingTasks);
    await AsyncStorage.setItem(
      'taskData',
      JSON.stringify([updatedTask, ...remainingTasks]),
    );
    navigation.goBack();
  };

  const handleDelete = async (task: any) => {
    console.log('deleted task', task);
    await getTasks(task.id);
    console.log('deleting function', remainingTasks);
    await AsyncStorage.setItem('taskData', JSON.stringify(remainingTasks));
    navigation.goBack();
  };

  console.log('parent render');

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        contentContainerStyle={styles.taskList}
        showsVerticalScrollIndicator={false}>
        {taskData?.map((task: any, index: any) => (
          <View style={styles.taskItem} key={index}>
            <View style={styles.checkBox}>
              <BouncyCheckbox
                size={25}
                fillColor="green"
                unfillColor="#FFFFFF"
                disableBuiltInState
                isChecked={handleCheck(task)}
                iconStyle={{borderColor: 'red'}}
                innerIconStyle={{borderWidth: 1}}
                textStyle={{fontFamily: 'JosefinSans-Regular'}}
                onPress={() => handleChecked(task)}
              />
            </View>
            <View style={styles.task}>
              <Text style={styles.taskItemTitle}>{task.title}</Text>
              <Text style={styles.taskDuration}>{task.time}</Text>
            </View>
            <View style={styles.btnView}>
              {/* <TouchableOpacity
                style={styles.startPomodoro}
                onPress={() => navigation.navigate('Pomodoro')}>
                <FontAwesome5 name="play" size={20} color="white" />
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.delete}
                onPress={(): any => {
                  handleDelete(task);
                }}>
                <Feather name="trash-2" size={25} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AllTasks;
