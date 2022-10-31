const router = require('express').Router();

const {
  getUserIdValidation,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

const {
  getUsers,
  getUserId,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserIdValidation, getUserId);
router.patch('/me', updateUserValidation, updateUser);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
