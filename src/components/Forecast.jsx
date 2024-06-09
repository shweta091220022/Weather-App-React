import React from "react";
import { DateTime } from "luxon";

// import { iconUrLFromCode } from "../services/weatherServices";

const Forecast = ({ title, items, timezone }) => {
  // const { weather_data } = items;
  return (
    <div>
      <div className="flex items-center justify-start my-6 ">
        <p className="text-black font-medium uppercase "> {title}</p>
      </div>
      <hr className="my-2 bg-black" />
      <div className="flex flex-row items-center justify-between text-black overflow-auto gap-10">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <p className="font-dark text-md text-nowrap">
              {DateTime.fromSeconds(item.dt)
                .setZone(timezone)
                .toFormat("hh:mm a")}
            </p>
            <p className="font-dark text-md"> {item.weather[0].main}</p>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="sun image"
              className="w-12 my-1"
            />
            <p className="font-medium"> {`${item.main.temp}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
