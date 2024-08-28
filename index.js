import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Alfabeto from "./pages/Quiz/Alfabeto";
import Saudacoes from "./pages/Quiz/Saudacoes";
import Numeros from "./pages/Quiz/Numeros";
import Navbar from "./components/navbar";
import Sobre from "./pages/Sobre";
import Inicio from "./pages/Inicio"; // Importa a nova página
import Ranking from "./pages/Ranking";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Inicio" element={<Inicio />} /> {/* Nova rota */}
      <Route path="/Alfabeto" element={<Alfabeto />} />
      <Route path="/Saudacoes" element={<Saudacoes />} />
      <Route path="/Numeros" element={<Numeros />} />
      <Route path="/Navbar" element={<Navbar />} />
      <Route path="/Sobre" element={<Sobre />} />
      <Route path="/Ranking" element={<Ranking />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
