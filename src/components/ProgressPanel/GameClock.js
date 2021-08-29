import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useInterval from '../../hooks/useInterval';

const GameClock = ({clockInterval, status}) => {
    
    const [gameTime, setGameTime] = useState(0);
    
    useEffect(() => {
        if (status ==='start' || status ==='welcome') {
            setGameTime(0);
        }
    }, [status])

    useInterval(() => {  
        setGameTime(gameTime + 1);
    }, clockInterval);

    return (
        <div id="game-clock-container">
            TIME
            <div className="game-clock">
                {gameTime.toString()}
            </div>
        </div>
    )
}

GameClock.propTypes = {
    clockInterval: PropTypes.number,
    status: PropTypes.string
}


export default GameClock;