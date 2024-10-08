import React from 'react'
import './style.scss'

export const Square = ({value, onSquareClick, isHighlight }) => {
    return (
        <button className={isHighlight ? "square highlight" : "square"} onClick={onSquareClick}>
            {value}
        </button>
    );
}
