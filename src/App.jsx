import React from "react";

import GameBoard from "./components/GameBoard";
import Welcome from "./components/Welcome";
export default function App() {
  const [gameStatus, setGameStatus] = React.useState(false);
  return (
    <div className="App container mx-auto">
      <header className="App-header">
        <h1 className="text-white text-2xl text-center py-2">Dice Game</h1>
      </header>
      <main>
        {gameStatus ? <GameBoard /> : <Welcome setGameStatus={setGameStatus} />}
      </main>
    </div>
  );
}
