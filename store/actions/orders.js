import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://shop-app-react-native-f032a-default-rtdb.asia-southeast1.firebasedatabase.app/orders/u1.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const resData = await response.json();
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders,
      });
    } catch (error) {
      // console.log(error);
      throw new Error("Something went wrong");
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();
    try {
      const response = await fetch(
        "https://shop-app-react-native-f032a-default-rtdb.asia-southeast1.firebasedatabase.app/orders/u1.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems,
            totalAmount,
            date: date.toISOString(),
          }),
        }
      );

      if (!response.ok) throw new Error("Something went wrong");
      const resData = await response.json();
      // console.log(`res data`, resData);

      dispatch({
        type: ADD_ORDER,
        orderData: {
          id: resData.name,
          items: cartItems,
          amount: totalAmount,
          date: date,
        },
      });
    } catch (error) {
      console.log(err);
    }
  };
};
