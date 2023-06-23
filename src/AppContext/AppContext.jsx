import { useContext, createContext, useState } from "react";
import { debounce } from "lodash";
import { PLANTS } from "../data";

export const AppContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  PLANTS.map((plant) => {
    cart[plant.id] = { availability: plant.availability, itemCount: 0 };
  });
  return cart;
};

export const AppProvider = ({ children }) => {
  const [plants, setPlants] = useState(PLANTS);

  const [cart, setCart] = useState(getDefaultCart());

  // const getCartValue = () => {
  //   return plants.map((plant) => {
  //     if (cart[plant.id].itemCount !== 0) {
  //       return `${plant.name} ${plant.id}`;
  //     }
  //   });
  // };

  // console.log(getCartValue());

  const getCartItemNumber = () => {
    let total = 0;
    for (let keyCart in cart) {
      if (cart[keyCart].itemCount != 0) total++;
    }
    return total;
  };

  const getTotalAmount = () => {
    let total = 0;
    for (let keyCart in cart) {
      if (cart[keyCart].itemCount != 0) {
        let item = plants.find((plant) => plant.id == keyCart);
        total += cart[keyCart].itemCount * item.price;
      }
    }

    return total;
  };

  const addToCart = (itemId) => {
    setCart((prevData) => ({
      ...prevData,
      [itemId]: {
        itemCount: prevData[itemId].itemCount + 1,
        availability: prevData[itemId].availability - 1,
      },
    }));
  };

  const removeToCart = (itemId) => {
    setCart((prevData) => ({
      ...prevData,
      [itemId]: {
        itemCount: prevData[itemId].itemCount - 1,
        availability: prevData[itemId].availability + 1,
      },
    }));
  };

  const updateCartValue = (amount, itemId) => {
    if (isNaN(amount)) return;
    // console.log(amount + 10);
    let updatedAvailability;
    let product = cart[itemId];

    if (amount > product.itemCount) {
      // updatedAvailability = product.availability - (amount - product.itemCount);
    } else if (amount < product.itemCount) {
      // updatedAvailability = product.availability + (amount + product.itemCount);
    } else {
      console.log("neutral");
    }

    setCart((prevData) => ({
      ...prevData,
      [itemId]: {
        ...prevData[itemId],
        // availability: updatedAvailability,
        itemCount: amount,
      },
    }));
  };
  return (
    <AppContext.Provider
      value={{
        plants,
        cart,
        addToCart,
        removeToCart,
        updateCartValue,
        getCartItemNumber,
        getTotalAmount,
        // setSearchCountry,
        // searchByRegion,
        // setSearchByRegion,
        // loading,
        // setLoading,
        // toggle,
        // setToggle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
