import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import DefaultText from "../DefaultText";
import { Ionicons } from "@expo/vector-icons";

function CartItem(props) {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <DefaultText style={styles.quantity}>{props.quantity} </DefaultText>
        <DefaultText style={styles.title}>{props.title}</DefaultText>
      </View>
      <View style={styles.itemData}>
        <DefaultText style={styles.title}>
          ${props.amount.toFixed(2)}
        </DefaultText>
        {props.deletable && (
          <TouchableCmp onPress={props.onRemove} style={styles.deleteButton}>
            <Ionicons name="ios-trash" size={23} color="red" />
          </TouchableCmp>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    marginLeft: 20,
  },
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    color: "#888",
    fontSize: 16,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
});
export default CartItem;
