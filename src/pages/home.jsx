import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from '../context/context';
import { useEffectOnce } from "../customHooks/useEffectOnce";
import { getCurrentWeather } from "../services/api";
import { FaTemperatureHigh } from "react-icons/fa";
import  { WiHumidity } from "react-icons/wi";
import { GoLocation } from "react-icons/go";

const Home = () => {
  const [weather, setWeather] = useState();

  const {search} = useContext(Context);

  useEffectOnce(() => {
    async function getData() {
      const weatherData = await getCurrentWeather(search || "Bucharest");
      setWeather(weatherData);
    }
    getData();
  }, [search]);

  const getHomeMainStyle = () => {
    const style = {
      backgroundImage: `url(/images/clear-sky.jpg)`,
      backgroundRepeat: 'repeat',
      backgroundSize: 'cover',
      color: 'white'
    }

    if(weather?.weather[0]?.description){
      const weatherDescription = weather.weather[0].description.toLowerCase();
      console.log(weatherDescription.includes('clouds'))
      if(weatherDescription.includes('rain'))style.backgroundImage = `url(/images/rain.jpg)`;
      else if(weatherDescription.includes('frost'))style.backgroundImage = `url(/images/frost.jpg)`;
      else if(weatherDescription.includes('hot'))style.backgroundImage = `url(/images/hot.jpg)`;
      else if(weatherDescription.includes('clouds')){
        style.backgroundImage = `url(/images/clouds.jpg)`;
        style.color = 'black';
      }
      else if(weatherDescription.includes('clear sky'))style.backgroundImage = `url(/images/clear-sky.jpg)`;
    }
    return style;
  }



  return(
    <main className="p-3" style={getHomeMainStyle()}>
        
        {weather && <div className="mt-4 text-center">
            <h4><GoLocation className="me-1"/> {weather.name}</h4>
            <img src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} alt="..." />
            <p className="home-weather-description">{weather.weather[0].description}</p>
            <p className="home-weather-main-temp"> {Math.round(weather.main.temp)} &#8451;</p>
            <h6><FaTemperatureHigh className="me-1"/>Feels like</h6> 
            <p className="home-weather-feels-like">{Math.round(weather.main.feels_like)} &#8451;</p>
            <h6>Pressure</h6>
            <p className="home-weather-feels-like">{weather.main.pressure}hPa</p>
            <h6><WiHumidity className="me-1"/> Humidity</h6>
            <p className="home-weather-feels-like">{weather.main.humidity}%</p>
            <h6>Wind</h6>
            <p className="home-weather-feels-like">{weather.wind.speed}Km/h</p>
            <Link to="/forecast" className="custom-link-button">5 days forecast</Link>
        </div>}

    </main>
  )
};

export default Home;
