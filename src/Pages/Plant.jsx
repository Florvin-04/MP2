import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../AppContext/AppContext";

function Plant() {
  const { plants, cart, addToCart, buyNow, setCart } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuanity] = useState({
    plantCount: 0,
    plantId: 1,
  });

  function addPlant(e, id) {
    const target = e.target;
    const { value } = target;

    // const foundPlant = plants.find((plant) => plant.id == id);
    if (cart[id].availability < value) {
      return;
    }
    setQuanity((prevData) => ({
      ...prevData,
      plantCount: Number(value),
      plantId: Number(id),
    }));
  }

  function submitChanges(e) {
    e.preventDefault();

    setCart((prevData) => ({
      ...prevData,
      [quantity.plantId]: {
        ...prevData[quantity.plantId],
        itemCount: Number([quantity.plantCount]),
      },
    }));
  }

  console.log(quantity);

  return (
    <div>
      <h1>plants</h1>
      {plants
        .filter((plant) => plant.id == id)
        .map((plant) => {
          return (
            <div key={plant.id}>
              <h2>{plant.name}</h2>
              <button
                className=""
                onClick={() => addToCart(plant.id)}
              >
                add to cart {cart[plant.id].itemCount !== 0 && `(${cart[plant.id].itemCount})`}
              </button>

              <button
                onClick={() => {
                  navigate("/checkout");
                  buyNow(plant.id);
                }}
              >
                buy now
              </button>
              <form
                action=""
                onSubmit={submitChanges}
              >
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  placeholder="Enter"
                  value={quantity.plantCount}
                  onChange={(e) => addPlant(e, plant.id)}
                />
              </form>
            </div>
          );
        })}
    </div>
  );
}

export default Plant;
