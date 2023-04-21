import React, { useState, useEffect } from "react";
import compassImage from "../../images/compass.png"

const Compass = ({ degree }) => {
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        setDirection(degree);
    }, [degree])

    const getArrowRotation = (direction) => {
        return `rotate(${direction}deg)`;
    }

    return (
        <div className="compass">
            <div className="compass-image">
                <img src={compassImage} alt="compass" />
            </div>
            <div 
            className="compass-arrow"
            style={{transform: getArrowRotation(direction)}}
            >
                <i className="fa fa-arrow-up" aria-hidden="true"></i>
            </div>
        </div>
    )
}

export default Compass