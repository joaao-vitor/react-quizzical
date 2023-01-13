import React from "react";
import { useState, useEffect } from "react";
import Question from "../components/Question";
import { v4 as uuid } from 'uuid';
import './Game.css';
import blobUp from '../assets/imgs/Game/blob up.png'
import blobDown from '../assets/imgs/Game/blob down.png'


export default function Game(props) {
    const { gameConfigs } = props;

    const [gameQuestions, setGameQuestions] = useState([]);
    const [questionsElements, setQuestionElements] = useState([])
    const [gameStats, setGameStats] = useState({
        generateNewQuestions: true,
        finished: false,
        score: 0
    })
    const [selectedAns, setSelectedAns] = useState({})

    function shuffleAnswers(answers) {
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return answers
    }

    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=${gameConfigs.numQuestions}&category=${gameConfigs.category}&difficulty=${gameConfigs.difficulty.toLowerCase()}`)
            .then(res => res.json())
            .then(data => data.results)
            .then(questions => questions.map(question => (
                {
                    id: uuid(),
                    ...question,
                    answers: [
                        question.correct_answer, ...question.incorrect_answers
                    ].map(ans => (
                        {
                            id: uuid(),
                            text: ans,
                            isCorrect: (ans === question['correct_answer'])
                        }
                    ))
                }
            )))
            .then(questions => {
                return questions.map(question => ({ ...question, answers: shuffleAnswers(question.answers) }))
            })
            .then(questions => setGameQuestions(questions))
    }, [gameConfigs, gameStats.generateNewQuestions])

    useEffect(() => {
        setQuestionElements(gameQuestions.map(question => {
            return <Question
                key={question.id}
                id={question.id}
                question={question.question}
                wrongAnswers={question['incorrect_answers']}
                answers={question.answers}
                isFinished={gameStats.finished}
                changeSelectedAns={changeSelectedAns}
            />
        }))
    }, [gameQuestions, gameStats.finished])

    function changeSelectedAns(questId, ansId) {
        setSelectedAns(prev => {
            return { ...prev, [questId]: ansId }
        })
    }

    function finishGame() {
        if (!gameStats.finished) {
            let score = gameQuestions.reduce((prevCount, actualQuestion) => {
                const questId = actualQuestion.id
                actualQuestion.answers.forEach(ans => {
                    if (ans.isCorrect && selectedAns[questId] === ans.id) {
                        prevCount++
                    }
                })
                return prevCount
            }, 0)
            setGameStats(prevGameStats => ({ ...prevGameStats, score, finished: true }))
        } else {
            setGameStats(prevGameStats => ({ ...prevGameStats, generateNewQuestions: !prevGameStats.generateNewQuestions, score: 0, finished: false }))
        }
    }

    return (
        <main className="main-container">
            {(gameQuestions.length && (
                <div className="game-container">
                    {questionsElements}

                    <div className="game-footer">
                        {gameStats.finished && <h3 className="game-score">You scored {gameStats.score}/{gameConfigs.numQuestions} correct answers!</h3>}
                        <button className="game-btn" onClick={finishGame}>{gameStats.finished ? 'Play Again!' : 'Check your answers'}</button>
                    </div>
                </div>
                )
            )}
            {!gameQuestions.length && <h3>Loading questions...</h3>}
            <img src={blobUp} alt="" className="blob-up"></img>
            <img src={blobDown} alt="" className="blob-down"></img>
        </main>
    )
}