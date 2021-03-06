import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Colors from "../../constants/Colors";
import DefaultText from "../DefaultText";

import CartItem from "./CartItem";

function OrderItem(props) {
  const [showDetails, setshowDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <DefaultText style={styles.totalAmount}>
          ${props.amount.toFixed(2)}
        </DefaultText>
        <DefaultText style={styles.date}>{props.date}</DefaultText>
      </View>
      <Button
        color={Colors.primary}
        title={!showDetails ? "Show Details" : "Hide Details"}
        onPress={() => {
          setshowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
              deletable={false}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});

export default OrderItem;
