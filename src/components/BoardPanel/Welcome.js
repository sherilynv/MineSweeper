import React from 'react';

const Welcome = () => {

    return (
        <div id="board-panel-container">
            <div id="welcome-container">
                <div className="welcome-message">
                    <img src="/spekitOctopusWithWand.png"/>
                    <h4>Welcome to Mine Sweeper</h4>
                    <p><em>(my coding challenge for the Spektacular Spekit)</em></p>
                    <p>Avoid stepping on my friends to win!</p>
                </div>
            </div>
        </div>
    );
    
}

export default Welcome;
