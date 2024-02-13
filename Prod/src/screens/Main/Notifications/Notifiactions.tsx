import {View, Text, FlatList, SectionList} from 'react-native';
import React from 'react';
import styles from './styles';
import {notifications} from '../../../data';

const Notifications = () => {
  return (
    <View style={styles.pageContainer}>
      {/* <FlatList
        contentContainerStyle={styles.notificationsContainer}
        showsVerticalScrollIndicator={false}
        data={notifications}
        renderItem={({item}) => (
          <View style={styles.dayNotificationContainer}>
            <Text style={styles.dayNotificationTitle}>{item.title}</Text>
            {item.notifications.map(notification => (
              <View style={styles.dayNotification} key={notification.id}>
                <Text style={styles.dayNotificationHeading}>
                  {notification.title}
                </Text>
                <Text style={styles.dayNotificationText}>
                  {notification.text}
                </Text>
              </View>
            ))}
          </View>
        )}
      /> */}
      <SectionList
        contentContainerStyle={styles.notificationsContainer}
        showsVerticalScrollIndicator={false}
        sections={notifications}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => (
          <View style={styles.dayNotificationContainer}>
            <View style={styles.dayNotification} key={item.id}>
              <Text style={styles.dayNotificationHeading}>{item.title}</Text>
              <Text style={styles.dayNotificationText}>{item.text}</Text>
            </View>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <Text style={styles.dayNotificationTitle}>{section.title}</Text>
        )}
      />
    </View>
  );
};

export default Notifications;
