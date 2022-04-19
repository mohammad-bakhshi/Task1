const express = require('express');
const router = express.Router();

const storeController = require('../controllers/storeController');
const { verifyAccessToken } = require('../middlewares/authorization');

router.use(verifyAccessToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     Store:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - image
 *         - location
 *       properties:
 *         name:
 *           type: string
 *           description: The Store name
 *         address:
 *           type: string
 *           description: The address of store
 *         image:
 *           type: string
 *           description: The Store image
 *         location:
 *           type: string
 *           description: The Store location
 *       example:
 *         name: "Google"
 *         address: "America,California"
 *         image: "google.png"
 *         location: "America"
 */

/**
  * @swagger
  * tags:
  *   name: Stores
  *   description: The stores managing API
  */

/**
 * @swagger
 * /api/store:
 *   post:
 *     summary: Create a new store
 *     tags: [Stores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Store'
 *     responses:
 *       201:
 *         description: The store was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       400:
 *         description: Validation Error
 *       422:
 *         description: Store already exists
 *       500:
 *         description: Some server error
 */
router.post('/', storeController.create_store);




/**
 * @swagger
 * /api/store/{storeID}:
 *   get:
 *     summary: Get a store by ID
 *     parameters:
 *      - in: path
 *        name: storeID
 *     tags: [Stores]
 *     responses:
 *       200:
 *         description: The store
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Store'
 *       422:
 *         description: Store not found
 */




router.get('/:storeID', storeController.get_store);

module.exports = router;
