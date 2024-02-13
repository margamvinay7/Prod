import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {SelectList} from 'react-native-dropdown-select-list';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../Constants/colors';
import {LineChart} from 'react-native-chart-kit';
import {weekStats, monthStats, yearStats, tasks} from '../../../data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const statsData = [
  {key: 'thisWeek', value: 'This Week'},
  {key: 'thisMonth', value: 'This Month'},
  {key: 'thisYear', value: 'This Year'},
];

const Statistics = () => {
  const [selected, setSelected] = useState('today');
  const [data, setData] = useState(weekStats);
  const [taskData, setTaskData]: any = useState(tasks);
  const getData = async () => {
    try {
      const data: any = await AsyncStorage.getItem('taskData');
      const parsedData = JSON.parse(data);
      console.log('parsed Data', parsedData);
      data !== null ? setTaskData(parsedData) : setTaskData(tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    switch (selected) {
      case 'thisWeek':
        setData(weekStats);
        break;
      case 'thisMonth':
        setData(monthStats);
        break;
      case 'thisYear':
        setData(yearStats);
        break;
      default:
        setData(weekStats);
        break;
    }
  }, [selected]);

  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    fillShadowGradient: colors.theme_red,
    fillShadowGradientOpacity: 1,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <ScrollView
      contentContainerStyle={styles.pageContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.graphContainer}>
        <View>
          <LineChart
            data={{
              labels: data.map(item => item.unit),
              datasets: [
                {
                  data: data.map(item => item.hours),
                },
              ],
            }}
            width={responsiveWidth(100)}
            height={responsiveHeight(30)}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <View style={styles.graphHeader}>
          <Text style={styles.graphHeaderText}>Your Stats</Text>
          <View style={styles.floatingControl}>
            <SelectList
              data={statsData}
              search={false}
              boxStyles={styles.selectList}
              setSelected={setSelected}
              placeholder="This Week"
              inputStyles={styles.selectListText}
              dropdownStyles={styles.selectListDropdown}
              dropdownItemStyles={styles.selectListDropdownItem}
              dropdownTextStyles={styles.selectListDropdownText}
              onSelect={() => console.log(selected)}
              arrowicon={
                <AntDesign color={colors.theme_red} name="caretdown" />
              }
            />
          </View>
        </View>
      </View>
      <View style={styles.allTaskContainer}>
        <View style={styles.allTaskHeader}>
          <Text style={styles.allTaskHeaderText}>Today</Text>
        </View>
        <View style={styles.allTasks}>
          {taskData.map((task: any, index: any) => (
            <View style={styles.taskContainer} key={index}>
              <View style={styles.taskLeft}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <View style={styles.subItem}>
                  <Text style={styles.taskCategory}>{task.category}</Text>
                  <Text style={styles.taskTime}>{task.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Statistics;
