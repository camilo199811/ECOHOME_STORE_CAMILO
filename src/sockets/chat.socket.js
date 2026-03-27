import { pool } from "../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const configureSocket = (io) => {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("Token no proporcionado"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (error) {
      next(new Error("Token inválido"));
    }
  });

  io.on("connection", async (socket) => {
    console.log(`🔌 Usuario conectado: ${socket.user.username}`);

    try {
      const lastMessages = await pool.query(`
        SELECT 
          m.id,
          m.content,
          m.created_at,
          u.id AS user_id,
          u.username
        FROM messages m
        INNER JOIN users u ON m.user_id = u.id
        ORDER BY m.created_at DESC
        LIMIT 10
      `);

      socket.emit("messages", lastMessages.rows.reverse());
    } catch (error) {
      console.error("Error cargando mensajes:", error.message);
    }

    socket.on("send_message", async (data) => {
      try {
        if (!data?.content || !data.content.trim()) return;

        const result = await pool.query(
          `INSERT INTO messages (user_id, content)
           VALUES ($1, $2)
           RETURNING id, user_id, content, created_at`,
          [socket.user.id, data.content]
        );

        const newMessage = {
          id: result.rows[0].id,
          content: result.rows[0].content,
          created_at: result.rows[0].created_at,
          user_id: socket.user.id,
          username: socket.user.username,
        };

        io.emit("new_message", newMessage);
      } catch (error) {
        console.error("Error guardando mensaje:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Usuario desconectado: ${socket.user.username}`);
    });
  });
};