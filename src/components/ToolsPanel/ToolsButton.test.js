/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import GameContext from '../../context/GameContext';
import ToolsButton from './ToolsButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

function renderGameContext(updateDisplayMode) {
    return render(
      <GameContext.Provider value={{updateDisplayMode: updateDisplayMode}}>
        <ToolsButton mode="settings" icon={<FontAwesomeIcon icon={faCog} />} selected={true} />
      </GameContext.Provider>
    );
  }
  
  test("test selected tools menu background color change", () => {
    renderGameContext((() => {}));
    expect(screen.getByTestId('tools-button')).toHaveClass(`selected`);
});
