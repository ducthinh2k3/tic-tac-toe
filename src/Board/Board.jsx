import React from 'react'
import { Square } from '../Square/Square';
import './style.scss'

export const Board = ({ xIsNext, squares, onPlay }) => {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares, i);
    }

    const isFull = squares.every(square => square !== null);

    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                line: lines[i]
            }
          }
        }
        return null;
    }

    const result = calculateWinner(squares);
    let status;

    if (result && result.winner) {
        status = 'Winner: ' + result.winner;
    } else if (isFull){
        status = 'Draw';
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    const renderSquare = (i, isHighlight) => {
        console.log(isHighlight)
        return (
            <Square value={squares[i]} onSquareClick={() => handleClick(i)} isHighlight={isHighlight} />
        );
    }

    const renderBoard = (line) => {
        const sizeBoard = 3;
        let board = [];
        console.log("Line value: ", line); 
        for(let i = 0; i<sizeBoard; i++){
            let squareInRow = []
            for(let j = 0; j<sizeBoard; j++){
                if(line && line.includes(i*sizeBoard+j)){  
                    console.log("Highlighting square:", i*sizeBoard+j); 
                    squareInRow.push(renderSquare(i*sizeBoard+j, true))
                } else {

                    squareInRow.push(renderSquare(i*sizeBoard+j, false))
                }
            }
            board.push(
                <div className="board-row">
                    {squareInRow}
                </div>
            )
        }
        return board;
    }

    return (
    <>
        <div className="status">{status}</div>
        {renderBoard(result?.line)}
    </>
    ); 
}
