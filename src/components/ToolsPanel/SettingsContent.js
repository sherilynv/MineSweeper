import React, { useContext } from 'react';
import GameContext from '../../context/GameContext';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

const SettingsContent = () => {
    
    const contextData = useContext(GameContext);

    const onChangeDifficulty = (e) => {
        contextData.updateDifficulty(e.target.value);
    }

    return (
        <div className="settings-content-container">
            <h3 className="context-header">Game Settings</h3>
            <h6>DIFFICULTY</h6>
            <ul onChange={onChangeDifficulty}>
                <input type="radio" value="easy" name="gender" checked={contextData.settings.difficulty === 'easy' ? true : false} /> Easy
                <input type="radio" value="medium" name="gender" checked={contextData.settings.difficulty === 'medium' ? true : false} /> Medium
                <input type="radio" value="hard" name="gender" checked={contextData.settings.difficulty === 'hard' ? true : false} /> Hard
            </ul>
            <h6>SOUND</h6>
            <ul>
                <BootstrapSwitchButton checked={contextData.sound} onlabel='On' offlabel='Off' onstyle="primary" offstyle="info" onChange={(checked) => {contextData.setSound(checked)}}/>
            </ul>
        </div>
    )
}

export default SettingsContent;