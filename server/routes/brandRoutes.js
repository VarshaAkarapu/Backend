const express = require("express");
const router = express.Router();
const { getAllBrands, getCouponsByBrand } = require("../controllers/brandController");


/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Endpoints related to brands and brand-wise coupons
 */

/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: List of all brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   brandId:
 *                     type: string
 *                   brandName:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", getAllBrands);

/**
 * @swagger
 * /coupons/bycategory:
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