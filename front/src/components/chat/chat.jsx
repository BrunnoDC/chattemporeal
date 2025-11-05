import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./chat.css";

const socket = io("http://localhost:3000");

function Pasta({ username }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("chat_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("chat_message");
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const msgData = {
      user: username,
      text: message,
      time: new Date().toLocaleTimeString()
    };

    socket.emit("chat_message", msgData);
    setMessages((prev) => [...prev, msgData]);
    setMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">Chat em Tempo Real ⚡</div>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            className={`chat-message ${msg.user === username ? "self" : ""}`}
            key={i}
          >
            <span className="chat-user">{msg.user}</span>
            <p>{msg.text}</p>
            <span className="chat-time">{msg.time}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-area" onSubmit={sendMessage}>
        <input
          className="chat-input"
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="chat-btn">Enviar</button>
      </form>
    </div>
  );
}

export default Pasta;