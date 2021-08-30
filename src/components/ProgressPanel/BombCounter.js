import React from 'react';
import PropTypes from 'prop-types';

const BombCounter = ({count}) => {
    
    return (
        <div id="bomb-counter-container">
            <span className="progress-label">BOMBS LEFT</span>
            <div className="bomb-counter">
                {count}
            </div>
        </div>
    )
}

BombCounter.propTypes = {
    count: PropTypes.number
}

export default BombCounter;