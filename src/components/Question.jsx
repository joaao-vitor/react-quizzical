import React, { useState } from "react";
import Answer from './Answer'
import './Question.css'
import { decode } from 'html-entities'

export default function Question(props) {
    const [ansSelected, setAnsSelected] = useState()
    const { changeSelectedAns, id } = props;
    

    function selectAns(ansId) {
        setAnsSelected(ansId)
        changeSelectedAns(id, ansId)
    }


    function renderAnswers() {
        let {answers} = props
        return answers.map(ans => {
            return (
                <Answer
                    key={ans.id}
                    id={ans.id}
                    text={ans.text}
                    selected={ans.id === ansSelected}
                    isCorrect={ans.isCorrect}
                    isFinished={props.isFinished}
                    onClick={() => selectAns(ans.id)}
                />
            )
        })
    }

    return (
        <div className="question-container">
            <h2 className="question">{decode(props.question)}</h2>
            <div className="group-btn">
                {renderAnswers()}
            </div>
            <hr />
        </div>
    )
}