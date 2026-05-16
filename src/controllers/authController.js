const pool = require('../db/pool');
const CryptoJS = require('crypto-js');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email y password requeridos' });

  const hashedPassword = CryptoJS.SHA256(password).toString();

  try {
    const result = await pool.query(
      'SELECT id, name, email FROM users WHERE email = $1 AND password = $2',
      [email, hashedPassword]
    );
    if (result.rows.length === 0)
      return res.status(401).json({ message: 'Credenciales incorrectas' });

    res.json({ message: 'Login exitoso', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { login };