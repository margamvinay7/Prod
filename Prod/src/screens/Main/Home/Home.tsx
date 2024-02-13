import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import tasks from '../../../data/Tasks';
import {useState} from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useIsFocused} from '@react-navigation/native';
import {AllTasks} from '..';
import colors from '../../../Constants/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}: any) => {
  const isFocused = useIsFocused();
  const [taskData, setTaskData]: any = useState(tasks);
  const [username, setUsername]: any = useState({});
  const [completed, setCompleted]: any = useState(0);
  const getData = async () => {
    try {
      const data: any = await AsyncStorage.getItem('taskData');
      const user: any = await AsyncStorage.getItem('userDetails');
      setUsername(JSON.parse(user));
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      data !== null ? setTaskData(parsedData) : setTaskData(tasks);
      let count = 0;
      parsedData.forEach((item: any) => {
        if (item.status == 'completed') {
          count = count + 1;
        }
      });

      setCompleted(count);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(completed);
  useEffect(() => {
    getData();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          Morning, {`${username?.name?.split(' ')[0]}`} 👋
        </Text>
      </View>
      <View style={styles.progressDiv}>
        <View style={styles.graphContainer}>
          <AnimatedCircularProgress
            size={120}
            width={15}
            fill={Math.floor((completed / taskData.length) * 100)}
            tintColor="#FF575C"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor={colors.theme_gray}
            fillLineCap={'round'}
            rotation={90}
          />
          <Text style={styles.progressCount}>
            {Math.floor((completed / taskData.length) * 100)}%
          </Text>
        </View>
        <View style={styles.progressContainer}>
          <View>
            <Text style={styles.progressText}>
              Wow! Your Daily goals are almost done!
            </Text>
          </View>
          <View>
            <Text style={styles.taskText}>
              {completed} of {taskData.length} Completed!
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.taskHeader}>
          <Text style={styles.taskHeaderText}>Today's Tasks</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AllTasks')}>
            <Text style={styles.taskHeaderButton}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.taskList}
          showsVerticalScrollIndicator={false}>
          {taskData.map((task: any, index: any) => (
            <View style={styles.taskItem} key={index}>
              <View>
                <Text style={styles.taskItemTitle}>{task.title}</Text>
                <Text style={styles.taskDuration}>{task.time}</Text>
              </View>
              <View>
                {/* <TouchableOpacity
                  style={styles.startPomodoro}
                  onPress={() => navigation.navigate('Pomodoro')}>
                  <FontAwesome5 name="play" size={20} color="white" />
                </TouchableOpacity> */}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
