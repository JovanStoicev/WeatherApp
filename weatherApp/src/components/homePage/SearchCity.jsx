import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CityWeather from './CityWeather';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


const SearchCity = ({favoriteCities, setFavoriteCities}) => {
  const [defaultCities, setDefaultCities] = useState([
    {city: "Amsterdam", isFavorite: false},
    {city: "Cleveland", isFavorite: false},
    {city: "Sofia", isFavorite: false}
  ])
  const [city, setCity] = useState([
    {city:"", isFavorite:false}
  ]); 
  
  const navigate = useNavigate();
  const [showComponent, setShowComponent] = useState(false);

  function handleInputChange(event) {
    if(event.target.value === ""){
      setShowComponent(false)
      showDefault(false, city)
  } else {
    setCity({city:event.target.value, isFavorite:false});
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if(city === ""){
      return (
        setShowComponent(false)
      )
    } 
      setShowComponent(true)
        
  }
  const handleSelectCity = (city) => {
    navigate(`/details/${city}`)
  }

  const favoriteButtonStyle = {
    color: "blue",
    margin: "auto 0 auto 0", 
    cursor: "pointer"
  }

  //TO-DO Add City to favorites and connect button with City
  const showDefault = (showComponent, city) => {
    if(showComponent===false || city.length < 1) {
        return (
            <div className="weatherContainer">
              {defaultCities.map(city => (
                <div key={city.city} style={{display: "flex"}}  >
                  {
                    checkIfCityIsFavorite(city) ? <GradeRoundedIcon fontSize='large' onClick={() => handleFavoriteOnClick(city)} style={favoriteButtonStyle}/>
                    :
                     <GradeOutlinedIcon fontSize='large' onClick={() => handleFavoriteOnClick(city)} style={favoriteButtonStyle}/>
                  }
                  <div style={{cursor:"pointer"}} onClick={() => handleSelectCity(city.city)}>
                    <CityWeather city={city.city}  />
                  </div>
                  
                </div>
              ))}
            </div>
        )
        
    }
  }

  const checkIfCityIsFavorite = (city) => {
    const isCityFavorite = favoriteCities.find((tempCity) => tempCity.city === city.city)
    return isCityFavorite;
  }

  const handleFavoriteOnClick = (city) => {
    const cityNameToUpdate = city.city;
    const updatedCities = [...defaultCities];
    const cityIndexToUpdate = updatedCities.findIndex(grad => grad.city === cityNameToUpdate);
    let updatedCity = {...updatedCities[cityIndexToUpdate]};

    const alreadyFavorite = favoriteCities.find((tempCity) => tempCity.city === cityNameToUpdate)
    if(alreadyFavorite) //if it's in favorites already, nothing happen
    {
      // on click if city is favorite, change to false and remove from favorite cities
      city.isFavorite = false;
      const removeCityFromFav = favoriteCities.filter(tempCity => tempCity.city !== cityNameToUpdate);
      setFavoriteCities(removeCityFromFav);
      localStorage.setItem('favorites', JSON.stringify(removeCityFromFav))
    } else {
      // on click if city isn't favorite, set to true and add to favorite cities list
      city.isFavorite = true
      const updateFavoriteCities = [...favoriteCities, city]
      setFavoriteCities(updateFavoriteCities)
      localStorage.setItem('favorites', JSON.stringify(updateFavoriteCities))
    }
    updatedCities[cityIndexToUpdate] = updatedCity;
    setDefaultCities(updatedCities);
  }
  return (
    <div className='weatherCitiesContainer'> 
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='City' className="search"  onChange={handleInputChange} /> 
          <IconButton  type='submit'>
            <SearchIcon />
          </IconButton>
        </form>
        {showDefault(showComponent, city)}
        {showComponent &&  
          <div style={{display: "flex"}}>
            {
              checkIfCityIsFavorite(city) ? <GradeRoundedIcon fontSize='large' onClick={() => handleFavoriteOnClick(city)} style={favoriteButtonStyle}/>
              :
              <GradeOutlinedIcon fontSize='large' onClick={() => handleFavoriteOnClick(city)} style={favoriteButtonStyle}/>
            }
            <div style={{cursor:"pointer"}} onClick={() => handleSelectCity(city.city)}>
              <CityWeather city={city.city}  />
            </div>
          </div>
        }
    </div>
  );
}

export default SearchCity;