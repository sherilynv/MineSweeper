import React from 'react';
import GameContext from '../../context/GameContext';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { ButtonGroup, Button } from 'react-bootstrap';

const SettingsContent = () => {
    
    return (
    <GameContext.Consumer>
        {({sound, settings, setSound, updateDifficulty}) => (        
            <div className="settings-content-container">
                <h3 className="context-header">Game Settings</h3>
                <p>Adjust game difficulty and sound settings below.</p>
                <div>
                    <ButtonGroup className="mb-2" value={settings.difficulty} onChange={(val) => {updateDifficulty(val)}}>
                        <Button value='easy'>Easy</Button>
                        <Button value='medium'>Medium</Button>
                        <Button value='hard'>Hard</Button>
                    </ButtonGroup>
                </div>
                <div>
                    <BootstrapSwitchButton checked={sound} onlabel='Sound On' offlabel='Sound Off' onstyle="primary" offstyle="info" onChange={(checked) => {console.log(checked); setSound(checked)}}/>
                </div>
            </div>
        )}
    </GameContext.Consumer>
    )
}

export default SettingsContent;