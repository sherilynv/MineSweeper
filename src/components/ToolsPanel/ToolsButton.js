import React from 'react';
import PropTypes from 'prop-types';
import GameContext from '../../context/GameContext';

const ToolsButton = ({mode, icon, selected}) => {
    
    return (
        <GameContext.Consumer>
            {({updateDisplayMode}) => (
                <div data-testid="tools-button" className={selected ? 'tools-button selected' : 'tools-button'} onClick={() => updateDisplayMode(mode)}>
                    {icon}
                </div>
            )}
        </GameContext.Consumer>
    )
}

ToolsButton.propTypes = {
    mode: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    updateDisplayMode: PropTypes.func
}

export default ToolsButton;
