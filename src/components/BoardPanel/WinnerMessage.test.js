/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import GameContext from '../../context/GameContext';
import WinnerMessage from './WinnerMessage';

function renderGameContext(context) {
    return render(
      <GameContext.Provider value={context}>
        <WinnerMessage  />
      </GameContext.Provider>
    );
  }
  
test("high score form shows on new lower time", () => {
    const context = {
        updateLeaders: () => {},
        updateGameStatus: () => {},
        gameTime: 5,
        stats: {easyLeader: {score: 10}},
        settings: {difficulty: 'easy'}
    }
    renderGameContext(context);
    expect(screen.getByTestId('high-score-form')).toBeInTheDocument();
});

test("high score form does not show on new longer time", () => {
    const context = {
        updateLeaders: () => {},
        updateGameStatus: () => {},
        gameTime: 15,
        stats: {easyLeader: {score: 10}},
        settings: {difficulty: 'easy'}
    }
    renderGameContext(context);
    expect(screen.queryByTestId('high-score-form')).not.toBeInTheDocument();
});