import dotenv from 'dotenv';
import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import whiteboardRoutes from "./routes/whiteboardRoutes.js";

dotenv.config({
  path:"./.env"
})
connectDB();

const app = express();
const server = http.createServer(app);

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000/", // Replace with your frontend URL
  credentials: true,
};

app.use(cors(corsOptions));

const io = new Server(server, {
  cors: corsOptions, // Add CORS to socket.io as well
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/whiteboards", whiteboardRoutes);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("draw", (data) => {
    socket.to(data.roomId).emit("draw", data);
  });

  socket.on("erase", (data) => {
    socket.to(data.roomId).emit("erase", data);
  });


  socket.on("request-initial-state", (roomId) => {
    socket.to(roomId).emit("request-initial-state");
  });

  socket.on("initial-state", (data) => {
    socket.to(data.roomId).emit("initial-state", data.imageData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);
console.log( process.env.PORT )

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
