import React from "react";
import {
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Headerbutton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
function ProductsOverviewScreen(props) {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItem = (id, title) => {
    props.navigation.navigate("productDetail", {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <FlatList
      data={products}
      renderItem={(data) => (
        <ProductItem
          imageUrl={data.item.imageUrl}
          title={data.item.title}
          price={data.item.price}
          onSelect={() => {
            selectItem(data.item.id, data.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItem(data.item.id, data.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(data.item));
            }}
          />
        </ProductItem>
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
