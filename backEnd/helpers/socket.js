import cors from 'cors'
import http from "http"
import { Server } from "socket.io"
import throwErrorMessage from './errorHandler.helpers.js';

let io = null; // store io here so other files can access it


export default function initiateWebSocket(app, port) {
  //we create a http server
  const server = http.createServer(app);
  //attatching socket io to the actual server
   io = new Server(server, {
    cors: {
      origin: process.env.FRONT_END,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    //0console.log(`user connected ${socket.id}`);
    // socket.on("handleClick", (message) => {
    //   socket.emit("receivedMessage", message);
    // });
  });
    server.listen(port, () => {
      console.log(`websocket is active ${port}`);
    });
}

export function GETIO() {
    try {
            if (!io) throwErrorMessage("websocket not initialized", 500);
            return io;
    } catch (error) {
        console.log(error.message, "is the error from GETIO")
    }
}