import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Headerbutton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import DefaultText from "../../components/DefaultText";
function ProductsOverviewScreen(props) {
  const [isLOading, setisLOading] = useState(false);
  const [error, seterror] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItem = (id, title) => {
    props.navigation.navigate("productDetail", {
      productId: id,
      productTitle: title,
    });
  };

  const fetchProducts = useCallback(async () => {
    seterror(null);
    setisLOading(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (error) {
      seterror(error.message);
    }
    setisLOading(false);
  }, [dispatch, setisLOading, seterror]);

  useEffect(() => {
    fetchProducts();
  }, [dispatch, fetchProducts]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      fetchProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [fetchProducts]);

  if (isLOading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLOading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <DefaultText>No products found</DefaultText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <DefaultText>Something went wrong</DefaultText>
        <Button
          color={Colors.primary}
          title="Try again"
          onPress={fetchProducts}
        />
      </View>
    );
  }

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

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
export default ProductsOverviewScreen;
