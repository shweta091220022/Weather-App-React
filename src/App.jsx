import "./App.css";
import TopButton from "./components/TopButton";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherServices";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function App() {
  const [query, setQuery] = useState({ q: "Delhi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen mt-4 pb-10 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButton setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          {Object.keys(weather.forecast).map((key, index) => (
            <Forecast
              key={index}
              title={key}
              items={weather.forecast[key]}
              timezone={weather.timezone}
            />
          ))}
          {/* <Forecast title="hourly forecast" items={weather.forecast} /> */}
          {/* <Forecast title="daily forecast" items={weather.daily} /> */}
        </>
      )}
    </div>
  );
}

export default App;
