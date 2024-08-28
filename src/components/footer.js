import React from "react";
import "../App.css"; // Certifique-se de que o caminho esteja correto

const Footer = () => {
  return (
    <footer className="App-footer">
      <p>&copy; 2024 Ensinando Libras. Todos os direitos reservados.</p>
      <p>
        <a
          href="https://www.ensinandolibras.com.br/"
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visite nosso site
        </a>
      </p>
    </footer>
  );
};

export default Footer;
