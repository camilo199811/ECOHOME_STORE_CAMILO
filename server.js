import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";

import { testConnection } from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import productsRoutes from "./src/routes/products.routes.js";
import usersRoutes from "./src/routes/users.routes.js";
import { configureSocket } from "./src/sockets/chat.socket.js";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API EcoHome corriendo 🚀" });
});

app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);

configureSocket(io);
testConnection();

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});