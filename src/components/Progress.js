import React from 'react';
import ResetButton from './ProgressPanel/ResetButton';
import GameClock from './ProgressPanel/GameClock';
import BombCounter from './ProgressPanel/BombCounter';
import GameContext from '../context/GameContext';

const Progress = () => {
    
    return (
        <GameContext.Consumer>
            {({currentGame, updateGameStatus}) => (
                <div id="progress-panel-container">
                    <ResetButton update={updateGameStatus}/>
                    <GameClock clockInterval={currentGame.status === 'playing' ? 1000 : null} status={currentGame.status}/>
                    <BombCounter count={currentGame.bombsRemaining}/>
                </div>
            )}            
        </GameContext.Consumer>
    )
}

export default Progress;