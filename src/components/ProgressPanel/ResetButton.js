import React from 'react';
import GameContext from '../../context/GameContext';

const ResetButton = () => {
    
    return (
        <GameContext.Consumer>
            {({updateGameStatus}) => (
                <div id="reset-button-container" className="d-grid gap-2">
                    <button className="btn btn-primary" onClick={() => updateGameStatus('start') }>New Game</button>
                </div>
            )}
        </GameContext.Consumer>
    )
}


export default ResetButton;
