import React, {useState, useContext} from 'react';
import GameContext from '../../context/GameContext';

// Handles rendering of message on Game Win, along with name form for high score handling
const WinnerMessage = () => {
    
    const [winnerName, setWinnerName] = useState('');

    const context = useContext(GameContext);

    //Handle high score form
    const handleWinnerSubmit = (e) => {
        e.preventDefault();
        context.updateLeaders(winnerName);
        context.updateGameStatus('start');
    }
    const onNameChange = (e) => {
        setWinnerName(e.target.value);
    }

    return (
        <div id="winner-message-container">
            <div className="congrats">
                <img src="/spekitOctopusWithWand.png"/>
                {((context.gameTime < context.stats[`${context.settings.difficulty}Leader`].score) || (context.stats[`${context.settings.difficulty}Leader`].score === -1) )
                    ? <div className="winner-message">New High Score!</div>
                    : <div className="winner-message">You won!</div>
                }
            </div>
            {((context.gameTime < context.stats[`${context.settings.difficulty}Leader`].score) || (context.stats[`${context.settings.difficulty}Leader`].score === -1) ) && 
                <div className="new-high-score">
                    <form data-testid="high-score-form" onSubmit={(e) => handleWinnerSubmit(e)}>
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
