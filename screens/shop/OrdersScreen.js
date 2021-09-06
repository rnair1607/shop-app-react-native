import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import Headerbutton from "../../components/UI/HeaderButton";
import * as ordersactions from "../../store/actions/orders";
function OrdersScreen(props) {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ordersactions.fetchOrders());
  }, [dispatch]);

  return (
    <FlatList
      data={orders}
      renderItem={(data) => (
        <OrderItem
          amount={data.item.totalAmount}
          date={data.item.readableDate}
          items={data.item.items}
        />
      )}
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
