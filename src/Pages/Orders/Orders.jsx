import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { useGlobalContext } from "../../AppContext/AppContext";

function Orders() {
  const { orders, plants } = useGlobalContext();

  const [itemOrder, setItemOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updatedItemOrder = [];

    for (const order of orders) {
      for (const id of order.id) {
        const matchingProduct = plants.find((plant) => plant.id === id);

        if (matchingProduct) {
          const uniqueId = uuidv4();
          updatedItemOrder.push({
            orderId: uniqueId,
            id: matchingProduct.id,
            name: matchingProduct.name,
            address: order.address,
          });
        }
      }
    }

    setItemOrder(updatedItemOrder);
    setIsLoading(false);
  }, [orders, plants]);

  return (
    <div className="container">
      <h2>Orders</h2>

      {isLoading ? (
        <p>Loading...</p> // Render a loading state
      ) : itemOrder.length > 0 ? (
        itemOrder.map((item) => (
          <div key={item.orderId}>
            <p>
              {item.orderId} {item.id} {item.name}
            </p>
          </div>
        ))
      ) : (
        <p>No orders found.</p> // Render a message if there are no orders
      )}
    </div>
  );
}

export default Orders;
