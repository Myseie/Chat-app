const { Server } = require("socket.io");

const io = new Server(4000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {

    console.log("Användare ansluten", socket.id);

    socket.on("sendMessage", (message) => {
        console.log("Meddelande mottaget från klient:", message);
        io.emit("receiveMessage", message);
        console.log("Meddelandet skickat till alla andra klienter");
    });

    socket.on("disconnect", () => {
        console.log("Användare kopplad från");
    });
});

console.log("WebSocket-servern körs på port 3000");