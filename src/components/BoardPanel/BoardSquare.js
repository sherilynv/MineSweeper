import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import GameContext from '../../context/GameContext';
import useSound from 'use-sound';
import clickSound from '../../sounds/mouse-click.mp3';

// Handles rendering each individual game board square and handles its UI
const BoardSquare = ({location, value, sqStatus, stepSquare, stepAdjacent, updateSquareStatus}) => {
    
    const[squareStatus, setSquareStatus] = useState(sqStatus);
    const context = useContext(GameContext);

    const [playFlag] = useSound(
        clickSound,
        { volume: 0.25 }
    );

    const exposeThisSquare = (cell, value) => {
        if (cell === 'uncovered') {
            return;
        } else {
            stepSquare([{cell, value}]);
        }
    }

    const flagThisSquare = () => {
        
        if (squareStatus === 'uncovered') {
            return;
        } else if (squareStatus === 'covered') {
            {context.sound && playFlag()}
            updateSquareStatus(location, 'flagged');
            context.updateBombs('decrement');
        } else if (squareStatus === 'flagged') {
            updateSquareStatus(location, 'covered');
            context.updateBombs('increment');
        }
    }

    const revealAdjacent = (status) => {
        if (status === 'playing') {    
            stepAdjacent(location);
            return;
        }
    }

    useEffect(() => {
        setSquareStatus(sqStatus);
    }, [sqStatus]);

    return (
        <div key={sqStatus} className="board-square-container" style={{width: `${(1/context.settings.boardSize[0])*100}%`, maxWidth: `${500/context.settings.boardSize[0]}px`}} onClick={squareStatus === 'covered' ? () => exposeThisSquare(location, value) : () => exposeThisSquare('uncovered')} onContextMenu={(e) => {e.preventDefault(); flagThisSquare();}}>
            {squareStatus === 'covered' ? <div className="board-square-inner covered"><div className="board-square-value"></div></div> 
                : squareStatus === 'flagged' ? <div className="board-square-inner covered"><div className="board-square-value"><img src="/flag.png" width="100%" height="auto"/></div></div>
                : squareStatus === 'exploded' ? <div className="board-square-inner"><div className="board-square-value"><img src="/octoSplosion.png" width="100%" height="auto"/></div></div>
                : <div className="board-square-inner" onContextMenu={() => revealAdjacent(context.currentGame.status)}><div className={`board-square-value color-${value}`}>{value === 9 ? <img src="/octoBomb.png" width="100%" height="auto"/> : value}</div></div>}
        </div>
    );

}

BoardSquare.propTypes = {
    location: PropTypes.array,
    value: PropTypes.number,
    sqStatus: PropTypes.string,
    stepSquare: PropTypes.func,
    stepAdjacent: PropTypes.func,
    updateSquareStatus: PropTypes.func
}

export default BoardSquare;
