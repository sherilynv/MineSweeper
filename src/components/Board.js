import React, {useContext, useEffect, useState} from 'react';
import BoardSquare from './BoardPanel/BoardSquare';
import GameContext from '../context/GameContext';
import useSound from 'use-sound';
import plopSound from '../sounds/plop.mp3';

const Board = () => {

    //boardMap holds map of bomb locations with [column][row] indices - value is integer representing # of adjacent bombs (or 9 if cell is a bomb itself)
    const [boardMap, setBoardMap] = useState({});

    const contextData = useContext(GameContext);

    const [playPlop] = useSound(
        plopSound,
        { volume: 0.25 }
    );

    useEffect( () => {
        const resetBoardMap = () => {
            let randomRange = [];
            for (let i=1; i <= (contextData.settings.boardSize[0] * contextData.settings.boardSize[1]); i++) {
                randomRange.push(i);
            }
            let randomBombs = randomRange.sort(() => .5 - Math.random()).slice(0,contextData.settings.totalBombs);
            let mapTemp = {};
            let n = 0;
            let bombCount;
            let pointers = {};
            for (let column = 1; column <= contextData.settings.boardSize[0]; column++) {
                mapTemp[column] = {};
                for (let row = 1; row <= contextData.settings.boardSize[1]; row++) {
                    mapTemp[column][row] = {};
                    mapTemp[column][row]['status'] = 'covered';
                    n++;
                    pointers[n] = [];
                    bombCount = 0;
                    if (randomBombs.includes(n)) {
                        mapTemp[column][row]['adjacent'] = 9;
                    } else {
                        if (column > 1) {
                            if (row > 1) {
                                pointers[n].push(n - contextData.settings.boardSize[0] - 1);
                            }
                            pointers[n].push(n - contextData.settings.boardSize[0]);
                            if (row < contextData.settings.boardSize[0]) {
                                pointers[n].push(n - contextData.settings.boardSize[0] + 1);
                            }
                        }
                        if (row > 1) {
                            pointers[n].push(n - 1);
                        }
                        if (row < contextData.settings.boardSize[0]) {
                            pointers[n].push(n + 1);
                        }
                        if (column < contextData.settings.boardSize[1]) {
                            if (row > 1) {
                                pointers[n].push(n + contextData.settings.boardSize[0] - 1);
                            }
                            pointers[n].push(n + contextData.settings.boardSize[0]);
                            if (row < contextData.settings.boardSize[0]) {
                                pointers[n].push(n + contextData.settings.boardSize[0] + 1);
                            }
                        }
                        pointers[n].forEach(pointer => {
                            if (randomBombs.includes(pointer)) { bombCount++; }
                        })
                        mapTemp[column][row]['adjacent'] = bombCount;
                    }
                }
            }
            setBoardMap(mapTemp);
        }
        if (contextData.currentGame.status === 'start') {resetBoardMap();}
    }, [contextData.settings.boardSize, contextData.settings.totalBombs, contextData.currentGame.status]);

    //cellsInfo is an array of objects with structure {location, value}
    //location is an array with structure [column, row] for cell location to check
    //value is # adjacent bombs of stepped on square (or 9 for bomb)
    const stepSquare = (cellsInfo) => {
        let newBoardMap = boardMap;
        let checkNext = []; // array to hold location coordinates of cells adjacent to any 0 value squares
        let tempCell = [];
        cellsInfo.forEach(({cell, value}) => {
            let col = parseInt(cell[0]);
            let row = parseInt(cell[1]);
            if ( typeof boardMap[col] != 'undefined' && typeof boardMap[col][row] != 'undefined') {
                if (value === 9) {
                    newBoardMap[cell[0]][cell[1]]['status'] = 'exploded';
                    contextData.updateGameStatus('lost');
                } else if (value === 0) {
                    //expose clicked square
                    newBoardMap[cell[0]][cell[1]]['status'] = 'exposed';
                    {contextData.sound && playPlop()}
                    for (let c = col-1; c <= col+1; c++) {
                        for (let r = (row-1); r <= (row+1); r++) {
                            if (typeof boardMap[c] != 'undefined' && typeof boardMap[c][r] != 'undefined') {
                                if (boardMap[c][r]['status'] !== 'exposed') {
                                    newBoardMap[c][r]['status'] = 'exposed';
                                    tempCell = {cell: [c, r], value: boardMap[c][r]['adjacent']};
                                    if (!checkNext.includes(tempCell)) {checkNext.push(tempCell);}
                                    //stepSquare([(cell[0]-1), (cell[1]-1)], newBoardMap[(cell[0]-1)][(cell[1]-1)]['adjacent']);
                                }
                            }        
                        }
                    }
                    contextData.updateGameStatus('playing');              
                } else {
                    //expose clicked square
                    newBoardMap[cell[0]][cell[1]]['status'] = 'exposed';
                    {contextData.sound && playPlop()}
                    contextData.updateGameStatus('playing');
                }
            }
        });
        setBoardMap(newBoardMap);
        if(checkNext.length > 0) {
            stepSquare(checkNext);
        }
    }

    if (Object.keys(boardMap).length !== 0) {
        return (
                <div id="board-panel-container">
                    <div id="game-board-container">
                        <div id="game-board">
                            <h4 className="board-difficulty">{contextData.settings.difficulty}</h4>
                            {Object.entries(boardMap).map(([col, rows]) => {
                                let squaresRender = Object.entries(rows).map(([rw, cell]) => {
                                    let key = parseInt(((col-1)*contextData.settings.boardSize[0])) + parseInt(rw);
                                    return (<BoardSquare key={key} location={[col, rw]} value={cell['adjacent']} sqStatus={(contextData.currentGame.status === 'won' || (contextData.currentGame.status === 'lost' && cell['status'] !== 'exploded')) ? 'exposed' : cell['status']} stepSquare={stepSquare}/>);
                                });
                                return (<div key={col} className="board-row">{squaresRender}</div>);
                            })}
                        </div>
                    </div>
                </div>
        );
    } else {
        return (
            <div id="board-panel-container">
                <div id="welcome-container">
                    <div className="welcome-message">
                        <img src="/spekitOctopusWithWand.png"/>
                        <h4>Welcome to Mind Sweeper</h4>
                        <p><em>{`(my coding challenge for the Spektacular Spekit)`}</em></p>
                        <p>{`Let's play!`}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;