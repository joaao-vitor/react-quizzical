import React from "react";
import './Answer.css'
import { decode } from 'html-entities'

export default function Answer(props) {
    return (
        <button className={
            `answer-btn ${!props.isFinished && props.selected ? 'selected' : ''}
            ${props.isFinished && props.isCorrect ? 'correct-answer' : ''}
            ${props.isFinished && props.selected && !props.isCorrect ? 'wrong-answer' : ''}
            `
        }
        disabled={props.isFinished}
        onClick={props.onClick}
        >{decode(props.text)}</button>
    )
}