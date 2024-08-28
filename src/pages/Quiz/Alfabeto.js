import React, { useState, useRef, useEffect } from "react";
import "./Quiz.css"; // CSS
import { useLocation, Link } from "react-router-dom";
import video1 from "./videos/ABC/01.mp4";
import video2 from "./videos/ABC/02.mp4";
import video3 from "./videos/ABC/03.mp4";
import video4 from "./videos/ABC/04.mp4";
import video5 from "./videos/ABC/05.mp4";
import video6 from "./videos/ABC/06.mp4";
import video7 from "./videos/ABC/07.mp4";
import video8 from "./videos/ABC/08.mp4";
import video9 from "./videos/ABC/09.mp4";
import video10 from "./videos/ABC/10.mp4";
import video11 from "./videos/ABC/11.mp4";
import video12 from "./videos/ABC/12.mp4";
import video13 from "./videos/ABC/13.mp4";
import video14 from "./videos/ABC/14.mp4";
import video15 from "./videos/ABC/15.mp4";
import video16 from "./videos/ABC/16.mp4";
import video17 from "./videos/ABC/17.mp4";
import video18 from "./videos/ABC/18.mp4";
import video19 from "./videos/ABC/19.mp4";
import video20 from "./videos/ABC/20.mp4";
import video21 from "./videos/ABC/21.mp4";
import video22 from "./videos/ABC/22.mp4";
import video23 from "./videos/ABC/23.mp4";
import video24 from "./videos/ABC/24.mp4";
import video25 from "./videos/ABC/25.mp4";
import video26 from "./videos/ABC/26.mp4";
import video27 from "./videos/ABC/27.mp4";
import successSound from "./Path/success-sound.mp3";
import errorSound from "./Path/error-sound.mp3";

const videos = [
  video1,
  video2,
  video3,
  video4,
  video5,
  video6,
  video7,
  video8,
  video9,
  video10,
  video11,
  video12,
  video13,
  video14,
  video15,
  video16,
  video17,
  video18,
  video19,
  video20,
  video21,
  video22,
  video23,
  video24,
  video25,
  video26,
  video27,
];

const createQuestion = (text, video, answers) => ({
  questionText: text,
  videoSrc: video,
  answerOptions: answers.sort(() => Math.random() - 0.5), // Embaralha as opções de resposta
});

const questions = [
  createQuestion("Qual a letra?", video1, [
    { answerText: "E", isCorrect: false },
    { answerText: "S", isCorrect: true },
    { answerText: "P", isCorrect: false },
    { answerText: "Q", isCorrect: false },
  ]),
  createQuestion("Qual a letra?", video2, [
    { answerText: "T", isCorrect: true },
    { answerText: "O", isCorrect: false },
    { answerText: "F", isCorrect: false },
    { answerText: "E", isCorrect: false },
  ]),
  createQuestion("Qual a letra?", video3, [
    { answerText: "B", isCorrect: false },
    { answerText: "A", isCorrect: false },
    { answerText: "F", isCorrect: true },
    { answerText: "O", isCorrect: false },
  ]),
  createQuestion("Qual a letra?", video4, [
    { answerText: "D", isCorrect: false },
    { answerText: "G", isCorrect: false },
    { answerText: "M", isCorrect: false },
    { answerText: "N", isCorrect: true },
  ]),
  createQuestion("Qual a letra?", video5, [
    { answerText: "S", isCorrect: false },
    { answerText: "Z", isCorrect: true },
    { answerText: "R", isCorrect: false },
    { answerText: "U", isCorrect: false },
  ]),
  createQuestion("Qual a letra?", video6, [
    { answerText: "I", isCorrect: false },
    { answerText: "L", isCorrect: true },
    { answerText: "Y", isCorrect: false },
    { answerText: "D", isCorrect: false },
  ]),
  createQuestion("Qual a letra?", video7, [
    { answerText: "N", isCorrect: false },
    { answerText: "R", isCorrect: true },
    { answerText: "D", isCorrect: false },
    { answerText: "V", isCorrect: false },
  ]),
  createQuestion("Qual a letra?", video8, [
    { answerText: "K", isCorrect: true },
    { answerText: "P", isCorrect: false },
    { answerText: "R", isCorrect: false },
    { answerText: "N", isCorrect: false },
  ]),
  createQuestion("Qual a letra?", video9, [
    { answerText: "G", isCorrect: false },
    { answerText: "I", isCorrect: false },
    { answerText: "Q", isCorrect: true },
    { answerText: "U", isCorrect: false },
  ]),
  createQuestion("Qual a letra?", video10, [
    { answerText: "E", isCorrect: true },
    { answerText: "X", isCorrect: false },
    { answerText: "J", isCorrect: false },
    { answerText: "S", isCorrect: false },
  ]),
  // Continue adicionando as perguntas aqui da mesma forma
];

function Alfabeto() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [timer, setTimer] = useState(10);
  const [timerRunning, setTimerRunning] = useState(true);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const location = useLocation();
  const userName = location.state?.userName || "Usuário"; // Corrigido para pegar o nome do estado

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setTimerRunning(false);
            const correctIndex = questions[currentQuestion].answerOptions.findIndex((option) => option.isCorrect);
            setCorrectAnswerIndex(correctIndex);
            handleAnswerOptionClick(false); // Se o tempo acabar, considera a resposta como errada
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current); // Limpa o intervalo ao sair da pergunta ou ao desmontar o componente
  }, [timerRunning]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }

    // Reseta o cronômetro ao trocar de pergunta
    setTimer(10);
    setTimerRunning(true);
    setCorrectAnswerIndex(null);
  }, [currentQuestion]);

  const playSound = (src) => {
    const audio = new Audio(src);
    audio.play();
  };

  const handleAnswerOptionClick = (isCorrect, index) => {
    if (timerRunning) {
      setTimerRunning(false); // Para o cronômetro quando uma resposta é selecionada
    }

    if (isCorrect) {
      setScore(score + 1);
      playSound(successSound); // Adiciona um feedback sonoro para respostas corretas
    } else {
      setIncorrectAnswers([...incorrectAnswers, questions[currentQuestion]]);
      playSound(errorSound); // Adiciona um feedback sonoro para respostas incorretas
    }

    setSelectedAnswerIndex(index);

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
        setShowScore(true);
      }
    }, 1500); // Espera 1 segundo antes de passar para a próxima pergunta
  };

  return (
    <div className="quiz">
      {showScore ? (
        <div className="score-section">
          <h2>
            {userName}, Parabéns! Você acertou {score} de {questions.length} perguntas!
          </h2>
          <Link to="/" className="return-button">
            Voltar para a página inicial
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
                <source src={questions[currentQuestion].videoSrc} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
            <div className="timer">
              <span>Tempo Restante: {timer}s</span>
              <progress value={timer} max={10} className="progress-bar" aria-label="Tempo Restante" />
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect, index)}
                style={{
                  backgroundColor:
                    selectedAnswerIndex === index
                      ? answerOption.isCorrect
                        ? "green"
                        : "red"
                      : correctAnswerIndex === index
                      ? "green"
                      : "",
                  color:
                    selectedAnswerIndex === index || correctAnswerIndex === index
                      ? "white"
                      : "",
                }}
                disabled={selectedAnswerIndex !== null}
              >
                {answerOption.answerText}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Alfabeto;