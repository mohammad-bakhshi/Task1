const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const storeRouter = require('./storeRouter');

//goes to auth route
router.use('/auth', authRouter);
//gouse to store route
router.use('/store', storeRouter);



module.exports = router;