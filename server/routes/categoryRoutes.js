const express = require("express");
const router = express.Router();

const {
  getCategories,
  addCategory,
  getCouponsByCategory,
} = require("../controllers/categoryController");

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Category management APIs
 *   - name: Coupons
 *     description: Coupon related APIs
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   categoryId:
 *                     type: string
 *                     description: Unique identifier of the category
 *                   name:
 *                     type: string
 *                     description: Name of the category
 *       500:
 *         description: Server error
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 category:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *       400:
 *         description: Category name is required
 *       409:
 *         description: Category already exists
 *       500:
 *         description: Server error
 */
router.post("/", addCategory);

/**
 * @swagger
 * /categories/bycategory:
 *   get:
 *     summary: Get all coupons by category name
 *     tags: [Coupons]
 *     parameters:
 *       - in: query
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the category to filter coupons by
 *     responses:
 *       200:
 *         description: A list of coupons for the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupon'
 *       400:
 *         description: Missing categoryName query parameter
 *       404:
 *         description: No coupons found for this category
 *       500:
 *         description: Server error
 */
router.get("/bycategory", getCouponsByCategory);

module.exports = router;
