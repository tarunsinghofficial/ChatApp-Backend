const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    //user wants to join room
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with id- ${socket.id} joined with room id- ${data}`);
    })

    socket.on("send_msg", (data) => {
        socket.to(data.room).emit("receive_msg", data)
    })

    socket.on("disconnect", () => {
        console.log("User is disconnected", socket.id);
    })
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
