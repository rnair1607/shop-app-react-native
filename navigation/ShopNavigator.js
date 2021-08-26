import { createAppContainer } from "react-navigation";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import { createStackNavigator } from "react-navigation-stack";
import Colors from "../constants/Colors";
import { Platform } from "react-native";

const ProductsNavigator = createStackNavigator(
  {
    productsOverView: ProductsOverviewScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    },
  }
);

export default createAppContainer(ProductsNavigator);
