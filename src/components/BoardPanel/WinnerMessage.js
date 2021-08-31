import React, {useState, useContext} from 'react';
import GameContext from '../../context/GameContext';

const WinnerMessage = () => {
    
    const [winnerName, setWinnerName] = useState('');

    const contextData = useContext(GameContext);

    //Handle high score form
    const handleWinnerSubmit = (e) => {
        e.preventDefault();
        contextData.updateLeaders(winnerName);
        contextData.updateGameStatus('start');
    }
    const onNameChange = (e) => {
        setWinnerName(e.target.value);
    }

    return (
        <div id="winner-message-container">
            <div className="congrats">
                <img src="/spekitOctopusWithWand.png"/>
                {((contextData.gameTime < contextData.stats[`${contextData.settings.difficulty}Leader`].score) || (contextData.stats[`${contextData.settings.difficulty}Leader`].score === -1) )
                    ? <div className="winner-message">New High Score!</div>
                    : <div className="winner-message">You won!</div>
                }
            </div>
            {((contextData.gameTime < contextData.stats[`${contextData.settings.difficulty}Leader`].score) || (contextData.stats[`${contextData.settings.difficulty}Leader`].score === -1) ) && 
                <div className="new-high-score">
                    <form onSubmit={(e) => handleWinnerSubmit(e)}>
                        <div className="mb-2">
                            <label htmlFor="player-name">Enter name:</label>
                            <input className="form-control" type="text" value={winnerName} onChange={onNameChange} name="player-name" />
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            }
        </div>
    );
}

export default WinnerMessage;
