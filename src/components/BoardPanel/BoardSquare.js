import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const BoardSquare = ({location, value, sqStatus, stepSquare}) => {
    
    const[squareStatus, setSquareStatus] = useState(sqStatus);

    const exposeThisSquare = (location, value) => {
        if (location === 'empty') {
            return;
        } else {
            stepSquare(location, value);
            setSquareStatus(squareStatus);
        }
    }

    useEffect(() => {
        setSquareStatus(sqStatus);
    }, [sqStatus]);

    return (
        <div key={sqStatus} className="board-square-container" onClick={squareStatus === 'covered' ? () => exposeThisSquare(location, value) : () => exposeThisSquare('empty')}>
            {squareStatus === 'covered' ? <div className="board-square-inner covered"><div className="board-square-value"></div></div> : <div className="board-square-inner"><div className={`board-square-value color-${value}`}>{value === 9 ? <img src="/spekitLogoMark.png" width="100%" height="auto"/> : value}</div></div>}
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