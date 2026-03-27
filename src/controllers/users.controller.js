import { pool } from "../config/db.js";

export const getMe = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, email, created_at FROM users WHERE id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuario", error: error.message });
  }
};

export const getMyStats = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         u.id,
         u.username,
         COUNT(p.id)::int AS total_products
       FROM users u
       LEFT JOIN products p ON p.created_by = u.id
       WHERE u.id = $1
       GROUP BY u.id, u.username`,
      [req.user.id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo estadísticas", error: error.message });
  }
};