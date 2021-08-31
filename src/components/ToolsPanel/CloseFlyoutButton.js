import React from 'react';
import GameContext from '../../context/GameContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

const CloseFlyoutButton = () => {
    
    return (
        <GameContext.Consumer>
            {({updateDisplayMode}) => (
                <div id="close-flyout-button-container" onClick={()=>updateDisplayMode('game')}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </div>
            )}
        </GameContext.Consumer>
    )
}

export default CloseFlyoutButton;
