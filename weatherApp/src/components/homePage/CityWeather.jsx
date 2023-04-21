import { useState, useEffect } from 'react';
import axios from 'axios';
import "../../App.css"

import Cloudy from "../../images/icons/cloudy.png"
import SunPartlyCloudy from "../../images/icons/sunCloudy.png"
import Sun from "../../images/icons/sun.png"
import Moon from "../../images/icons/moon.png"
import MoonPartlyCloudy from "../../images/icons/moonCloudy.png"

import Card from '@mui/material/Card';

const WeatherDefaultCities = ({city}) => {
    const [weather, setWeather] = useState()

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather',
            params: {city: city},
            headers: {
                'X-RapidAPI-Key': 'eea174dadamsh44835ad5b995593p140ef5jsn877a18ce11db',
                'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
            }
            };
            
            axios.request(options).then(function (response) {
                    setWeather(response.data);
                
            }).catch(function (error) {
                console.error(error);
            });
    },[city])
        const currentTemperature = weather?.temp
        const currentTime = new Date().toLocaleTimeString()

        const cloudPct = weather?.cloud_pct

        const sunriseEpoch = weather?.sunrise
        const sunrise = new Date(sunriseEpoch * 1000).toLocaleTimeString();
        const sunsetEpoch = weather?.sunset
        const sunset = new Date(sunsetEpoch * 1000).toLocaleTimeString();

        let isDay = false;
        if(currentTime>sunrise || currentTime<sunset){
            isDay=true
        }

        const returnWeatherIcon = () => {
            if (cloudPct > 67) return <img src={Cloudy} alt="Clouds weather"/>
            if(isDay && cloudPct > 33) return <img src={SunPartlyCloudy} alt="Partly cloudy day"/>
            if(isDay && cloudPct <= 33) return <img src={Sun} alt="Sun"/>
            if(!isDay && cloudPct > 33 ) return <img src={MoonPartlyCloudy} alt="Partly cloudy night"/>
            return <img src={Moon} alt="Moon"/>       
        }

    return (
        <div style={{padding: "30px"}}>
            <Card className="cardDesign"  sx={{
                background: `${
                    currentTemperature>35 ? "#f74845" : 
                    currentTemperature>28 ? "#f77d45" : 
                    currentTemperature>20 ? "#f7df45" : 
                    currentTemperature>12 ? "#cdf745" : 
                    currentTemperature> 5 ? "#45f7b3" : 
                    currentTemperature>-7 ? "#45f4f7" : 
                    "#a1f6f7"}`,
                width: "300px",
                height: "100px",
                padding: "30px",
            }}>
                <p className='cardCity'>{city}: {currentTemperature}°C</p>
                <div className='weatherIcon'>
                    {returnWeatherIcon()}
                </div>
            </Card>
        </div>
        
    )
}
// blue for card background #37c6ff
export default WeatherDefaultCities;