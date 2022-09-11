import React, { useState, useContext } from "react";

import { Context } from "../context/context";
import { useEffectOnce } from "../customHooks/useEffectOnce";
import { getForecast } from "../services/api";
import Card from '../components/card/card';

const ForecastPage = () => {
  const [forecast, setForecast] = useState();

  const { search, setSearch } = useContext(Context);

  const sortForecastByDay = (forecastArr) => {
    /*
    {
      "2022-09-03": [],
      "2022-09-04": []
    }
    */
    const obj = {};

    forecastArr.forEach((val) => {
      const date = val.dt_txt.split(" ")[0];
      if (obj[date]) {
        obj[date].push(val);
      } else {
        obj[date] = [];
        obj[date].push(val);
      }
    });
    return obj;
  };

  useEffectOnce(() => {
    async function getData() {
      const forecastData = await getForecast(search);
      if (forecastData.status === 200) {
        const sortedData = sortForecastByDay(forecastData.data.list);
        setForecast(sortedData);
      } else {
        console.log(forecastData);
      }
    }
    if(!search)setSearch("Bucharest")
    getData();
  }, [search]);


    const mainStyle = {
      backgroundImage: `url(/images/clear-sky.jpg)`,
      backgroundRepeat: 'repeat',
      backgroundSize: 'cover',
      color: 'white'
    }

  

  // console.log(getForecastMainStyle());

  return (
    <main className="forecast-container" style={mainStyle}>
      <h4>{search}</h4>
      {forecast &&
        Object.keys(forecast).map((date) => (
          <div>
            <h4>{date}</h4>
            <div className="d-flex gap-3">
              {forecast[date].map((obj, index) => (
                <Card 
                key={index}
                hour={obj.dt_txt.split(" ")[1]} 
                temperature={Math.round(obj.main.temp)} 
                feelsLike={Math.round(obj.main.feels_like)} 
                windSpeed={Math.round(obj.wind.speed)} 
                iconSrc={"http://openweathermap.org/img/wn/" + obj.weather[0].icon + "@2x.png"}/>
              ))}
            </div>
          </div>
        ))}
    </main>
  );
};

export default ForecastPage;
