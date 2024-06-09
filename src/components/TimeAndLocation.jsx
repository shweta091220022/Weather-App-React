import React from "react";
import { formatToLocalTime } from "../services/weatherServices";

function TimeAndLocation({weather:{dt,timezone,name,country}}) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className=" text-black text-xl ">
          {formatToLocalTime(dt,timezone)}
        </p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-black text-3xl font-semibold">
            {`${name},${country}`}
        </p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
