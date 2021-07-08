const router = require('express').Router();
const cardCtrl = require('../controllers/card');

router.post('/', cardCtrl.createCard)
router.put('/:id', cardCtrl.updateCard)
router.delete('/:id', cardCtrl.deleteCard)
router.get('/:id', cardCtrl.getOneCard)
router.get('/', cardCtrl.getAllCard)

module.exports = router; 