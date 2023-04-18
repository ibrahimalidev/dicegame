export default function StartGame({ setGameStatus }) {
  return (
    <div className="flex justify-center items-center py-auto">
      <button
        onClick={(e) => setGameStatus(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Start game
      </button>
    </div>
  );
}
