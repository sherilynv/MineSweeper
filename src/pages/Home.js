import React, {useState} from 'react';
import Tools from '../components/Tools';
import Board from '../components/Board';
import Progress from '../components/Progress';
import GameContext from '../context/GameContext';

const GamePage = () => {
    
    // State for game settings, stats, display and current game data
    const [settings, setSettings] = useState({difficulty: 'easy', boardSize: [10,10], totalBombs: 15, sound: true});
    const [sound, setSound] = useState(true);
    const [stats, setStats] = useState({leader: {player: 'No Leader Yet', score: 0}, gamesPlayed: 0, gamesWon: 0});
    const [display, setDisplay] = useState({mode: 'game'});
    const [currentGame, setCurrentGame] = useState({bombsRemaining: 0, status: 'welcome'});

    // Handle display mode updates between game and tools screens
    const updateDisplayMode = (newMode) => {
        setDisplay({mode: newMode});
    }
    
    // Handle stats updates
    const checkLeaderboard = (player, score) => { // player is string, score is number
        if (stats.leader.score < score) {
            let tempStats = stats;
            tempStats.leader = {player: player, score: score};
            setStats(tempStats);
            return true;
        } 
        return false;
    }
    const addGamePlayed = (didWin) => { // didWin is bool
        let tempStats = stats;
        tempStats.gamesPlayed++;
        {didWin && tempStats.gamesWon++}
        setStats(tempStats);
    }

    // Handle settings updates
    const updateDifficulty = (newDifficulty) => {
        switch(newDifficulty) {
            case 'easy':
                setSettings({difficulty: 'easy', boardSize: [10,10], totalBombs: 15, sound: settings.sound});
                break;
            case 'medium':
                setSettings({difficulty: 'medium', boardSize: [15,15], totalBombs: 35, sound: settings.sound});
                break;
            case 'hard':
                setSettings({difficulty: 'hard', boardSize: [20,20], totalBombs: 70, sound: settings.sound});
                break;
        }
    }

    // Handle currentGame state updates
    const updateBombs = (direction) => { // direction is 'increment' or 'decrement' bombsReamining for current game
        if (direction === 'increment') { 
            setCurrentGame({status: currentGame.status, bombsRemaining: currentGame.bombsRemaining + 1});
        } else if (direction === 'decrement') {
            setCurrentGame({status: currentGame.status, bombsRemaining: currentGame.bombsRemaining - 1});
        }
    }
    const updateGameStatus = (newStatus) => {
        let bombsR;
        {newStatus === 'start' ?  bombsR = settings.totalBombs : bombsR = currentGame.bombsRemaining}
        setCurrentGame({status: newStatus, bombsRemaining: bombsR});
    }

    // data to be passed to components via GameContext context hook
    const contextData = {
        settings: settings,
        sound: sound,
        stats: stats, 
        display: display,
        currentGame: currentGame,
        updateDisplayMode: updateDisplayMode,
        checkLeaderboard: checkLeaderboard,
        addGamePlayed: addGamePlayed,
        setSound: setSound,
        updateDifficulty: updateDifficulty,
        updateBombs: updateBombs,
        updateGameStatus: updateGameStatus
    }
    
    return (
        <GameContext.Provider value={contextData}>
            <div id="game-page-container"> 
                <Tools />
                <Board />
                <Progress />           
            </div>
        </GameContext.Provider>
    )
}

export default GamePage;