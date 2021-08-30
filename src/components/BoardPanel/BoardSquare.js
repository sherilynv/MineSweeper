import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import GameContext from '../../context/GameContext';


const BoardSquare = ({location, value, sqStatus, stepSquare}) => {
    
    const[squareStatus, setSquareStatus] = useState(sqStatus);
    const contextData = useContext(GameContext);

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
            setSquareStatus('flagged');
            contextData.updateBombs('decrement');
        } else if (squareStatus === 'flagged') {
            setSquareStatus('covered');
            contextData.updateBombs('increment');
        }
    }

    useEffect(() => {
        setSquareStatus(sqStatus);
    }, [sqStatus]);

    return (
        <div key={sqStatus} className="board-square-container" onClick={squareStatus === 'covered' ? () => exposeThisSquare(location, value) : () => exposeThisSquare('uncovered')} onContextMenu={(e) => {e.preventDefault(); flagThisSquare();}}>
            {squareStatus === 'covered' ? <div className="board-square-inner covered"><div className="board-square-value"></div></div> : squareStatus === 'flagged' ? <div className="board-square-inner covered"><div className="board-square-value"><img src="/flag.png" width="100%" height="auto"/></div></div> : <div className="board-square-inner"><div className={`board-square-value color-${value}`}>{value === 9 ? <img src="/spekitLogoMark.png" width="100%" height="auto"/> : value}</div></div>}
        </div>
    );

}

BoardSquare.propTypes = {
    location: PropTypes.array,
    value: PropTypes.number,
    sqStatus: PropTypes.string,
    stepSquare: PropTypes.func
}

export default BoardSquare;