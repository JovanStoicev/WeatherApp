import CityWeather from './CityWeather';

const FavoriteCard = ({favoriteCities}) => {
    return (
        <div>
            {favoriteCities?.map((city) => (
                <CityWeather key={city.city} city={city.city} />
            ))}
        </div>
    )    
}

export default FavoriteCard