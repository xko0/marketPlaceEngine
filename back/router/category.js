const router = require('express').Router();
const categoryCtrl = require('../controllers/category');

router.post('/', categoryCtrl.createCategory)
router.put('/:id', categoryCtrl.updateCategory)
router.delete('/:id', categoryCtrl.deleteCategory)
router.get('/', categoryCtrl.getCategory)

module.exports = router; 