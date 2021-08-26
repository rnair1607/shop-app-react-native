import { StatusBar } from "expo-status-bar";
import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import ShopNavigator from "./navigation/ShopNavigator";

// enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(rootReducer);

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
      <ShopNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
}
