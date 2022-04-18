const express = require('express');
const router = express.Router();

const storeController = require('../controllers/storeController');
const { authenticateToken } = require('../middlewares/authorization');

router.use(authenticateToken);

router.post('/', storeController.create_store);
router.get('/', storeController.get_User_Store);
router.get('/:storeID', storeController.get_store);

module.exports = router;
