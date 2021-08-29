import React from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Headerbutton from "../../components/UI/HeaderButton";
function ProductsOverviewScreen(props) {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

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
          onAddToCart={() => {
            dispatch(cartActions.addToCart(data.item));
          }}
        />
      )}
    />
  );
}

ProductsOverviewScreen.navigationOptions = (nav) => {
  return {
    headerTitle: "All products",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={Headerbutton}>
        <Item
          title="Cart"
          // iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          iconName="cart-outline"
          onPress={() => {
            nav.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={Headerbutton}>
        <Item
          title="Menu"
          // iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          iconName="menu"
          onPress={() => {
            nav.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});
export default ProductsOverviewScreen;
