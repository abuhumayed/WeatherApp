import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'



const WeatherApp = () =>
{

    // Api key was generated using https://openweathermap.org
    
    let api_key = "e865ed4a27c53fe62f0ae3a1dabec79b";
    
   const [wicon,setWicon] = useState(cloud_icon)

    const search = async () =>
    {
        // DOM is used to assign the search input variable as element
        
        const element = document.getElementsByClassName("cityInput")
       
    //   element[0].value is the input text , if the input is empty it will return 0.
        if (element[0].value === "")
        {
            return 0;
        };

        // If the search in put isn't empty then the URL will be constructed to fetch data.
        //  template literals  are being used for the input search variable and for the Api Key
    
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
        

        // using the URL variable we are fetching the data and storing it into the response data

        let response = await fetch(url);
        
         
        // The data will be now passed to a new variable "Data" to retrieve the weather data in json format

        let data = await response.json();

        // making new variables and using the DOM to change the weather data on the App
        
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");
        

        //using innerHTML we can display the data accordingly using thunder client (to use the local json data)

        humidity[0].innerHTML = data.main.humidity + " %"
        wind[0].innerHTML = Math.round(data.wind.speed) + " km/h"
        temperature[0].innerHTML = Math.round(data.main.temp) + "°c"
        location[0].innerHTML = data.name

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n")
        {
            setWicon(clear_icon);
        }
        else   if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n")
        {
            setWicon(cloud_icon);
        }
        else   if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n" )
        {
            setWicon(drizzle_icon);
        }
        else   if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n")
        {
            setWicon(drizzle_icon);
        }
        else   if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n")
        {
            setWicon(rain_icon);
        }
        else   if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n")
        {
            setWicon(snow_icon);
        }
        else   if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n")
        {
            setWicon(rain_icon);
        }
        else
        {
            setWicon(clear_icon)
        }


   } 

  return (
      <div className="container">
          <div className="top-bar">
              <input type="text" className='cityInput' placeholder='search' />
              <div className="search-icon" onClick={()=>{search()}}>
                  <img src={search_icon} alt='' />
              </div>
          </div>
          <div className="weather-image">
              <img src={wicon} alt="" />
          </div>
          <div className="weather-temp">24°c</div>
          <div className="weather-location">London</div>
          <div className="data-container">
              <div className="element">
                  <img src={humidity_icon} alt="" className='icon' />
                  <div className="data">
                      <div className="humidity-percent">64%</div>
                      <div className="text">Humidity</div>
                  </div>
              </div>
              <div className="element">
                  <img src={wind_icon} alt="" className='icon' />
                  <div className="data">
                      <div className="wind-rate">18 KM/h</div>
                      <div className="text">Wind Speed</div>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default WeatherApp
