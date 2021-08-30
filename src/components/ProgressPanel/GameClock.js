import React, {useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import useInterval from '../../hooks/useInterval';
import GameContext from '../../context/GameContext';

const GameClock = ({clockInterval}) => {

    const contextData = useContext(GameContext);

    useEffect(() => {
        if (contextData.currentGame.status ==='start' || contextData.currentGame.status ==='welcome') {
            contextData.setGameTime(0);
        }
    }, [status])

    useInterval(() => {  
        contextData.setGameTime(contextData.gameTime + 1);
    }, clockInterval);

    return (
        <div id="game-clock-container">
            TIME
            <div className="game-clock">
                {contextData.gameTime.toString()}
            </div>
        </div>
    )
}

GameClock.propTypes = {
    clockInterval: PropTypes.number,
}


export default GameClock;