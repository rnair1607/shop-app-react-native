import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";

function ProductsOverviewScreen(props) {
  const products = useSelector((state) => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      renderItem={(data) => (
        <ProductItem
          imageUrl={data.item.imageUrl}
          title={data.item.title}
          price={data.item.price}
          onViewDetail={() => {
            props.navigation.navigate("productDetail", {
              productId: data.item.id,
              productTitle: data.item.title,
            });
          }}
          onAddToCart={() => {}}
        />
      )}
    />
  );
}

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All products",
};

const styles = StyleSheet.create({});
export default ProductsOverviewScreen;
