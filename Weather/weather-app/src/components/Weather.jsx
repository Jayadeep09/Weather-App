import React, { use, useEffect, useState,useRef } from 'react'
import './Weather.css'
import  search_ic from '../assets/search.png'
import  cloud_ic from '../assets/cloud.png'
import  clear_ic from '../assets/clear.png'
import  drizzle_ic from '../assets/drizzle.png'
import  humidity_ic from '../assets/humidity.png'
import  rain_ic from '../assets/rain.png'
import  snow_ic from '../assets/snow.png'
import  wind_ic from '../assets/wind.png'




const Weather = () => {
    
    const inputRef =useRef()
    const [weatherdt,setweatherdata]=useState(false)
    const allicons={
        "01d":clear_ic,
        "01n":clear_ic,
        "02d":cloud_ic,
        "02n":cloud_ic,
        "03d":cloud_ic,
        "03n":cloud_ic,
        "04d":drizzle_ic,
        "04n":drizzle_ic,
        "09d":rain_ic,
        "09n":rain_ic,
        "10d":rain_ic,
        "10n":rain_ic,
        "13d":snow_ic,
        "13n":snow_ic,
     }
    const search =async(city)=>{
        if(city===""){
            alert("Enter City Name")
            return ;
        }
        try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response=await fetch(url);
            const data=await response.json()
            if(!response.ok){
                alert(data.message);
                inputRef.current.value=''
                return;
            }
            console.log(data)
            const icon=allicons[data.weather[0].icon]
            setweatherdata({
                humidity: data.main.humidity,
                windspeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon : icon
            })
        }
        catch(error){
                 setweatherdata(false)
                 console.log("Error in fetching data")
        } 
    }

    useEffect(()=>{
        search("Hyderabad")
    },[])

  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef}type='text' placeholder='Enter City Name'/>
            <img src={search_ic} alt='' onClick={()=>search(inputRef.current.value )}></img>
        </div>
        {weatherdt?<>
        <img  className='weather-icon' src={weatherdt.icon} alt=''></img>
        <p className='temp'>{weatherdt.temperature}°C</p>
        <p className='loc'>{weatherdt.location}</p>

            <div className='weather-data'>
                 <div className='col'>
                    <img src={humidity_ic}/>
                    <div>
                        <p>{weatherdt.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                 </div>
                 <div className='col'>
                    <img src={wind_ic}/>
                    <div>
                        <p>{weatherdt.windspeed}km/h</p>
                        <span>Wind Speed</span>
                    </div>
                 </div>
            </div></>:<></>}
        
    </div>
  )
}

export default Weather 
