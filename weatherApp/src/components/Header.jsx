import '../App.css'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate('/')
    }
    return (       
        <div className="header">
                <div className='positionItems'>
                    <HomeRoundedIcon sx={{color: "aliceblue"}} fontSize="large" className='homeButton' onClick={() => handleOnClick()}/>
                    <h1 style={{marginLeft:"-90px"}}>Weather app</h1>
                </div>
            </div>
    )
}

export default Header