import React from 'react';
import Tools from '../components/Tools';
import Board from '../components/Board';
import Progress from '../components/Progress';
import GameContext from '../context/GameContext';

const GamePage = () => {
    
    
    return (
        <GameContext.Provider value={{}}>
            <div id="game-page-container"> 
                <Tools />
                <Board />
                <Progress />           
            </div>
        </GameContext.Provider>
    )
}
export default GamePage;