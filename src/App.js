//import React from "react";
import {useState} from 'react';

function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  let rowCount = 3;
  let colCount = 3;

  let rows = Array(rowCount);
  for (let i = 0; i < rowCount; i++)
  {
    let cols = Array(colCount);
    for (let j = 0; j < colCount; j++)
    {
      cols[j] = (<Square value={squares[i * colCount + j]} onSquareClick={() => handleClick(i * colCount + j)} />);

    }
    rows[i] = (<div className="board-row">
    {cols}
  </div>);
  }

  return (
    <>
    <div className="status">{status}</div>

    {rows}
    </>
  );
  }

  export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);   
    const [currentMove, setCurrentMove] = useState(0);
    const [isReverseOrder, setIsReverseOrder] = useState(false);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    function handlePlay(nextSquares) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
      setCurrentMove(nextMove);
    }
  
    const moves = history.map((squares, move) => {
      let description;
      if (move == history.length - 1){
        description = 'You are at move #' + move;
      } else if (move > 0) {
        description = 'Go to move #' + move;
      } else {
        description = 'Go to game start';
      }
      return (
        <li key={move}>
          {move == history.length - 1 ? description : <button onClick={() => jumpTo(move)}>{description}</button>}
        </li>
      );
    });

    function handleToggleClick()
    {
      setIsReverseOrder(!isReverseOrder);
    }

    return (
      <div className="game">
        <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
        <ol>{isReverseOrder ? moves.reverse() : moves}</ol>
        </div>
        <button onClick={handleToggleClick}>Toggle order</button>
      </div>
    );
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  