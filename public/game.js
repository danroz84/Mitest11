const socket = io(); // Conectamos con el servidor
let cartasJugador = [];

// Evento cuando se recibe una nueva carta
socket.on("carta", (carta) => {
    cartasJugador.push(carta);
    document.getElementById("cartasJugador").innerText = cartasJugador.join(", ");
});

// Evento cuando el turno termina
socket.on("finTurno", () => {
    alert("Te has quedado con: " + cartasJugador.reduce((a, b) => a + b, 0) + " puntos.");
});

// Enviar eventos al servidor cuando se presionan los botones
document.getElementById("hit").addEventListener("click", () => {
    socket.emit("hit");
});

document.getElementById("stand").addEventListener("click", () => {
    socket.emit("stand");
});
