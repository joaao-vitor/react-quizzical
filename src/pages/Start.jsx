import React, { useState } from "react";
import './Start.css';
import blobUp from '../assets/imgs/Start/blob up.png'
import blobDown from '../assets/imgs/Start/blob down.png'
import Modal from "../components/Modal";

export default function Start(props) {
    const [modalShown, setModalShown] = useState(false)
    const { setGameConfigs } = props

    return (
        <main className="start-container">
            {modalShown && <Modal setGameConfigs={setGameConfigs} setModalShown={setModalShown}/>}
            <div className="info">
                <h1 className="title">Quizzical</h1>
                <h3 className="description">Welcome, have fun!</h3>
                <button className="start-btn" onClick={() => setModalShown(true)}>Start Quiz</button>
            </div>
            <img src={blobUp} alt="" className="blob-up"></img>
            <img src={blobDown} alt="" className="blob-down"></img>
        </main>
    )
}