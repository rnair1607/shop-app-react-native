import { StatusBar } from "expo-status-bar";
import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import authReducer from "./store/reducers/auth";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/orders";
import ShopNavigator from "./navigation/ShopNavigator";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import NavigationContainer from "./navigation/NavigationContainer";

// enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer,
});

// const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  let [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
      <StatusBar style="auto" />
    </Provider>
  );
}
