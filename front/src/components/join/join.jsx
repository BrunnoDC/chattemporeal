import { useState } from "react";
import "./join.css";

function Join({ setChatVisibility }) {
  const [username, setUsername] = useState("");

  const handleJoin = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    setChatVisibility(true);
  };

  return (
    <div className="join-container">
      <div className="join-card">
        <h2 className="join-title">Bem-vindo 👋</h2>
        <p className="join-subtitle">Entre para o chat em tempo real</p>

        <form onSubmit={handleJoin} className="join-form">
          <input
            type="text"
            placeholder="Seu nome..."
            className="join-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button type="submit" className="join-button">
            Entrar no Chat
          </button>
        </form>
      </div>
    </div>
  );
}

export default Join;    