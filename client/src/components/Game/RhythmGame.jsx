import React, { useState, useEffect, useRef } from 'react';
import '../../styles/RhythmGame.css';
import arrowUp from '../../assets/Game/arrow-up.webp';
import arrowDown from '../../assets/Game/arrow-down.webp';
import arrowLeft from '../../assets/Game/arrow-left.webp';
import arrowRight from '../../assets/Game/arrow-right.webp';
import { useTheme } from "../../context/ThemeContext";

const RhythmGame = () => {
    const [sequence, setSequence] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [coins, setCoins] = useState(0);
    const [validationMessage, setValidationMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [validatedSteps, setValidatedSteps] = useState(new Set());
    const [isSuccess, setIsSuccess] = useState(false);
    const [transparentArrows, setTransparentArrows] = useState(new Set());
    const [audio, setAudio] = useState(null);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [messagePosition, setMessagePosition] = useState({ top: '50%', left: '50%' });
    const [countdown, setCountdown] = useState(null);
    const [musicDuration, setMusicDuration] = useState(0);
    const gameAreaRef = useRef(null);
    const intervalRef = useRef(null);

    const playerName = "Joueur 1";

    const { isDark } = useTheme();
    const textColor = isDark ? "text-white" : "text-black";

    useEffect(() => {
        fetch('http://localhost:8000/api/random-track')
            .then(response => response.json())
            .then(data => {
                if (data && data.filePath) {
                    const audioFile = new Audio(`http://localhost:8000${data.filePath}`);
                    setAudio(audioFile);

                    audioFile.onloadedmetadata = () => {
                        setMusicDuration(audioFile.duration);
                    };
                } else {
                    console.error('Erreur : aucun fichier audio trouvé.');
                }
            })
            .catch(error => console.error('Erreur lors du chargement de la musique:', error));
    }, []);

    const startGameAndMusic = () => {
        let countdownValue = 3;
        setCountdown(countdownValue);

        const countdownInterval = setInterval(() => {
            countdownValue -= 1;
            setCountdown(countdownValue);

            if (countdownValue === 0) {
                clearInterval(countdownInterval);
                setCountdown(null);
                if (audio) {
                    audio.play().then(() => {
                        setIsGameStarted(true);

                        const arrowFrequency = 2;
                        const numberOfArrows = Math.floor(musicDuration / arrowFrequency);
                        const generatedSequence = generateSequence(numberOfArrows);

                        setSequence(generatedSequence);

                        intervalRef.current = setInterval(() => {
                            setCurrentStep((prevStep) => {
                                if (prevStep < generatedSequence.length) {
                                    return prevStep + 1;
                                } else {
                                    clearInterval(intervalRef.current);
                                    if (audio) {
                                        audio.pause();
                                        audio.currentTime = 0;
                                    }
                                    return prevStep;
                                }
                            });
                        }, arrowFrequency * 1000);
                    }).catch(error => console.error('Erreur lors de la lecture de la musique:', error));
                }
            }
        }, 1000);
    };

    const generateSequence = (length) => {
        const directions = ['up', 'down', 'left', 'right'];
        const sequence = [];
        for (let i = 0; i < length; i++) {
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];
            sequence.push(randomDirection);
        }
        return sequence;
    };

    const getRandomPosition = () => {
        const gameArea = gameAreaRef.current;
        const messageWidth = 200;
        const messageHeight = 50;

        if (gameArea) {
            const maxTop = gameArea.clientHeight - messageHeight;
            const maxLeft = gameArea.clientWidth - messageWidth;

            const top = Math.floor(Math.random() * maxTop);
            const left = Math.floor(Math.random() * maxLeft);

            return { top: `${top}px`, left: `${left}px` };
        }

        return { top: '50%', left: '50%' };
    };

    const handleKeyPress = (key) => {
        if (validatedSteps.has(currentStep)) return;

        const expectedKey = sequence[currentStep - 1];
        const arrowElement = document.querySelector(`.arrow-${expectedKey}`);
        const targetElement = document.querySelector(`.validation-zone-${expectedKey}`);

        if (expectedKey === key) {
            if (isArrowInZone(arrowElement, targetElement)) {
                setScore(prevScore => {
                    const newScore = prevScore + 1;
                    const newCoins = Math.floor(newScore / 20);
                    setCoins(newCoins);

                    if (newCoins >= 30) {
                        setSuccessMessage(`Félicitations ! Vous avez atteint l'objectif de(s) ${newCoins} MusiCoins!`);
                        stopGame();
                        setTimeout(() => {
                            setSuccessMessage(null);
                            resetGame();
                        }, 3000);
                    }

                    return newScore;
                });
                setIsSuccess(true);
                setValidationMessage('PERFECT!');
                setMessagePosition(getRandomPosition());
                setValidatedSteps(new Set(validatedSteps).add(currentStep));
                setTransparentArrows(new Set(transparentArrows).add(currentStep - 1));
            } else {
                handleMiss();
            }
        } else {
            handleMiss();
        }

        setTimeout(() => setValidationMessage(null), 1000);
    };

    const handleMiss = () => {
        setIsSuccess(false);
        setValidationMessage('MISS');
        setMessagePosition(getRandomPosition());
        setValidatedSteps(new Set(validatedSteps).add(currentStep));
        setTransparentArrows(new Set(transparentArrows).add(currentStep - 1));
    };

    const isArrowInZone = (arrow, zone) => {
        const arrowRect = arrow.getBoundingClientRect();
        const zoneRect = zone.getBoundingClientRect();

        return (
            arrowRect.bottom >= zoneRect.top &&
            arrowRect.top <= zoneRect.bottom &&
            arrowRect.right >= zoneRect.left &&
            arrowRect.left <= zoneRect.right
        );
    };

    const stopGame = () => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        clearInterval(intervalRef.current);
        setIsGameStarted(false);
    };

    const resetGame = () => {
        setSequence([]);
        setCurrentStep(0);
        setScore(0);
        setCoins(0);
        setValidationMessage(null);
        setValidatedSteps(new Set());
        setIsSuccess(false);
        setTransparentArrows(new Set());
        setIsGameStarted(false);
        setMessagePosition({ top: '50%', left: '50%' });
        setCountdown(null);
        setMusicDuration(0);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'ArrowRight':
                    e.preventDefault();
                    handleKeyPress(e.key.replace('Arrow', '').toLowerCase());
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentStep, sequence, validatedSteps]);

    return (
        <div className="game-container" role="main" aria-label="Jeu de rythme">
            <h1 className={`text-3xl md:text-5xl ${textColor}`} aria-label="Titre du jeu">EpiGame</h1>
            {!isGameStarted && (
                <button onClick={startGameAndMusic} className="start-button" aria-label="Démarrer le jeu">
                    Jouez
                </button>
            )}
            {successMessage && (
                <div className="success-message" aria-live="polite">
                    {successMessage}
                </div>
            )}
            <div className="game-content">
                <div className="player-info-container">
                    <div className="player-name" aria-label="Nom du joueur">{playerName}</div>
                </div>
                <div className="game-area" ref={gameAreaRef} aria-label="Zone de jeu">
                    {countdown !== null && (
                        <div className="countdown" aria-live="assertive">{countdown}</div>
                    )}
                    {validationMessage && (
                        <div
                            className={`validation-message ${isSuccess ? 'success' : 'miss'}`}
                            style={{ top: messagePosition.top, left: messagePosition.left }}
                            aria-live="polite"
                        >
                            {validationMessage}
                        </div>
                    )}
                    <div className="arrow-targets" aria-label="Zones de validation">
                        <div className="arrow-column">
                            <div className="validation-zone validation-zone-left" aria-label="Zone de validation gauche"></div>
                            <img src={arrowLeft} alt="Flèche gauche" className="fixed-arrow"/>
                        </div>
                        <div className="arrow-column">
                            <div className="validation-zone validation-zone-down" aria-label="Zone de validation bas"></div>
                            <img src={arrowDown} alt="Flèche bas" className="fixed-arrow"/>
                        </div>
                        <div className="arrow-column">
                            <div className="validation-zone validation-zone-up" aria-label="Zone de validation haut"></div>
                            <img src={arrowUp} alt="Flèche haut" className="fixed-arrow"/>
                        </div>
                        <div className="arrow-column">
                            <div className="validation-zone validation-zone-right" aria-label="Zone de validation droite"></div>
                            <img src={arrowRight} alt="Flèche droite" className="fixed-arrow"/>
                        </div>
                    </div>
                    <div className="arrows" aria-label="Flèche actuelle">
                        {sequence[currentStep - 1] && (
                            <Arrow key={currentStep - 1} direction={sequence[currentStep - 1]}
                                   isTransparent={transparentArrows.has(currentStep - 1)}/>
                        )}
                    </div>
                </div>
                <div className="score-container" aria-label="Score actuel">
                    <div className="score">Score : {score}</div>
                </div>
            </div>
        </div>
    );
};

const Arrow = ({ direction, isTransparent }) => {
    const arrowMap = {
        up: arrowUp,
        down: arrowDown,
        left: arrowLeft,
        right: arrowRight,
    };

    return (
        <div className={`arrow arrow-${direction} ${isTransparent ? 'transparent' : ''}`}>
            <img src={arrowMap[direction]} alt={`${direction} arrow`} />
        </div>
    );
};

export default RhythmGame;