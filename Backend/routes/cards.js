const router = require('express').Router();

const {
  createCardValidation,
  getCardIdValidation,
} = require('../middlewares/validation');

const {
  getCards,
  createCard,
  removeCard,
  setLike,
  removeLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:cardId', getCardIdValidation, removeCard);
router.put('/:cardId/likes', getCardIdValidation, setLike);
router.delete('/:cardId/likes', getCardIdValidation, removeLike);

module.exports = router;
