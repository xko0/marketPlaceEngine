const router = require('express').Router();
const categoryCtrl = require('../controllers/category');

router.get('/', categoryCtrl.getCategory)
router.post('/', categoryCtrl.createCategory)
router.put('/:id', categoryCtrl.updateCategory)
router.delete('/:id', categoryCtrl.deleteCategory)

module.exports = router; 