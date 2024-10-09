import React, { useState } from 'react'
import { Board } from '../Board/Board';
import './style.scss'

export const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    const [isSortAsc, setIsSortAsc] = useState(true);
    const [location, setLocation] = useState([-1]);
  
    function handlePlay(nextSquares, index) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      const nextLocation = [...location.slice(0, currentMove + 1), index];
      setLocation(nextLocation)
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    }
  
    function jumpTo(nextMove) {
      setCurrentMove(nextMove);
    }

    const getRowAndColumnFromPosition = (position, columns) => {
      console.log(position)
      console.log(columns)
      const row = Math.floor(position / columns);  // Tính dòng
      const column = position % columns;           // Tính cột
      return { row, column };
    }
    
    const moves = history.map((squares, move) => {
      let description;
      if (move > 0) {
        description = 'Go to move #' + move;
      } 
      else {
        description = 'Go to game start';
      }

      const locateX = getRowAndColumnFromPosition(location[move],3).row;
      const locateY = getRowAndColumnFromPosition(location[move],3).column;
      const stringLocated = ` (${locateX}, ${locateY})`
      
      if(move == currentMove && move > 0){
        return (
            <li key={move}>
              <h4 onClick={() => jumpTo(move)}>You are at move #{move} {stringLocated}</h4>
            </li>
        );
      }

      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}  {move <= 0 ? "" : stringLocated}</button>
        </li>
      );
    });

    const sortMoves = isSortAsc ? moves  : moves.reverse();

    function toggleSort() {
      setIsSortAsc(!isSortAsc);
    }
  
    return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{sortMoves}</ol>
        </div>
        <div className="game-sort">
          <button onClick={() => toggleSort()}>{isSortAsc ? "Sort Asc" : "Sort Desc"}</button>
        </div>
      </div>
    );
}
