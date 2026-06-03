const { Router } = require('express');
const router = Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateScore
} = require('../controllers/usersController');

router.get('/', getUsers);           
router.get('/:id', getUserById);     
router.post('/', createUser);       
router.put('/:id', updateUser);
router.put('/:id/score', updateScore);   
router.delete('/:id', deleteUser);   

module.exports = router;