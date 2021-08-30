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
                    <h3 className="context-header">Leaderboard</h3>
                    <ul>
                        <p><strong>EASY</strong> - {stats.easyLeader.score === -1 ? `No winners yet`: `${stats.easyLeader.player} in ${stats.easyLeader.score} seconds`}</p>
                        <p><strong>MEDIUM</strong> - {stats.mediumLeader.score === -1 ? `No winners yet`: `${stats.mediumLeader.player} in ${stats.mediumLeader.score} seconds`}</p>
                        <p><strong>HARD</strong> - {stats.hardLeader.score === -1 ? `No winners yet`: `${stats.hardLeader.player} in ${stats.hardLeader.score} seconds`}</p>
                    </ul>
                    <h3 className="context-header">Game Stats</h3>
                    <ul>
                        <p><strong>TOTAL GAMES PLAYED</strong> - {stats.gamesPlayed}</p>
                        <p><strong>TOTAL GAMES WON</strong> - {stats.gamesWon}</p>
                        <p><strong>PERCENTAGE WON</strong> - {getPercentage(stats.gamesWon, stats.gamesPlayed)}</p>
                    </ul>
                </div>
            )}
        </GameContext.Consumer>
    )
}

export default StatsContent;