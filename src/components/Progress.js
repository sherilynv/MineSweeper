import React from 'react';
import ResetButton from './ProgressPanel/ResetButton';
import GameClock from './ProgressPanel/GameClock';
import BombCounter from './ProgressPanel/BombCounter';
// import GameContext from '../context/GameContext';

const Progress = () => {
    
    return (
        // <GameContext.Consumer>
        //     {({}) => (
                <div id="progress-panel-container">
                    <ResetButton />
                    <GameClock />
                    <BombCounter />
                </div>
        //     )}            
        // </GameContext.Consumer>
    )
}

export default Progress;