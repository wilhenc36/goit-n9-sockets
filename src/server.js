const express = require("express");
const http = require("http")
const socketIO = require("socket.io")
const path = require("path")

const app = express();
const httpServer = http.createServer(app);

const io = new socketIO.Server(httpServer, {  });

app.use(express.static(path.join(__dirname, "../public")))

io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`)

    socket.on("client:message", (data) => {
        io.sockets.emit("server:message", data)
    })

    socket.on("client:typing", (data) => {
        socket.broadcast.emit("server:typing", data)
    })

    socket.on("disconnect", () => {
        console.log(`Disconnected: ${socket.id}`)
    })
})

httpServer.listen(3000, () => {
    console.log("Server is running")
})