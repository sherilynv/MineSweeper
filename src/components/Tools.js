import React from 'react';
import ToolsButton from './ToolsPanel/ToolsButton';
import ContentFlyout from './ToolsPanel/ContentFlyout';
// import GameContext from '../context/GameContext';


const Tools = () => {
    
    return (
        // <GameContext.Consumer>
        //     {({...}) => (
                <div id="tools-panel-container">
                    <ToolsButton mode="settings" />
                    <ToolsButton mode="stats" />
                    <ToolsButton mode="instructions" />
                    <ContentFlyout />
                </div>
        //     )}
        // </GameContext.Consumer>
    )
}

export default Tools;