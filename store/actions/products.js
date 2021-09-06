import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `https://shop-app-react-native-f032a-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json?auth=${
        getState().auth.token
      }`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    });
  };
};

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://shop-app-react-native-f032a-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?auth=${
          getState().auth.token
        }`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
      // console.log(`fetch res data`, resData);
    } catch (error) {
      throw error;
    }
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `https://shop-app-react-native-f032a-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?auth=${
          getState().auth.token
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
            price,
            ownerId: getState().auth.userId,
          }),
        }
      );
      const resData = await response.json();
      // console.log(`res data`, resData);

      dispatch({
        type: CREATE_PRODUCT,
        productData: {
          id: resData.name,
          title,
          description,
          imageUrl,
          price,
          ownerId: getState().auth.userId,
        },
      });
    } catch (error) {
      console.log(err);
    }
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `https://shop-app-react-native-f032a-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json?auth=${
          getState().auth.token
        }`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      dispatch({
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
          title,
          description,
          imageUrl,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};
