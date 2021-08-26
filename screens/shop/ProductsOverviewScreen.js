import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

function ProductsOverviewScreen() {
  const products = useSelector((state) => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      renderItem={(data) => <Text>{data.item.title}</Text>}
    />
  );
}

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All products",
};

const styles = StyleSheet.create({});
export default ProductsOverviewScreen;
