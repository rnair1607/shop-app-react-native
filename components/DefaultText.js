import React from "react";
import { StyleSheet, Text } from "react-native";

function DefaultText(props) {
  return (
    <Text style={{ ...StyleSheet.text, ...props.style }}>{props.childern}</Text>
  );
}

const style = StyleSheet.create({
  text: {
    // fontFamily: "open-sans",
  },
});

export default DefaultText;
