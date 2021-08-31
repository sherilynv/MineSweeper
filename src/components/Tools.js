import React from 'react';
import ToolsButton from './ToolsPanel/ToolsButton';
import ContentFlyout from './ToolsPanel/ContentFlyout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import GameContext from '../context/GameContext';


const Tools = () => {
    
    return (
        <GameContext.Consumer>
            {({updateDisplayMode, display}) => (
                <div id="tools-panel-container">
                    <ToolsButton mode="settings" icon={<FontAwesomeIcon icon={faCog} />} selected={display.mode === 'settings' ? true : false} updateDisplayMode={updateDisplayMode}/>
                    <ToolsButton mode="stats" icon={<FontAwesomeIcon icon={faTrophy} />} selected={display.mode === 'stats' ? true : false}/>
                    <ToolsButton mode="instructions" icon={<FontAwesomeIcon icon={faInfoCircle} />} selected={display.mode === 'instructions' ? true : false}/>
                    {display.mode != 'game' ? <ContentFlyout displayMode={display.mode}/> : ''}
                </div>
            )}
        </GameContext.Consumer>
    )
}

export default Tools;