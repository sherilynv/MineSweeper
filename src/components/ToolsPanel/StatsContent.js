import React from 'react';
import GameContext from '../../context/GameContext';

const StatsContent = () => {
    
    const getPercentage = (numerator, denominator) => {
        if (denominator <= 0) {
            return '0%';
        }
        return (((numerator/denominator)*100).toString().concat('%'));
    }

    return (
        <GameContext.Consumer>
            {({stats}) => (
                <div className="stats-content-container">
                    <h3 className="context-header">Game Stats</h3>
                    <ul>
                        <li><strong>LEADER</strong>: {stats.leader.score === -1 ? `No winners yet`: `${stats.leader.player} in ${stats.leader.score} seconds`}</li>
                        <li><strong>TOTAL GAMES PLAYED</strong>: {stats.gamesPlayed}</li>
                        <li><strong>TOTAL GAMES WON</strong>: {stats.gamesWon}</li>
                        <li><strong>PERCENTAGE WON</strong>: {getPercentage(stats.gamesWon, stats.gamesPlayed)}</li>
                    </ul>
                </div>
            )}
        </GameContext.Consumer>
    )
}

export default StatsContent;