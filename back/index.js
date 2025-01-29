const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

const PORT = 3001;

io.on("connection", (socket) => {
    console.log("Usuário conectado!", socket.id);

    socket.on("disconnect", () => {
        console.log("Usuário desconectado!", socket.id);
    });
});

server.listen(PORT, () => console.log("Server running on port", PORT));
