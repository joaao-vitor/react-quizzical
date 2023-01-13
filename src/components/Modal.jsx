import React, { useState } from "react";
import { useEffect } from "react";
import './Modal.css'

export default function Modal(props) {
    const difficulties = ['Random', 'Easy', 'Normal', 'Hard']
    const nums = [5, 10, 15]
    const {setGameConfigs, setModalShown} = props

    const [categories, setCategories] = useState([])
    const [diff, setDiff] = useState('Random')
    const [categorySelected, setCategorySelected] = useState(0)
    const [numQuestions, setNumQuestions] = useState(5)

    useEffect(() => {
        loadCategories()
    }, [])

    function loadCategories() {
        fetch('https://opentdb.com/api_category.php')
            .then(res => res.json())
            .then(categories => categories.trivia_categories)
            .then(categories => setCategories(categories))
    }

    function renderDifficulties() {
        return difficulties.map(difficulty => {
            return (
                <div className="difficulty" key={difficulty}>
                    <input
                        id={`diff-${difficulty}`}
                        checked={difficulty === diff}
                        type="checkbox"
                        onChange={() => setDiff(difficulty)}
                    />
                    <label htmlFor={`diff-${difficulty}`} className="diff-level">{difficulty}</label>
                </div>
            )
        })
    }
    function renderCategories() {
        return categories.map(category => {
            return (
                <button
                    key={category.id}
                    onClick={() => setCategorySelected(category.id)}
                    className={categorySelected === category.id ? 'selected' : ''}
                >{category.name}</button>
            )
        })
    }

    function renderSelectQuestions() {
        return (

            <select 
                name="number-questions" 
                id="number-questions"
                value={numQuestions}
                onChange={(e) => setNumQuestions(+e.target.value)}
            >
                {renderOptionsQuestions()}
            </select>
        )
    }

    function renderOptionsQuestions() {
        return nums.map(num => <option key={num} value={num}>{num}</option>)
    }

    function startGame(){
        setGameConfigs(prev => ({
            ...prev,
            category: categorySelected,
            numQuestions,
            difficulty: diff === 'Random' ? '' : diff,
            started: true
        }))
    }

    function resetGame(){
        setGameConfigs({
            started: false,
            difficulty: 'Random',
            numQuestions: 5,
            category: 0
        })
        setModalShown(false)
    }

    return (
        <div className="modal-container">
            <section className="options-section">
                <h2 className="options-title">
                    Create a Game!
                </h2>
                <h4 className="options-subtitle">
                    Configure your game as whatever you want.
                </h4>
            </section>

            <section className="config-section">
                <div className="difficulties">
                    <h4>choose the difficulty</h4>
                    {renderDifficulties()}
                </div>
                <div className="questions-number">
                    <h4>choose the number of questions</h4>
                    {renderSelectQuestions()}
                </div>
                <div className="categories">
                    <h4>choose a category</h4>
                    <div className="categories-container">
                        {renderCategories()}
                    </div>
                </div>
                <div className="options-btn-group">
                    <button className="back" onClick={resetGame}>Back</button>
                    <button className="start" onClick={() => startGame()}>Start</button>
                </div>
            </section>

        </div>
    )
}