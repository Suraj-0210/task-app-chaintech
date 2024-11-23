import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../controller/taskController.js";
import { protectRoute } from "../middleware/protect.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operations related to user tasks
 */

/**
 * @swagger
 * path:
 *  /api/task:
 *    post:
 *      summary: Create a new task
 *      tags: [Tasks]
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                dueDate:
 *                  type: string
 *                  format: date
 *                category:
 *                  type: string
 *      responses:
 *        201:
 *          description: Task created successfully
 *        400:
 *          description: Missing fields
 *        500:
 *          description: Internal server error
 */
router.post("/", protectRoute, createTask);

/**
 * @swagger
 * path:
 *  /api/task:
 *    get:
 *      summary: Get all tasks for the authenticated user
 *      tags: [Tasks]
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        200:
 *          description: List of tasks
 *        500:
 *          description: Internal server error
 */
router.get("/", protectRoute, getAllTasks);

/**
 * @swagger
 * path:
 *  /api/task/{id}:
 *    get:
 *      summary: Get a task by its ID
 *      tags: [Tasks]
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: Task ID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Task retrieved successfully
 *        404:
 *          description: Task not found
 *        500:
 *          description: Internal server error
 */
router.get("/:id", protectRoute, getTaskById);

/**
 * @swagger
 * path:
 *  /api/task/{id}:
 *    put:
 *      summary: Update a task
 *      tags: [Tasks]
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: Task ID
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                dueDate:
 *                  type: string
 *                  format: date
 *                category:
 *                  type: string
 *      responses:
 *        200:
 *          description: Task updated successfully
 *        404:
 *          description: Task not found
 *        500:
 *          description: Internal server error
 */
router.put("/:id", protectRoute, updateTask);

/**
 * @swagger
 * path:
 *  /api/task/{id}:
 *    delete:
 *      summary: Delete a task
 *      tags: [Tasks]
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: Task ID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Task deleted successfully
 *        404:
 *          description: Task not found
 *        500:
 *          description: Internal server error
 */
router.delete("/:id", protectRoute, deleteTask);

/**
 * @swagger
 * path:
 *  /api/task/{id}/status:
 *    patch:
 *      summary: Update the completion status of a task
 *      tags: [Tasks]
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: Task ID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Task status updated successfully
 *        404:
 *          description: Task not found
 *        500:
 *          description: Internal server error
 */
router.patch("/:id/status", protectRoute, updateTaskStatus);

export default router;
