import axios from "axios";
import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import Cards from "./components/Cards";

const App = () => {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState(0);

 
const [cart, setCart] = useState(() => {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : {};
});

   useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]); // <-- Only when cart changes

    // Calculate cart count
  const totalItems = Object.values(cart).reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  console.log(totalItems)


  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(
        "https://zartek-task.vercel.app/api/resto-cafe"
      );

      setData(res.data.data);
    };
    fetchdata();
  }, []);

  return (
    <div className="h-[100vh]">
      <div className="h-[18vh] bg-gray-50 flex flex-col justify-center sticky top-0">
        <div className="h-[40%] flex items-center justify-between px-5 gap-5 ">
          <h1 className="text-xl flex-1">UNI Resto Cafe</h1>
          <h1>My Orders</h1>
          <div className="relative">
            <ShoppingCart />
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
            {totalItems}
            </span>
          </div>
        </div>
        <ul
          className=" flex justify-around lg:gap-70 gap-10 px-10 pt-9
          overflow-x-auto whitespace-nowrap 
          hide-scrollbar"
        >
          {data[0]?.table_menu_list.map((cat, index) => (
            <li
              key={index}
              onClick={() => setMenu(index)}
              className="cursor-pointer flex flex-col items-center"
            >
              <span
                className={`${
                  menu === index
                    ? "text-red-600 font-semibold"
                    : "text-gray-600"
                }`}
              >
                {cat?.menu_category}
              </span>

              <span
                className={`h-1 w-30 rounded ${
                  menu === index ? "bg-red-600" : "bg-transparent"
                }`}
              ></span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-[120vh] bg-gray-200">
        <Cards dish={data[0]?.table_menu_list[menu]?.category_dishes}  cart={cart}
  setCart={setCart} />
      </div>
    </div>
  );
};

export default App;
