const express = require("express");
const router = express.Router();
const {
  createUserWithPhone,
  completeUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserByEmail,
} = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /users/phone:
 *   get:
 *     summary: Create or fetch user with phone number using Firebase IdToken
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: idToken
 *         required: true
 *         schema:
 *           type: string
 *         description: Firebase authentication token
 *     responses:
 *       200:
 *         description: User logged in or created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 isNewUser:
 *                   type: boolean
 *                 user:
 *                   type: object
 *       400:
 *         description: idToken missing or phone number not found
 *       401:
 *         description: Invalid token
 */
router.get("/phone", createUserWithPhone);

/**
 * @swagger
 * /users/register/{userId}:
 *   post:
 *     summary: Complete user registration by adding profile details
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - dob
 *               - upi
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               dob:
 *                 type: string
 *                 format: date
 *               upi:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile completed
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post("/register/:userId", completeUserProfile);



/**
 * @swagger
 * /users/profile/{userId}:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               dob:
 *                 type: string
 *                 format: date
 *               upi:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/profile/:userId", updateUserProfile);


/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: Get user by email
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email of the user
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Email query is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/search", getUserByEmail);


/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete("/:userId", deleteUser);


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Array of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */
router.get("/", getAllUsers);

module.exports = router;
