import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Inicio.css";

function Inico() {
  const [userName, setUserName] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState("Numeros"); // Define o quiz padrão
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };

  const handleQuizChange = (e) => {
    setSelectedQuiz(e.target.value);
  };

  const handleInicio = () => {
    if (userName.trim()) {
      navigate(`/${selectedQuiz}`, { state: { userName } });
    } else {
      alert("Por favor, insira seu nome!");
    }
  };

  return (
    <div className="start-quiz">
      <h1>Bem-vindo ao Quiz!</h1>
      <input
        type="text"
        value={userName}
        onChange={handleInputChange}
        placeholder="Digite seu nome"
      />
      <select value={selectedQuiz} onChange={handleQuizChange}>
        <option value="Numeros">Números</option>
        <option value="Alfabeto">Alfabeto</option>
        <option value="Saudacoes">Saudações</option>
      </select>
      <button onClick={handleInicio}>Iniciar Quiz</button>
    </div>
  );
}

export default Inico;
