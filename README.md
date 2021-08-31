# MineSweeper
React Mine Sweeper game for Spekit coding challenge

## Live Demo
- Play live here: [https://limitless-stream-58486.herokuapp.com/]

## Local Installation
- Requirements: Node >=10.16, npm >=5.6
- Clone repository
- Install required node modules: run <pre>npm install</pre> from root project directory
- Run <pre>npm start</pre> to run locally on port 3000 - (http://localhost:3000)
- Run <pre>npm run test</pre> to run tests (see notes below)
- Run <pre>npm run coverage</pre> to see test coverage

### Testing Notes
- App currently only includes 4 simple tests to show the trajectory, testing with context
- Would like to build out more tests with additional time
- For this reason, current coverage is not wide, but will grow with additional tests

## Technologies Used
- Built from create-react-app as base
- Dev tool additions: eslint, react testing-library, plus plugin dependecies
- Prod tools: bootstrap & fontawesome modules for styling, react prop-types for data type validation, react-router-dom for routing, <a href="https://www.npmjs.com/package/use-sound">use-sound</a> for sound effect support
- sound effects downloaded from <a href="https://freesound.org/">Free Sound</a>
- (see package.json for full details)

## Project Requirements
- app uses ReactJS
- app re-builds <a href="http://minesweeperonline.com/">this site</a> from scratch... at least the intent of this site
- app is re-designed with personalized styling and fonts - with a nod to the Spekit mascot and color scheme ;)
- <a href="https://github.com/sherilynv/MineSweeper">GitHub repo link</a> included
- Hosted live <a href="https://limitless-stream-58486.herokuapp.com/">here</a>

### Features Included
- Left menu displays Settings, Stats and Controls
- Right menu for game reset, game clock, and remaining bomb counter
- Difficulty level adjustment - easy, medium, hard
- Sound adjusment - on/off
- Game stats - memory only (cleared on refresh)
- UI Controls - mobile and desktop controls for reveal, flag, unflag, reveal adjacent
- Auto expose for all squares adjacent to a revealed 0 value square
- Full board exposure on win or lose
- Red indicator for which bomb tripped loss
- High score capture with name entry for each level (currently stored in memory only)
- Stats - total games played, total games won, % games won
- Sound effects

### Features Not Yet Included
time did not allow for the following...
- customizable board size and mine count: code is set up to support this, just need to add UI to control state
- database connection: with more time would like to add a db connection or (minimally) a file write to save high scores over time... currently stored in memory and clears on refresh
- ability to use '?' markers
- display adjustments (e.g., dark mode)
- import/export game stats (though, not sure I would choose to add this)
- ad support

### Other Notes
- Simple About and 404 pages set up to show routing
- mobile responsiveness handled but could definitely use some more tweaking

### Improvement Next Steps
- some sluggishness on board map render... with more time, I would like to change how the board squares are rendering so that they re-render less often (via board-level class changes, etc.) - also want to continue looking for code optimization opportunities (The stepSquares and resetBoard functions in the Board component are the places I'd start first.)
- more thorough unit and application testing needs to be implemented
- re-consider state management options selected - GameContext is used heavily since so many components are inter-related - this might be causing some sluggishness in squares re-rendering more than necessary, need more time here
- currently utilizing site-wide App.css file for all styling... would want to localize some to specific components in re-factor
- Error handling and data type checking handled as I coded, but with more time, I would like to go through more thoroughly here
- noticed a couple of edge cases that are currently buggy - 1) bomb counter not accurate if user had flagged squares inaccurately then reveals adjacent that exposes these (should be straightforward... just ran out of time to handle), 2) sometimes reveal adjacent is a bit buggy when reavealing a square that was actually a bomb (usually triggers game loss, but not always... need to investigate with more time)
