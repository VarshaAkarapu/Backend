const express = require("express");
const router = express.Router();

const { getCategories, addCategory, getCouponsByCategory } = require("../controllers/categoryController");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management APIs
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of all categories
 */
router.get("/", getCategories);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Add a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *     responses:
 *       201:
 *         description: Category created successfully
 */
router.post("/", addCategory);

/**
 * @swagger
 * /categories/{categoryName}/coupons:
 *   get:
 *     summary: Get all coupons by category name
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the category
 *     responses:
 *       200:
 *         description: A list of coupons for the category
 */
router.get("/bycategory", getCouponsByCategory);

module.exports = router;
