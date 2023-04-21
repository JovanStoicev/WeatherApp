import SearchCity from './SearchCity';
import Favorites from './Favorites'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system';
import { useState, useEffect } from 'react'

const Home = () => {
   // const city = require('country-state-city').City.getAllCities().name;
   const [favoriteCities,setFavoriteCities] = useState(
    JSON.parse(localStorage.getItem("favorites")) || [])

    return (
        <Box sx={{
            flexGrow: 1,
            margin: 'auto',
            width: '85%',
            paddingY: '60px'
        }}>
        <Grid container spacing={2}>
            <Grid item xs={4} sx={{padding:"20px"}}>
                <Favorites favoriteCities={favoriteCities}/> 
            </Grid>
            <Grid item xs={8}>
                <SearchCity favoriteCities={favoriteCities} setFavoriteCities={setFavoriteCities}/>                  
            </Grid>
        </Grid> 
     </Box>
    );
}

export default Home; 