// Importamos las dependencias necesarias
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// Creamos la aplicación Express y el servidor HTTP
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servimos archivos estáticos desde la carpeta 'public'
app.use(express.static("public"));

// Cuando un jugador se conecta
io.on("connection", (socket) => {
    console.log("Jugador conectado");

    // Evento cuando el jugador pide una carta
    socket.on("hit", () => {
        console.log("Jugador pide carta");
        const nuevaCarta = Math.floor(Math.random() * 11) + 1; // Carta aleatoria entre 1 y 11
        socket.emit("carta", nuevaCarta);
    });

    // Evento cuando el jugador decide quedarse
    socket.on("stand", () => {
        console.log("Jugador se queda");
        socket.emit("finTurno");
    });

    // Evento cuando el jugador se desconecta
    socket.on("disconnect", () => {
        console.log("Jugador desconectado");
    });
});

// Servimos el juego en el puerto 3000
server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
