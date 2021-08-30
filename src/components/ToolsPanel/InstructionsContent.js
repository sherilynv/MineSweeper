import React from 'react';

const InstructionsContent = () => {
    
    return (
        <div className="instructions-content-container">
            <h3 className="context-header">Game Instructions</h3>
                <h5>Desktop</h5>
                    <ul>
                        <li>Left-click an empty square to reveal it.</li>
                        <li>Right-click an empty square to flag it.</li>
                        <li>Right-click a revealed square to reveal its adjacent squares.</li>
                    </ul>
                <h5>Mobile</h5>
                    <ul>
                        <li>Tap an empty square to reveal it.</li>
                        <li>Long-press an empty square to flag it.</li>
                        <li>Long-press a revealed square to reveal its adjacent squares.</li>
                    </ul>
        </div>
    )
}

export default InstructionsContent;