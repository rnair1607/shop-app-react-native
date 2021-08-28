import React from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { useSelector } from "react-redux";
import DefaultText from "../../components/DefaultText";
import CartItem from "../../components/shop/CartItem";
import Colors from "../../constants/Colors";

function CartScreen() {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItem = [];
    for (const key in state.cart.items) {
      transformedCartItem.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }

    return transformedCartItem;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <DefaultText style={styles.summaryText}>
          Total:{" "}
          <DefaultText style={styles.amount}>
            ${cartTotalAmount.toFixed(2)}
          </DefaultText>
        </DefaultText>
        <Button
          title="Order Now"
          color={Colors.accent}
          disabled={cartItems.length === 0}
        />
      </View>
      {/* <View>
        <DefaultText>CART ITEMS</DefaultText>
      </View> */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(data) => (
          <CartItem
            quantity={data.item.quantity}
            amount={data.item.sum}
            title={data.item.productTitle}
            onRemove={() => {}}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
