import { pool } from "../config/db.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      `INSERT INTO products (name, description, price, stock, created_by)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, description, price, stock, created_by, created_at, updated_at`,
      [name, description, price, stock ?? 0, userId]
    );

    const product = result.rows[0];

    res.status(201).json({
      message: "Producto creado correctamente",
      product: {
        ...product,
        creator: {
          id: req.user.id,
          username: req.user.username,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error creando producto", error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.stock,
        p.created_at,
        p.updated_at,
        p.created_by,
        u.username AS creator_username
      FROM products p
      INNER JOIN users u ON p.created_by = u.id
      ORDER BY p.id DESC
    `);

    const products = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price: row.price,
      stock: row.stock,
      created_at: row.created_at,
      updated_at: row.updated_at,
      created_by: row.created_by,
      creator: {
        username: row.creator_username,
      },
    }));

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo productos", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.stock,
        p.created_at,
        p.updated_at,
        p.created_by,
        u.username AS creator_username
      FROM products p
      INNER JOIN users u ON p.created_by = u.id
      WHERE p.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const row = result.rows[0];

    res.json({
      id: row.id,
      name: row.name,
      description: row.description,
      price: row.price,
      stock: row.stock,
      created_at: row.created_at,
      updated_at: row.updated_at,
      created_by: row.created_by,
      creator: {
        username: row.creator_username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo producto", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    const existing = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const result = await pool.query(
      `UPDATE products
       SET name = $1,
           description = $2,
           price = $3,
           stock = $4,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [name, description, price, stock, id]
    );

    res.json({
      message: "Producto actualizado correctamente",
      product: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando producto", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando producto", error: error.message });
  }
};