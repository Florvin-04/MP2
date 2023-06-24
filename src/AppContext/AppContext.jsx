import { useContext, createContext, useState, useEffect } from "react";
import { debounce } from "lodash";
import { PLANTS } from "../data";
const categories = ["All", ...new Set(PLANTS.map((plant) => plant.family))];

export const AppContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  PLANTS.map((plant) => {
    cart[plant.id] = { availability: plant.availability, itemCount: 0 };
  });
  return cart;
};

export const AppProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);

  const [cart, setCart] = useState(getDefaultCart());
  const [filterByCategory, setFilterByCategory] = useState("All");
  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(false);

  // const getCartValue = () => {
  //   return plants.map((plant) => {
  //     if (cart[plant.id].itemCount !== 0) {
  //       return `${plant.name} ${plant.id}`;
  //     }
  //   });
  // };

  // console.log(getCartValue());

  const filter = () => {
    setLoading(true);
    let updatedList = [...PLANTS];

    if (filterByCategory == "All") {
      updatedList = updatedList.filter((plant) =>
        plant.name.toLowerCase().includes(filterByName.toLocaleLowerCase())
      );

      setTimeout(() => {
        setLoading(false);
      }, 1000);

      setPlants(updatedList);
    } else {
      updatedList = updatedList.filter(
        (plant) =>
          plant.family.toLowerCase() === filterByCategory.toLowerCase() &&
          plant.name.toLowerCase().includes(filterByName.toLocaleLowerCase())
      );

      setTimeout(() => {
        setLoading(false);
      }, 1000);

      setPlants(updatedList);
    }
  };

  useEffect(() => {
    filter();
  }, [filterByName, filterByCategory]);

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
        ...prevData[itemId],
        itemCount: prevData[itemId].itemCount + 1,
        // availability: prevData[itemId].availability - 1,
      },
    }));
  };

  const removeToCart = (itemId) => {
    setCart((prevData) => ({
      ...prevData,
      [itemId]: {
        ...prevData[itemId],
        itemCount: prevData[itemId].itemCount - 1,
        // availability: prevData[itemId].availability + 1,
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
        setPlants,
        cart,
        setCart,
        addToCart,
        removeToCart,
        updateCartValue,
        getCartItemNumber,
        getTotalAmount,
        filterByName,
        setFilterByName,
        categories,
        setFilterByCategory,
        loading,
        setLoading,
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
