import React, {useEffect, useState} from 'react';
import PropsTypes from 'prop-types';
import BoardSquare from './BoardPanel/BoardSquare';

const Board = ({difficulty, boardSize, totalBombs, gameStatus, updateGameStatus}) => {

    //boardMap holds map of bomb locations with [column][row] indices - value is integer representing # of adjacent bombs (or 9 if cell is a bomb itself)
    const [boardMap, setBoardMap] = useState({});

    useEffect( () => {
        const resetBoardMap = () => {
            let randomRange = [];
            for (let i=1; i <= (boardSize[0] * boardSize[1]); i++) {
                randomRange.push(i);
            }
            let randomBombs = randomRange.sort(() => .5 - Math.random()).slice(0,totalBombs);
            let mapTemp = {};
            let n = 0;
            let bombCount;
            let pointers = {};
            for (let column = 1; column <= boardSize[0]; column++) {
                mapTemp[column] = {};
                for (let row = 1; row <= boardSize[1]; row++) {
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
                                pointers[n].push(n - boardSize[0] - 1);
                            }
                            pointers[n].push(n - boardSize[0]);
                            if (row < boardSize[0]) {
                                pointers[n].push(n - boardSize[0] + 1);
                            }
                        }
                        if (row > 1) {
                            pointers[n].push(n - 1);
                        }
                        if (row < boardSize[0]) {
                            pointers[n].push(n + 1);
                        }
                        if (column < boardSize[1]) {
                            if (row > 1) {
                                pointers[n].push(n + boardSize[0] - 1);
                            }
                            pointers[n].push(n + boardSize[0]);
                            if (row < boardSize[0]) {
                                pointers[n].push(n + boardSize[0] + 1);
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
        if (gameStatus === 'start') {resetBoardMap();}
    }, [boardSize, totalBombs, gameStatus]);

    //locations is an array of [column, row] location arrays, value is # adjacent bombs of stepped on square (or 9 for bomb)
    const stepSquare = (location, value) => {
        console.log(location);
        // location.forEach(for(){

        // }
        if (location[0] in boardMap && location[1] in boardMap[location[0]]) {
            let newBoardMap = boardMap;
            if (value === 9) {
                updateGameStatus('lost');
                //alert('You lose!');
            } else if (value === 0) {
                //expose clicked square
                newBoardMap[location[0]][location[1]]['status'] = 'exposed';
                //test top left square
                if ((location[0]-1) in newBoardMap && (location[1]-1) in newBoardMap[(location[0]-1)]) {
                    if (newBoardMap[(location[0]-1)][(location[1]-1)]['adjacent'] === 0 && newBoardMap[(location[0]-1)][(location[1]-1)]['status'] !== 'exposed') {
                        stepSquare([(location[0]-1), (location[1]-1)], newBoardMap[(location[0]-1)][(location[1]-1)]['adjacent']);
                    } else {
                        newBoardMap[(location[0]-1)][(location[1]-1)]['status'] = 'exposed';
                    }
                }
                //test top square
                if ((location[0]) in newBoardMap && (location[1]-1) in newBoardMap[(location[0])]) {
                    if (newBoardMap[(location[0])][(location[1]-1)]['adjacent'] === 0 && newBoardMap[(location[0])][(location[1]-1)]['status'] !== 'exposed') {
                        stepSquare([(location[0]), (location[1]-1)], newBoardMap[(location[0])][(location[1]-1)]['adjacent']);
                    } else {
                        newBoardMap[(location[0])][(location[1]-1)]['status'] = 'exposed';
                    }
                }
                //test top right square
                if ((location[0]+1) in newBoardMap && (location[1]-1) in newBoardMap[(location[0]+1)]) {
                    if (newBoardMap[(location[0]+1)][(location[1]-1)]['adjacent'] === 0 && newBoardMap[(location[0]+1)][(location[1]-1)]['status'] !== 'exposed') {
                        stepSquare([(location[0]+1), (location[1]-1)], newBoardMap[(location[0]+1)][(location[1]-1)]['adjacent']);
                    } else {
                        newBoardMap[(location[0]+1)][(location[1]-1)]['status'] = 'exposed';
                    }
                }
                //test left square
                if ((location[0]-1) in newBoardMap && (location[1]) in newBoardMap[(location[0]-1)]) {
                    if (newBoardMap[(location[0]-1)][(location[1])]['adjacent'] === 0 && newBoardMap[(location[0]-1)][(location[1])]['status'] !== 'exposed') {
                        stepSquare([(location[0]-1), (location[1])], newBoardMap[(location[0]-1)][(location[1])]['adjacent']);
                    } else {
                        newBoardMap[(location[0]-1)][(location[1])]['status'] = 'exposed';
                    }
                }
                //test right square
                if ((location[0]+1) in newBoardMap && (location[1]) in newBoardMap[(location[0]+1)]) {
                    if (newBoardMap[(location[0]+1)][(location[1])]['adjacent'] === 0 && newBoardMap[(location[0]+1)][(location[1])]['status'] !== 'exposed') {
                        stepSquare([(location[0]+1), (location[1])], newBoardMap[(location[0]+1)][(location[1])]['adjacent']);
                    } else {
                        newBoardMap[(location[0]+1)][(location[1])]['status'] = 'exposed';
                    }
                }
                //test bottom left square
                if ((location[0]-1) in newBoardMap && (location[1]+1) in newBoardMap[(location[0]-1)]) {
                    if (newBoardMap[(location[0]-1)][(location[1]+1)]['adjacent'] === 0 && newBoardMap[(location[0]-1)][(location[1]+1)]['status'] !== 'exposed') {
                        stepSquare([(location[0]-1), (location[1]+1)], newBoardMap[(location[0]-1)][(location[1]+1)]['adjacent']);
                    } else {
                        newBoardMap[(location[0]-1)][(location[1]+1)]['status'] = 'exposed';
                    }
                }
                //test bottom square
                if ((location[0]) in newBoardMap && (location[1]+1) in newBoardMap[(location[0])]) {
                    if (newBoardMap[(location[0])][(location[1]+1)]['adjacent'] === 0 && newBoardMap[(location[0])][(location[1]+1)]['status'] !== 'exposed') {
                        stepSquare([(location[0]), (location[1]+1)], newBoardMap[(location[0])][(location[1]+1)]['adjacent']);
                    } else {
                        newBoardMap[(location[0])][(location[1]+1)]['status'] = 'exposed';
                    }
                }
                //test top right square
                if ((location[0]+1) in newBoardMap && (location[1]+1) in newBoardMap[(location[0]+1)]) {
                    if (newBoardMap[(location[0]+1)][(location[1]+1)]['adjacent'] === 0 && newBoardMap[(location[0]+1)][(location[1]+1)]['status'] !== 'exposed') {
                        stepSquare([(location[0]+1), (location[1]+1)], newBoardMap[(location[0]+1)][(location[1]+1)]['adjacent']);
                    } else {
                        newBoardMap[(location[0]+1)][(location[1]+1)]['status'] = 'exposed';
                    }
                }

                setBoardMap(newBoardMap);
                updateGameStatus('playing');
            } else {
                newBoardMap[location[0]][location[1]]['status'] = 'exposed';
                updateGameStatus('playing');
            }
        }
    }

    if (Object.keys(boardMap).length !== 0) {
        return (
                <div id="board-panel-container">
                    <div id="game-board-container">
                        <div id="game-board">
                            <h4 className="board-difficulty">{difficulty}</h4>
                            {Object.entries(boardMap).map(([col, rows]) => {
                                let squaresRender = Object.entries(rows).map(([rw, cell]) => {
                                    let key = parseInt(((col-1)*boardSize[0])) + parseInt(rw);
                                    return (<BoardSquare key={key} location={[col, rw]} value={cell['adjacent']} sqStatus={(gameStatus === 'won' || gameStatus === 'lost') ? 'exposed' : cell['status']} stepSquare={stepSquare}/>);
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

Board.propTypes = {
    difficulty: PropsTypes.string,
    boardSize: PropsTypes.array,
    totalBombs: PropsTypes.number,
    gameStatus: PropsTypes.string,
    updateGameStatus: PropsTypes.func
}

export default Board;