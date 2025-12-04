import React, { useState } from "react";

const Cards = ({ dish }) => {
  const [add, setAdd] = useState(0);
  console.log(dish);

  return (
    <>
      {dish?.map((item, index) => (
        <div key={index} className="h-[20vh] flex flex-row my-1 bg-white">
          <div className=" h-full w-[70%]">
            <div>1</div>
            <div className="">
              <div className="bg-green-500 w-20 flex flex-row justify-around items-center rounded-full">
                <button onClick={() => setAdd(add - 1)}>-</button>
                <p>{add < 0 ? "0" : add}</p>
                <button onClick={() => setAdd(add + 1)}>+</button>
              </div>
            </div>
          </div>
          <div className="h-full w-[10%] mt-5 pt-5">15 calories</div>
          <div className="h-full w-[20%] flex justify-center pt-4">
            <img className="w-30 h-28 rounded-xl" src={item?.dish_image} alt="" />
          </div>
        </div>
      ))}
    </>
  );
};

export default Cards;