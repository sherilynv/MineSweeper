import React from 'react';
import GameContext from '../../context/GameContext';

// Handles rendering of initial welcome message
const Welcome = () => {

    return (
        <GameContext.Consumer>
            {({updateGameStatus}) => (
                <div id="board-panel-container">
                    <div id="welcome-container">
                        <div className="welcome-message">
                            <img src="/spekitOctopusWithWand.png"/>
                            <h4>Welcome to Octo-Sweeper</h4>
                            <p><em>(my coding challenge for the Spektacular Spekit)</em></p>
                            <p>Avoid stepping on my friends to win!</p>
                            <div>
                                <button className="btn btn-danger btn-lg" style={{color: '#ffffff'}} onClick={() => updateGameStatus('start')}>{`Let's Play`}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </GameContext.Consumer>
    );
    
}

export default Welcome;
