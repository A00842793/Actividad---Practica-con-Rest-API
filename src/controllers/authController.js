
const pool = require('../db/pool');
const CryptoJS = require('crypto-js');

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Usuario y password requeridos' });

  const hashedPassword = CryptoJS.SHA256(password).toString();

  try {
    const result = await pool.query(
      'SELECT id, username, score FROM users WHERE username = $1 AND password = $2',
      [username, hashedPassword]
    );
    if (result.rows.length === 0)
      return res.status(401).json({ message: 'Credenciales incorrectas' });

    res.json({ message: 'Login exitoso', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { login };