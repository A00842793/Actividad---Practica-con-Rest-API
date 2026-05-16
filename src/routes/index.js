const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'API REST funcionando correctamente' });
});

router.get('/marco', (req, res) => {
  res.json({ message: 'Polo!' });
});

router.get('/ping', (req, res) => {
  res.json({ message: 'pong', timestamp: new Date() });
});

module.exports = router;