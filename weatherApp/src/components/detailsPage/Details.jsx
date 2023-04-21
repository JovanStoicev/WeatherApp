import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Compass from "./Compass";

import Cloudy from "../../images/icons/cloudy.png"
import SunPartlyCloudy from "../../images/icons/sunCloudy.png"
import Sun from "../../images/icons/sun.png"
import Moon from "../../images/icons/moon.png"
import MoonPartlyCloudy from "../../images/icons/moonCloudy.png"
import TemperatureMinMax from "../../images/icons/temperatureMinMax.JPG"
import Sunrise from "../../images/icons/sunrise.png"
import Sunset from "../../images/icons/sunset.png"

const Details = () => {
    const { city } = useParams()
    const [weather, setWeather] = useState()
    let currentTime = new Date ().toLocaleTimeString();

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
                console.log(city)
                console.log(response.data)
                setWeather(response.data);
            
        }).catch(function (error) {
            console.error(error);
        });
        
        const cloudPct = weather?.cloud_pct

        const maxTemp = weather?.max_temp
        const minTemp = weather?.min_temp
        const temp = weather?.temp
        const feelsLikeTemp = weather?.feels_like

        const windSpeed = weather?.wind_speed
        const windDegrees = weather?.wind_degrees

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

        const getWindDirection = () => {
            if(windDegrees>=338 || windDegrees<23) return "NORTH"
            if(windDegrees>=23 && windDegrees<67) return "NORTH-EAST"
            if(windDegrees>=67 && windDegrees<112) return "EAST"
            if(windDegrees>=112 && windDegrees<157) return "SOUTH-EAST"
            if(windDegrees>=157 && windDegrees<202) return "SOUTH"
            if(windDegrees>=202 && windDegrees<247) return "SOUTH-WEST"
            if(windDegrees>=247 && windDegrees<292) return "WEST"
            if(windDegrees>=292 && windDegrees<338) return "NORTH-WEST"
        }

    return(
        <div>
            <div id="detailsCityTitle">
                <h1>{city}</h1>
            </div>
            <div className="gridContainer">
                <div className="temperature templatePosition">
                    <div>
                        <h1>Temperature <span className="detailsNumberFontSize">{temp}°C</span></h1>
                        <h2>Feel {feelsLikeTemp}°C</h2>
                    </div>
                    <div>
                        {returnWeatherIcon()}
                    </div>
                </div>
                <div className="wind templatePosition">
                    <h1> Wind speed <span className="detailsNumberFontSize">{windSpeed}</span><span id="windSpeed">km/h</span><br/>
                    Wind direction {getWindDirection()}
                    </h1>
                    <div>
                        <Compass degree={windDegrees} />
                    </div>
                </div>
                <div className="minMaxTemp templatePosition">
                    <div>
                        <h1>Min temperature <span className="detailsNumberFontSize">{minTemp}°C</span></h1>
                    </div>
                    <img src={TemperatureMinMax} alt="max/min temperature"/>
                    <div>
                        <h1>Max temperature <span className="detailsNumberFontSize">{maxTemp}°C</span></h1> 
                    </div>
                </div>
                <div className="sunriseSunset templatePosition">
                    <div>
                        <img src={Sunrise} alt="sunrise icon" />
                        <h1>{sunrise}<span style={{fontSize:"20px"}}>*</span></h1>
                    </div>
                    <div>
                        <img src={Sunset} alt="sunset icon" />
                        <h1>{sunset}<span style={{fontSize:"20px"}}>*</span></h1>
                    </div>
                        <div id="middleSunset">*Based on your local time</div>
                </div>
            </div>
        </div>
    )

}

export default Details;