import React, { useState, useEffect, useRef } from "react";
import {
  Keyboard,
  //   KeyboardAvoidingView,
  Platform,
  //   ScrollView,
  //   StyleSheet,r
  //   Text,
  //   TextInput,
  //   TouchableOpacity,
  //   View,
} from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Notification() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const Tasks = [
    {
      title: "Notification",
      description: "Schedule a notification to be sent",
      wait: 5,
      checked: true,
    },
  ];

  const minutesToSeconds = (minutes) => {
    return minutes * 60;
  };

  const dateToSecondsFromNow = (minutes) => {
    const now = new Date();
    const then = new Date(now.getTime() + minutesToSeconds(minutes) * 1000);
    return then.getTime();
  };

  useEffect(() => {
    [5, 10].map(async (seconds) => {
      schedulePushNotification(seconds);
    });
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return <></>;
}

async function schedulePushNotification(seconds) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Your Task! 📬",
      body: "Are you done with your task?",
      data: { data: "goes here" },
    },
    trigger: { seconds: seconds },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
