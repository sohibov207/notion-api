const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createBoard,
  getBoard,
  getBoards,
  updateBoard,
  deleteBoard,
} = require("../controllers/board.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Boards
 *   description: Board management endpoints
 */

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create a new board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       201:
 *         description: Board created successfully
 */
router.post("/", authMiddleware, createBoard);

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get all boards
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of boards
 */
router.get("/", authMiddleware, getBoards);

/**
 * @swagger
 * /boards/{boardId}:
 *   get:
 *     summary: Get a single board by ID
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the board
 *     responses:
 *       200:
 *         description: Board details
 *       404:
 *         description: Board not found
 */
router.get("/:boardId", authMiddleware, getBoard);

/**
 * @swagger
 * /boards/{boardId}:
 *   put:
 *     summary: Update a board by ID
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
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
 *     responses:
 *       200:
 *         description: Board updated successfully
 *       404:
 *         description: Board not found
 */
router.put("/:boardId", authMiddleware, updateBoard);

/**
 * @swagger
 * /boards/{boardId}:
 *   delete:
 *     summary: Delete a board by ID
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Board deleted successfully
 *       404:
 *         description: Board not found
 */
router.delete("/:boardId", authMiddleware, deleteBoard);

module.exports = router;
