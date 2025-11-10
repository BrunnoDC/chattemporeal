const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

const PORT = 3001;

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/chatdb")
  .then(() => console.log("📦 MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar no MongoDB:", err));

  const MessageSchema = new mongoose.Schema({
  user: String,
  text: String,
  time: String,
});

const Message = mongoose.model("Message", MessageSchema);

io.on("connection", (socket) => {
  console.log("🟢 Usuário conectado:", socket.id);

  // Envia histórico de mensagens ao novo usuário
  socket.on("request_history", async () => {
    const messages = await Message.find();
    socket.emit("chat_history", messages);
  });

  // Recebe nova mensagem e salva no banco
  socket.on("chat_message", async (msg) => {
    console.log("💬 Nova mensagem:", msg);

    // Salva no MongoDB
    const newMessage = new Message(msg);
    await newMessage.save();

    // Envia para todos conectados
    io.emit("chat_message", msg);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Usuário desconectado:", socket.id);
  });
});

server.listen(PORT, () => console.log("Server running on port", PORT));
