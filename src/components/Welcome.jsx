export default function Welcome({ setGameStatus }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl text-white pb-2">Welcome to Dice Game</h1>
      <button
        onClick={(e) => setGameStatus(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Start Game
      </button>
    </div>
  );
}
