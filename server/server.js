import express from "express";
import cors from "cors";
import config from "./db.js";
import router from "./router/web.js";
import session from "express-session";
import { Server } from "socket.io";
import http from "http";
import Emitter from "events";

const app = express();

const server = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

const eventEmitter = new Emitter({});

app.set("eventEmitter", eventEmitter);

app.use(
  session({
    secret: "dfklg64dfeijd",
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false,
    saveUninitialized: false,
  })
);

const PORT = process.env.PORT || 9000;

config();

app.use(router);

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("new-message", message);
  });
});

eventEmitter.on("roomAdded", (room) => {
  io.emit("roomAdded", room);
});

eventEmitter.on("roomUpdated", (room) => {
  io.emit("roomUpdated", room);
});
