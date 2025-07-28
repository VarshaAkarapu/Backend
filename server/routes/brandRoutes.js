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
 *     summary: Retrieve all available brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: A list of all brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: MongoDB ObjectId of the brand
 *                   brandId:
 *                     type: string
 *                     description: Unique identifier for the brand
 *                   brandName:
 *                     type: string
 *                     description: Name of the brand
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllBrands);

/**
 * @swagger
 * /api/brands/couponByBrand:
 *   get:
 *     summary: Retrieve coupons by brand name
 *     tags: [Brands]
 *     parameters:
 *       - in: query
 *         name: brandName
 *         schema:
 *           type: string
 *         required: true
 *         description: Brand name (case-insensitive)
 *     responses:
 *       200:
 *         description: A list of coupons matching the given brand name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: MongoDB ObjectId of the coupon
 *                   couponId:
 *                     type: string
 *                     description: Unique identifier for the coupon
 *                   couponCode:
 *                     type: string
 *                     description: Code of the coupon
 *                   brandName:
 *                     type: string
 *                     description: Name of the associated brand
 *                   brandId:
 *                     type: string
 *                     description: ID of the associated brand
 *                   percentage:
 *                     type: number
 *                     description: Discount percentage
 *                   expireDate:
 *                     type: string
 *                     format: date
 *                     description: Expiry date of the coupon
 *       400:
 *         description: brandName query parameter is missing
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Internal server error while fetching coupons
 */
router.get("/couponByBrand", getCouponsByBrand);

module.exports = router;