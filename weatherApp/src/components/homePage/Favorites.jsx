import Divider from '@mui/material/Divider';
import FavoriteCards from './FavoriteCards';

const Favorites = ( {favoriteCities} ) => {
    return (
        <div>
            <h1 style = {{textAlign: "center"}}>Favorites
            <Divider orientation='horizontal' /> 
            </h1>
            <FavoriteCards favoriteCities={favoriteCities}/>
        </div>
    )
}

export default Favorites