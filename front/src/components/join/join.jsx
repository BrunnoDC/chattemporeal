import { useRef, useEffect, useState } from "react";
import io from "socket.io-client";

export default function Join({ setChatVisibility }) {
    const usernameRef = useRef();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        console.log("Tentando conectar ao WebSocket...");
        const newSocket = io("http://localhost:3001", {
            transports: ["websocket"], // Força WebSocket puro
        });

        newSocket.on("connect", () => {
            console.log("Conectado com sucesso! ID:", newSocket.id);
        });

        newSocket.on("connect_error", (err) => {
            console.error("Erro de conexão:", err);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleSubmit = () => {
        const username = usernameRef.current.value;
        if (!username.trim()) return;

        console.log("Usuário entrou:", username);
        if (socket) {
            socket.emit("join_room", username);
        }

        setChatVisibility(true);
    };

    return (
        <div>
            <h1>Join</h1>
            <input type="text" ref={usernameRef} placeholder="Nome do usuário" />
            <button onClick={handleSubmit}>Entrar</button>
        </div>
    );
}

