import React from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../constants/Colors";
import DefaultText from "../../components/DefaultText";
import * as cartActions from "../../store/actions/cart";

function ProductDetailScreen(props) {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />

      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to cart"
          onPress={() => {
            useDispatch(cartActions.addToCart(data.item));
          }}
        />
      </View>
      <DefaultText style={styles.price}>
        ${selectedProduct.price.toFixed(2)}
      </DefaultText>
      <DefaultText style={styles.description}>
        {selectedProduct.description}
      </DefaultText>
    </ScrollView>
  );
}

ProductDetailScreen.navigationOptions = (data) => {
  return {
    headerTitle: data.navigation.getParam("productTitle"),
  };
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "60%",
  },

  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default ProductDetailScreen;
