import React from 'react';
import BoardSquare from './BoardPanel/BoardSquare';
//import GameContext from '../context/GameContext';

const Board = () => {

    return (
    // <GameContext.Consumer>
    //     {({}) => (
            //map over board squares
            <div id="board-panel-container">
                <BoardSquare />
            </div>
    //     )}
    // </GameContext.Consumer>
    );

}


export default Board;