import express from "express";
import { signup, signin, logout } from "../controller/authController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and session management
 */

/**
 * @swagger
 * path:
 *  /api/auth/signup:
 *    post:
 *      summary: Create a new user
 *      tags: [Authentication]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        201:
 *          description: User created successfully
 *        400:
 *          description: Bad request
 *        500:
 *          description: Internal server error
 */
router.post("/signup", signup);

/**
 * @swagger
 * path:
 *  /api/auth/signin:
 *    post:
 *      summary: Login a user
 *      tags: [Authentication]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        200:
 *          description: Login successful
 *        400:
 *          description: Invalid credentials
 *        500:
 *          description: Internal server error
 */
router.post("/signin", signin);

/**
 * @swagger
 * path:
 *  /api/auth/logout:
 *    post:
 *      summary: Logout a user
 *      tags: [Authentication]
 *      responses:
 *        200:
 *          description: Logout successful
 *        500:
 *          description: Internal server error
 */
router.post("/logout", logout);

export default router;
