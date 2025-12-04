import { Disc } from "lucide-react";
import React, { useState, useEffect } from "react";

const Cards = ({ dish, cart, setCart }) => {
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAdd = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.dish_id]: {
        ...item,
        quantity: prev[item.dish_id]?.quantity + 1 || 1,
      },
    }));
  };

  const handleRemove = (item) => {
    if (!cart[item.dish_id]) return;

    setCart((prev) => {
      const updatedQty = prev[item.dish_id].quantity - 1;

      if (updatedQty <= 0) {
        const updatedCart = { ...prev };
        delete updatedCart[item.dish_id];
        return updatedCart;
      }

      return {
        ...prev,
        [item.dish_id]: { ...item, quantity: updatedQty },
      };
    });
  };

  const getQuantity = (item) =>
    cart[item?.dish_id]?.quantity ? cart[item?.dish_id]?.quantity : 0;

  return (
    <>
      {dish?.map((item) => (
        <div
          key={item.dish_id}
          className="h-[20vh] flex flex-row my-1 bg-white"
        >
          <div className="h-full w-[2%] mt-3">
            <Disc
              className={`${
                item.dish_Availability ? "text-green-400" : "text-red-400"
              }`}
            />
          </div>

          <div className="h-full w-[68%] lg:mt-1 lg:px-2 px-5">
            <h1 className="text-lg font-semibold mt-1">{item.dish_name}</h1>
            <h1>
              {item.dish_currency} {item.dish_price}
            </h1>
            <p className="text-sm font-sans font-thin mt-1 text-wrap">
              {item.dish_description}
            </p>

            {item.dish_Availability ? (
              <>
                <div className="bg-green-600 w-28 flex flex-row justify-around items-center rounded-full mt-1 text-white">
                  <button onClick={() => handleRemove(item)}> - </button>
                  <p>{getQuantity(item)}</p>
                  <button onClick={() => handleAdd(item)}> + </button>
                </div>

                <p className="text-red-500 mt-1">
                  {item?.addonCat.length > 0 ? "Customization Available" : ""}
                </p>
              </>
            ) : (
              <p className="text-red-500 mt-1">Not Available</p>
            )}
          </div>

          <div className="h-full lg:w-[10%] w-[25%] lg:mt-5 lg:pt-5 pt-5 text-sm">
            {item.dish_calories} Calories
          </div>

          <div className="h-full w-[20%] flex justify-center pt-4">
            <img
              className="lg:w-30 lg:h-28 w-25 h-25 rounded-xl"
              src={item.dish_image}
              alt={item.dish_name}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Cards;
