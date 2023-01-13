import { useState } from 'react';
import './App.css';
import Game from './pages/Game';
import Start from './pages/Start';

function App() {
	const [gameConfigs, setGameConfigs] = useState({
		started: false,
		difficulty: 'Random',
		numQuestions: 5,
		category: 0
	})

	function toggleStarted(){
		setGameConfigs(prevGameConfigs => ({...prevGameConfigs, started: !prevGameConfigs.started}));
	}

	return (
		<div className="App">
			{!gameConfigs.started && <Start start={toggleStarted} setGameConfigs={setGameConfigs}/>}
			{gameConfigs.started && <Game gameConfigs={gameConfigs} />}
		</div>
	);
}

export default App;
