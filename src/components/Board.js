import React, {useContext, useEffect, useState} from 'react';
import BoardMap from './BoardPanel/BoardMap';
import Welcome from './BoardPanel/Welcome';
import WinnerMessage from './BoardPanel/WinnerMessage';
import GameContext from '../context/GameContext';
import useSound from 'use-sound';
import plopSound from '../sounds/plop.mp3';
import winSound from '../sounds/children-hooray.mp3';
import bombSound from '../sounds/bomb.mp3';

const Board = () => {

    //boardMap is an object with rows as numerical properties
    //each row is an object with cells as numerical properties
    //each cell has 2 properties - status (can be covered, flagged, exposed, or exploded) and adjacent (integer representing # of adjacent bombs - or 9 if cell is a bomb itself) 
    const [boardMap, setBoardMap] = useState({});

    const contextData = useContext(GameContext);

    //UI sounds
    const [playPlop] = useSound(
        plopSound,
        { volume: 0.25 }
    );
    const [playWin] = useSound(
        winSound,
        { volume: 0.75 }
    );
    const [playBomb] = useSound(
        bombSound,
        { volume: 0.75 }
    );

    useEffect( () => {
        // handles loading of board map with game data on game reset
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
            for (let column = 1; column <= contextData.settings.boardSize[1]; column++) {
                mapTemp[column] = {};
                for (let row = 1; row <= contextData.settings.boardSize[0]; row++) {
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
            //need to find a better way to refresh progress panel than calls below...
            contextData.setGameTime(0);
            contextData.updateGameStatus('start');
        }
        if (contextData.currentGame.status === 'start') {resetBoardMap();}
    }, [contextData.settings.boardSize, contextData.settings.totalBombs, contextData.currentGame.status]);

    const checkWin = () => {
        let counter = 0;
        for (let col = 1; col <= Object.keys(boardMap).length; col++) {
            for(let row = 1; row <= Object.keys(boardMap[col]).length; row++) {
                if (boardMap[col][row]['status'] === 'exposed') {
                    counter++;
                }
            }
        }
        if (counter == ((contextData.settings.boardSize[0] * contextData.settings.boardSize[1]) - contextData.settings.totalBombs)) {
            {contextData.sound && playWin()}
            contextData.updateGameStatus('won');
            contextData.addGamePlayed(true);
        }
    }

    // handles uncovering of square and related game logic
    // cellsInfo is an array of objects with structure {location, value}
    // location is an array with structure [column, row] for cell location to check
    // value is # adjacent bombs of stepped on square (or 9 for bomb)
    const stepSquare = (cellsInfo) => {
        let newBoardMap = boardMap;
        let checkNext = []; // array to hold location coordinates of cells adjacent to any 0 value squares
        let tempCell = [];
        try {
            cellsInfo.forEach(({cell, value}) => {
                let col = parseInt(cell[0]);
                let row = parseInt(cell[1]);
                if ( typeof boardMap[col] != 'undefined' && typeof boardMap[col][row] != 'undefined') {
                    if (value === 9) {
                        newBoardMap[cell[0]][cell[1]]['status'] = 'exploded';
                        throw('lost');
                    } else if (value === 0) {
                        // expose clicked square
                        newBoardMap[cell[0]][cell[1]]['status'] = 'exposed';
                        {contextData.sound && playPlop()}
                        for (let c = col-1; c <= col+1; c++) {
                            for (let r = (row-1); r <= (row+1); r++) {
                                if (typeof boardMap[c] != 'undefined' && typeof boardMap[c][r] != 'undefined') {
                                    if (boardMap[c][r]['status'] !== 'exposed') {
                                        newBoardMap[c][r]['status'] = 'exposed';
                                        tempCell = {cell: [c, r], value: boardMap[c][r]['adjacent']};
                                        if (!checkNext.includes(tempCell)) {checkNext.push(tempCell);}
                                    }
                                }        
                            }
                        }
                        contextData.updateGameStatus('playing');              
                    } else {
                        // expose clicked square
                        newBoardMap[cell[0]][cell[1]]['status'] = 'exposed';
                        {contextData.sound && playPlop()}
                        contextData.updateGameStatus('playing');
                    }
                }
            });
        } catch (error) {
            if (error === 'lost') {
                contextData.updateGameStatus('lost');
                contextData.addGamePlayed(false);
                {contextData.sound && playBomb()}
            }
        }
        setBoardMap(newBoardMap);
        if(checkNext.length > 0) {
            stepSquare(checkNext);
        } else {
            checkWin();
        }     
    }

    // handles right click of revealed square to reveal adjacent squares
    const stepAdjacent = (cell) => {
        let col = parseInt(cell[0]);
        let row = parseInt(cell[1]);
        let tempCell = {};
        let flagged = 0;
        let bombs = 0;
        let checkNext = [];
        for (let c = col-1; c <= col+1; c++) {
            for (let r = (row-1); r <= (row+1); r++) {
                if ( c === col && r === row) { continue; }
                if (typeof boardMap[c] != 'undefined' && typeof boardMap[c][r] != 'undefined') {
                    if (boardMap[c][r]['status'] === 'flagged') {
                        flagged++;
                    } else if (boardMap[c][r]['status'] === 'covered') {
                        tempCell = {cell: [c, r], value: boardMap[c][r]['adjacent']};
                        if (!checkNext.includes(tempCell)) {checkNext.push(tempCell);}
                    }
                    if (boardMap[c][r]['adjacent'] === 9) {
                        bombs++;
                    }
                }        
            }
        }
        if (flagged >= bombs && checkNext.length > 0) {
            stepSquare(checkNext);
        }
    }

    // handles status change of individual square
    const updateSquareStatus = (location, status) => {
        let col = location[0];
        let row = location[1];
        let newBoardMap = boardMap;
        if (typeof boardMap[col] != 'undefined' && typeof boardMap[col][row] != 'undefined') {
            newBoardMap[col][row]['status'] = status;
        }
        setBoardMap(newBoardMap);
    }

    // render
    if (Object.keys(boardMap).length !== 0) {
        return (
                <div id="board-panel-container">
                    <div id="game-board-container">
                        <h4 className="board-difficulty">{contextData.settings.difficulty}</h4>
                        <div id="game-board" style={{width: `${30*contextData.settings.boardSize[0]}px`}}>
                            <BoardMap boardMap={boardMap} stepSquare={stepSquare} stepAdjacent={stepAdjacent} updateSquareStatus={updateSquareStatus}/>
                            {contextData.currentGame.status === 'won' &&
                                <WinnerMessage />
                            }   
                        </div>
                    </div>
                </div>
        );
    } else {
        return (
            <Welcome />
        );
    }
}

export default Board;