const express = require('express');
const router = express.Router();

const userController = require('../controllers/authController');
const userValidation = require('../middlewares/validation/userValidation');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullname
 *         - password
 *         - cellphone
 *       properties:
 *         fullname:
 *           type: string
 *           description: The User fullname
 *         cellphone:
 *           type: string
 *           description: The cellphone number
 *         password:
 *           type: string
 *           description: The User password 
 *       example:
 *         fullname: "Mohammad Bakhshi"
 *         cellphone: "09195797691"
 *         password: "mohammadBakhshi"
 */

/**
  * @swagger
  * tags:
  *   name: Users
  *   description: The users managing API
  */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation Error
 *       422:
 *         description: User already exists
 *       500:
 *         description: Some server error
 */

router.post('/register', userValidation.createValidator, userController.create_user);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login as a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation Error
 *       401:
 *         description: Password was not correct
 *       422:
 *         description: No user found
 *       500:
 *         description: Some server error
 */

router.post('/login', userValidation.loginValidator, userController.login_user);


module.exports = router;
