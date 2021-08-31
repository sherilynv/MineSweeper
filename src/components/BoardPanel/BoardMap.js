import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GameContext from '../../context/GameContext';
import BoardSquare from './BoardSquare';

// Handles rendering the game board grid
const BoardMap = ({boardMap, stepSquare, stepAdjacent, updateSquareStatus}) => {

    const contextData = useContext(GameContext);

    return (
        <div id="boardMap">
            {Object.entries(boardMap).map(([col, rows]) => {
                let squaresRender = Object.entries(rows).map(([rw, cell]) => {
                    //convert column and row location in grid to n index of cell in map for key
                    let key = parseInt(((col-1)*contextData.settings.boardSize[0])) + parseInt(rw);
                    return (<BoardSquare 
                        key={key} location={[col, rw]} value={cell['adjacent']} 
                        sqStatus={(contextData.currentGame.status === 'won' || (contextData.currentGame.status === 'lost' && cell['status'] !== 'exploded')) ? 'exposed' : cell['status']}
                        stepSquare={stepSquare} stepAdjacent={stepAdjacent} updateSquareStatus={updateSquareStatus}
                        />);
                });
                return (<div key={col} className="board-row">{squaresRender}</div>);
            })}
        </div>

    )
}

BoardMap.propTypes = {
    boardMap: PropTypes.object,
    stepSquare: PropTypes.func,
    stepAdjacent: PropTypes.func,
    updateSquareStatus: PropTypes.func
}

export default BoardMap;
