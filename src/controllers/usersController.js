const pool = require('../db/pool');
const CryptoJS = require('crypto-js');
require('dotenv').config();

const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, score FROM users ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, username, score FROM users WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const createUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({
      message: 'Todos los campos son requeridos'
    });

  const hashedPassword = CryptoJS.SHA256(password).toString();

  try {
    const result = await pool.query(
      'INSERT INTO users (username, password, score) VALUES ($1, $2, 0) RETURNING id, username, score',
      [username, hashedPassword]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};


const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET username, = $1, WHERE id = $2 RETURNING id, username, score',
      [name, email, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING id',
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: `Usuario ${id} eliminado correctamente` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateScore = async (req, res) => {
  const { id } = req.params;
  const { score } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET score = $1 WHERE id = $2 RETURNING id, username, score',
      [score, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateScore
};