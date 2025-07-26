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
 * /api/brands/couponByBrand:
 *   get:
 *     summary: Get all coupons for a given brand
 *     tags: [Brands]
 *     parameters:
 *       - in: query
 *         name: brandName
 *         schema:
 *           type: string
 *         required: true
 *         description: Brand name to fetch coupons for
 *     responses:
 *       200:
 *         description: List of coupons for the given brand
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   couponId:
 *                     type: string
 *                   couponCode:
 *                     type: string
 *                   brandName:
 *                     type: string
 *                   brandId:
 *                     type: string
 *                   percentage:
 *                     type: number
 *                   expireDate:
 *                     type: string
 *                     format: date
 *       400:
 *         description: brandName is required
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Server error
 */
router.get("/couponByBrand", getCouponsByBrand);

module.exports = router;