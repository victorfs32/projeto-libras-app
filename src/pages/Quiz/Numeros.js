import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Quiz.css"; // CSS
import successSound from "./Path/success-sound.mp3";
import errorSound from "./Path/error-sound.mp3";

// Importar os vídeos
import video1 from "./videos/NUMEROS/01.mp4";
import video2 from "./videos/NUMEROS/02.mp4";
// Continue com o restante dos vídeos...

const createQuestion = (text, video, answers) => ({
  questionText: text,
  videoSrc: video,
  answerOptions: answers,
});

// Lista de perguntas
const questions = [
  createQuestion("Que número é esse?", video1, [
    { answerText: "36", isCorrect: false },
    { answerText: "3", isCorrect: true },
    { answerText: "1", isCorrect: false },
    { answerText: "7", isCorrect: false },
  ]),
  createQuestion("Que número é esse?", video2, [
    { answerText: "2", isCorrect: true },
    { answerText: "6", isCorrect: false },
    { answerText: "4", isCorrect: false },
    { answerText: "9", isCorrect: false },
  ]),
  // Continue com o restante das perguntas...
];

function Numeros() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [rankingPosition, setRankingPosition] = useState(null);
  const intervalRef = useRef(null);
  const videoRef = useRef(null);
  const location = useLocation();
  const userName = location.state?.userName || "Usuário";

  const successAudio = useRef(new Audio(successSound));
  const errorAudio = useRef(new Audio(errorSound));

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (showScore) {
      // Atualiza a posição no ranking após mostrar a pontuação
      const position = getRankingPosition();
      setRankingPosition(position);
    }
  }, [showScore]);

  const playSound = (audioRef) => {
    audioRef.current.play();
  };

  const handleAnswerOptionClick = (isCorrect, index) => {
    setSelectedAnswerIndex(index);

    if (isCorrect) {
      setScore(score + 1);
      playSound(successAudio);
    } else {
      playSound(errorAudio);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
        setSelectedAnswerIndex(null);
        setCurrentQuestion(nextQuestion);
      } else {
        clearInterval(intervalRef.current);
        setShowScore(true);
        saveScore(userName, score, elapsedTime);
      }
    }, 100);
  };

  const saveScore = (userName, score, timeTaken) => {
    const storedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    const newScore = { userName, score, timeTaken };
    storedScores.push(newScore);
    localStorage.setItem("quizScores", JSON.stringify(storedScores));
  };

  const getRankingPosition = () => {
    const storedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    const sortedScores = storedScores.sort(
      (a, b) => b.score - a.score || a.timeTaken - b.timeTaken
    );
    return (
      sortedScores.findIndex(
        (entry) =>
          entry.userName === userName &&
          entry.score === score &&
          entry.timeTaken === elapsedTime
      ) + 1
    );
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="quiz">
      {showScore ? (
        <div className="score-section">
          <h2>
            {userName}, Parabéns! Você acertou {score} de {questions.length}{" "}
            perguntas!
          </h2>
          <p>Você completou o quiz em {formatTime(elapsedTime)}.</p>
          <p>
            Sua posição no ranking é:{" "}
            {rankingPosition !== null ? rankingPosition : "Carregando..."}
          </p>
          <Link to="/" className="return-button">
            Voltar para a página inicial
          </Link>
          <Link to="/Ranking" className="ranking-button">
            Ver Ranking
          </Link>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Pergunta {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
            <div className="video-container">
              <video ref={videoRef} width="100%" height="315" controls>
                <source
                  src={questions[currentQuestion].videoSrc}
                  type="video/mp4"
                />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
            <div className="timer">
              <span>Tempo Decorrido: {formatTime(elapsedTime)}</span>
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map(
              (answerOption, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswerOptionClick(answerOption.isCorrect, index)
                  }
                  style={{
                    backgroundColor:
                      selectedAnswerIndex === index
                        ? answerOption.isCorrect
                          ? "green"
                          : "red"
                        : "",
                    color: selectedAnswerIndex === index ? "white" : "",
                  }}
                  disabled={selectedAnswerIndex !== null}
                >
                  {answerOption.answerText}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Numeros;
