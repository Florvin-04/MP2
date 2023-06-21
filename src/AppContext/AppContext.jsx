import { useContext, createContext, useState } from "react";
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

  // console.log(cart);

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
    console.log(amount + 10);
    let updatedAvailability;
    let product = cart[itemId];

    if (amount > product.itemCount) {
      updatedAvailability = product.availability - (amount - product.itemCount);
    } else if (amount < product.itemCount) {
      updatedAvailability = product.availability + (amount + product.itemCount);
    } else {
      console.log("neutral");
    }

    setCart((prevData) => ({
      ...prevData,
      [itemId]: {
        availability: updatedAvailability,
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
        // allRegions,
        // searchCountry,
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
