import { createServer } from 'node:http';
import express from "express"
import {Server} from "socket.io"
import dotenv from "dotenv";

dotenv.config({
  path:"./.env"
})

const app = express();

const server = createServer(app);

const io = new Server(server,{
    cors:{
        origin: process.env.CORS_ORIGIN,
         methods: ["GET", "POST"],
    }
})

export const getReceiverSoketId = (receiverId) => {
  return (receiverId)
}

const user = {};
// io.on("connection",(socket) => {
//     console.log("new user connected ",socket.id);
//     const userId = socket.handshake.query.userId;

//     if(userId){
//         user[userId] = socket.id;
//         console.log(user);
//     }
//     io.emit("getonline",Object.keys(user))

//     socket.on("disconnect",() => {
//         console.log("client disconnect ",socket.id)
//         delete user[userId]
//         io.emit("getonline",Object.keys(user))
//     })
// })

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    user[userId] = socket.id;
  }
  io.emit("getonline",Object.keys(user))
  socket.on("disconnect", () => {
    delete user[userId];
  });
});

export {app,server,io}