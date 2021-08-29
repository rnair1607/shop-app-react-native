import React from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import Headerbutton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";

function UserProductsScreen(props) {
  const userProduct = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const editProductHanlder = (id) => {
    props.navigation.navigate("EditProduct", {
      productId: id,
      title: "Edit product",
    });
  };

  return (
    <FlatList
      data={userProduct}
      keyExtractor={(item) => item.id}
      renderItem={(data) => (
        <ProductItem
          onSelect={() => {
            editProductHanlder(data.item.id);
          }}
          price={data.item.price}
          title={data.item.title}
          imageUrl={data.item.imageUrl}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHanlder(data.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(productsActions.deleteProduct(data.item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
}

UserProductsScreen.navigationOptions = (nav) => {
  return {
    headerTitle: "Your Products",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={Headerbutton}>
        <Item
          title="Menu"
          iconName="menu"
          onPress={() => {
            nav.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={Headerbutton}>
        <Item
          title="Add"
          iconName="add"
          onPress={() => {
            nav.navigation.navigate("EditProduct", { title: "Add a product" });
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default UserProductsScreen;
