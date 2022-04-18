const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const storeRouter = require('./storeRouter');

router.use('/auth', authRouter);
router.use('/store', storeRouter);



module.exports = router;