const express = require("express");
const router = express.Router();
const {
  addCoupon,
  getAllCoupons,
  getCouponsByCategory,
  updateCouponStatus,
  getCouponById,
  editCoupon,
  getCouponsByUser,
} = require("../controllers/couponController");

const upload = require("../middlewares/upload");

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: Coupon management APIs
 */

/**
 * @swagger
 * /coupons:
 *   post:
 *     summary: Add a new coupon
 *     tags: [Coupons]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - categoryName
 *               - brandName
 *               - couponCode
 *               - expireDate
 *             properties:
 *               userId:
 *                 type: string
 *               categoryName:
 *                 type: string
 *               brandName:
 *                 type: string
 *               couponCode:
 *                 type: string
 *               expireDate:
 *                 type: string
 *                 format: date
 *               price:
 *                 type: number
 *               termsAndConditionImage:
 *                 type: string
 *                 format: binary
 *             example:
 *               userId: "user123"
 *               categoryName: "Electronics"
 *               brandName: "Apple"
 *               couponCode: "SAVE50"
 *               expireDate: "2025-12-31"
 *               price: 499.99
 *     responses:
 *       201:
 *         description: Coupon created successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Failed to add coupon
 */
router.post("/", upload.single("termsAndConditionImage"), addCoupon);

/**
 * @swagger
 * /coupons:
 *   get:
 *     summary: Get all coupons
 *     tags: [Coupons]
 *     responses:
 *       200:
 *         description: List of all coupons
 *         content:
 *           application/json:
 *             example:
 *               - couponId: "abc-123"
 *                 userId: "user123"
 *                 brandId: "brand456"
 *                 couponCode: "SAVE50"
 *                 expireDate: "2025-12-31"
 *                 price: 499.99
 *                 termsAndConditionImage: "data:image/png;base64,..."
 *       500:
 *         description: Server error
 */
router.get("/", getAllCoupons);

/**
 * @swagger
 * /coupons/category:
 *   get:
 *     summary: Get coupons by category name
 *     tags: [Coupons]
 *     parameters:
 *       - in: query
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the category
 *     responses:
 *       200:
 *         description: Coupons in the specified category
 *         content:
 *           application/json:
 *             example:
 *               - couponId: "abc-123"
 *                 categoryName: "Electronics"
 *                 couponCode: "SAVE20"
 *       404:
 *         description: No coupons found
 *       500:
 *         description: Server error
 */
router.get("/category", getCouponsByCategory);

/**
 * @swagger
 * /coupons/update-status:
 *   put:
 *     summary: Update coupon status (approve/reject)
 *     tags: [Coupons]
 *     parameters:
 *       - in: query
 *         name: couponId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [approved, rejected]
 *     responses:
 *       200:
 *         description: Coupon status updated
 *         content:
 *           application/json:
 *             example:
 *               message: "Coupon approved"
 *               data:
 *                 couponId: "abc-123"
 *                 status: "approved"
 *       400:
 *         description: Missing or invalid parameters
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Server error
 */
router.put("/update-status", updateCouponStatus);

/**
 * @swagger
 * /coupons/{couponId}:
 *   get:
 *     summary: Get a coupon by ID
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: couponId
 *         required: true
 *         schema:
 *           type: string
 *         description: Coupon ID
 *     responses:
 *       200:
 *         description: Coupon details
 *         content:
 *           application/json:
 *             example:
 *               couponId: "abc-123"
 *               userId: "user123"
 *               couponCode: "SAVE10"
 *               expireDate: "2025-11-11"
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Server error
 */
router.get("/:couponId", getCouponById);

/**
 * @swagger
 * /coupons/{couponId}:
 *   put:
 *     summary: Edit a coupon by ID
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: couponId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               title: "New Year Deal"
 *               description: "Get 50% off on all electronics"
 *               status: "approved"
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Server error
 */
router.put("/:couponId", editCoupon);

/**
 * @swagger
 * /coupons/user/{userId}:
 *   get:
 *     summary: Get all coupons uploaded by a specific user
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of user's coupons
 *         content:
 *           application/json:
 *             example:
 *               - couponId: "abc-123"
 *                 userId: "user123"
 *                 couponCode: "SAVE25"
 *       404:
 *         description: No coupons found for this user
 *       500:
 *         description: Server error
 */
router.get("/user/:userId", getCouponsByUser);

module.exports = router;
