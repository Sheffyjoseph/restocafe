import axios from "axios";
import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import Cards from "./components/Cards";

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(
        "https://zartek-task.vercel.app/api/resto-cafe"
      );
      console.log(res.data.data);
      setData(res.data.data);
    };
    fetchdata();
  }, []);

  return (
    <div className="h-[100vh]">
      <div className="h-[18vh] bg-gray-50 flex flex-col justify-center ">
        <div className="h-[40%] flex items-center justify-between px-5 gap-5">
          <h1 className="text-xl flex-1">UNI Resto Cafe</h1>
          <h1>My Orders</h1>
          <ShoppingCart />
        </div>
        <ul
          className=" flex justify-around gap-10 px-5 pt-9
          overflow-x-auto whitespace-nowrap 
          hide-scrollbar"
        >
          {data[0]?.table_menu_list.map((cat, index) => (
            <li key={index} className="">
              {cat?.menu_category}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-[120vh] bg-gray-200">
        <Cards dish={data[0]?.table_menu_list[0]?.category_dishes} />
      </div>
    </div>
  );
};

export default App;
