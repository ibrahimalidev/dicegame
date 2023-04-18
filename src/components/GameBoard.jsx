import { useEffect } from "react";
import { useState } from "react";

export default function GameBoard() {
  const [numbers, setNumbers] = useState([
    { id: 1, value: 1, active: true, selected: false },
    { id: 2, value: 2, active: true, selected: false },
    { id: 3, value: 3, active: true, selected: false },
    { id: 4, value: 4, active: true, selected: false },
    { id: 5, value: 5, active: true, selected: false },
    { id: 6, value: 6, active: true, selected: false },
    { id: 7, value: 7, active: true, selected: false },
    { id: 8, value: 8, active: true, selected: false },
    { id: 9, value: 9, active: true, selected: false },
  ]);
  const [dice1, setDice1] = useState(0);
  const [dice2, setDice2] = useState(0);
  const [sumDices, setSumDices] = useState(0);
  const [rollActive, setRollActive] = useState(true);
  const [selectedNumbers, setSelectedNumbers] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);

  const rollDice = () => {
    setActiveAll();
    setSelectedNumbers(0);
    setRollActive(false);
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    setDice1(dice1);
    setDice2(dice2);
    setSumDices(dice1 + dice2);
    checkNumbers(dice1 + dice2);
  };

  const handleSelectNumber = (id, value, sN, sD) => {
    let s = selectedNumbers + value;
    let newNumbers = [...numbers];
    newNumbers.map((number) => {
      if (number.id === id) {
        number.selected = true;
        number.active = false;
      }
    });
    setNumbers(newNumbers);
    setSelectedNumbers(s);
    checkNumbers(sD, s);
  };

  const checkNumbers = (diceSum = 0, sN = 0) => {
    if (diceSum === 0) return;
    let newNumbers = [...numbers];
    newNumbers.map((number) => {
      if (sN + number.value > diceSum) {
        number.active = false;
      }
    });

    let activeNumbers = newNumbers.filter((number) => number.active);
    let selectedNumbers = newNumbers.filter((number) => number.selected);

    if (sN === diceSum && selectedNumbers.length < 9) {
      setRollActive(true);
    } else if (activeNumbers.length === 0) {
      setGameOver(true);
      return;
    } else if (selectedNumbers.length === 9) {
      setGameWin(true);
      return;
    }
    setNumbers(newNumbers);
  };

  const setActiveAll = () => {
    let newNumbers = [...numbers];
    newNumbers.map((number) => {
      if (!number.selected) {
        number.active = true;
      }
    });
    setNumbers(newNumbers);
  };

  const handleReset = () => {
    setNumbers([
      { id: 1, value: 1, active: true, selected: false },
      { id: 2, value: 2, active: true, selected: false },
      { id: 3, value: 3, active: true, selected: false },
      { id: 4, value: 4, active: true, selected: false },
      { id: 5, value: 5, active: true, selected: false },
      { id: 6, value: 6, active: true, selected: false },
      { id: 7, value: 7, active: true, selected: false },
      { id: 8, value: 8, active: true, selected: false },
      { id: 9, value: 9, active: true, selected: false },
    ]);

    setDice1(0);
    setDice2(0);
    setSumDices(0);
    setRollActive(true);
    setSelectedNumbers(0);
    setGameOver(false);
  };

  useEffect(() => {
    checkNumbers(0);
  }, [sumDices]);

  return (
    <div className="bg-slate-950 text-white">
      <div className="flex justify-center">
        {numbers.map((number) => {
          return (
            <button
              key={number.id}
              onClick={() =>
                handleSelectNumber(
                  number.id,
                  number.value,
                  selectedNumbers,
                  sumDices
                )
              }
              className={`${
                number.selected
                  ? "bg-gray-600 opacity-0"
                  : number.active
                  ? ""
                  : "opacity-20"
              } w-20 h-20 m-2 text-center text-4xl border border-red-300 flex items-center justify-center`}
              disabled={number.selected || rollActive || !number.active}
            >
              {number.value}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-xl ${
            !rollActive ? "opacity-20" : ""
          }`}
          onClick={rollDice}
          disabled={!rollActive}
        >
          Roll
        </button>

        <button
          className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full text-xl ml-2`}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div className="flex justify-center flex-col items-center">
        <p className="text-4xl">Dice 1: {dice1}</p>
        <br></br>
        <p className="text-4xl">Dice 2: {dice2}</p>
        <br></br>
        <p className="text-4xl">Sum dices: {sumDices}</p>
      </div>

      {gameOver && (
        <div className="flex justify-center mt-5 flex-col items-center gap-y-5">
          <p className="text-4xl italic">Game Over</p>
          <button
            className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full text-xl ml-2`}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      )}

      {gameWin && (
        <div className="flex justify-center mt-5 flex-col items-center gap-y-5">
          <p className="text-4xl italic bold">Game Over, you win!</p>
          <button
            className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full text-xl ml-2`}
            onClick={handleReset}
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
