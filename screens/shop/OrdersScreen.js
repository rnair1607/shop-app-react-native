import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import Headerbutton from "../../components/UI/HeaderButton";

function OrdersScreen(props) {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      renderItem={(data) => <Text>{data.item.totalAmount}</Text>}
    />
  );
}
OrdersScreen.navigationOptions = (data) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={Headerbutton}>
        <Item
          title="Menu"
          // iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          iconName="menu"
          onPress={() => {
            data.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({});

export default OrdersScreen;
