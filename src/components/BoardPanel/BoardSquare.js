import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import GameContext from '../../context/GameContext';
import useSound from 'use-sound';
import clickSound from '../../sounds/mouse-click.mp3';

const BoardSquare = ({location, value, sqStatus, stepSquare, stepAdjacent, updateSquareStatus}) => {
    
    const[squareStatus, setSquareStatus] = useState(sqStatus);
    const contextData = useContext(GameContext);

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
            {contextData.sound && playFlag()}
            updateSquareStatus(location, 'flagged');
            contextData.updateBombs('decrement');
        } else if (squareStatus === 'flagged') {
            updateSquareStatus(location, 'covered');
            contextData.updateBombs('increment');
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
        <div key={sqStatus} className="board-square-container" style={{width: `${(1/contextData.settings.boardSize[0])*100}%`, maxWidth: `${500/contextData.settings.boardSize[0]}px`}} onClick={squareStatus === 'covered' ? () => exposeThisSquare(location, value) : () => exposeThisSquare('uncovered')} onContextMenu={(e) => {e.preventDefault(); flagThisSquare();}}>
            {squareStatus === 'covered' ? <div className="board-square-inner covered"><div className="board-square-value"></div></div> 
                : squareStatus === 'flagged' ? <div className="board-square-inner covered"><div className="board-square-value"><img src="/flag.png" width="100%" height="auto"/></div></div>
                : squareStatus === 'exploded' ? <div className="board-square-inner"><div className="board-square-value"><img src="/spekitLogoExplode.png" width="100%" height="auto"/></div></div>
                : <div className="board-square-inner" onDoubleClick={() => revealAdjacent(contextData.currentGame.status)}><div className={`board-square-value color-${value}`}>{value === 9 ? <img src="/spekitLogoMark.png" width="100%" height="auto"/> : value}</div></div>}
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