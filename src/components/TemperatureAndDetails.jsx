import React from "react";
import { formatToLocalTime } from "../services/weatherServices";
import { FaTemperatureHigh, FaSun, FaWind } from "react-icons/fa";
import { BsFillSunsetFill } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";

const TemperatureAndDetails = ({ weather }) => {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{weather.details}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-white py-3">
        <img
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt=""
          className="w-20"
        />
        <p className="text-5xl">{`${weather.temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <FaTemperatureHigh size={18} className="mr-1" />
            Real fell:
            <span className="font-medium ml-1">{`${weather.feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <WiHumidity size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${weather.humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <FaWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${weather.speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <FaSun />
        <p className="font-light">
          Rise:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(weather.sunrise, weather.timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <BsFillSunsetFill />
        <p className="font-light">
          Set:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(weather.sunset, weather.timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <FaSun />
        <p className="font-light">
          High:{" "}
          <span className="font-medium ml-1">{`${weather.temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>

        <FaSun />
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">{`${weather.temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
};

export default TemperatureAndDetails;
