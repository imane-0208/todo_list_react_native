import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Task = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
      <View style={styles.circular}></View>
        {/* <View style={styles.square}></View> */}
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 24,
    height: 24,
    borderColor: "tomato",
    backgroundColor:"red",
    opacity: 0.4,
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 15,
  },
});

export default Task;
