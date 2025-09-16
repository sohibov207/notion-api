const express = require("express");
const { swapColumns, getColumns } = require("../controllers/column.controller");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Columns
 *   description: Column management endpoints
 */

/**
 * @swagger
 * /columns/{boardId}/:
 *   get:
 *     summary: Get all columns for a board
 *     tags: [Columns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: The board ID
 *     responses:
 *       200:
 *         description: List of columns
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Column'
 */
router.get("/:boardId/", getColumns);

/**
 * @swagger
 * /columns/{boardId}/swap:
 *   patch:
 *     summary: Swap two columns' order
 *     tags: [Columns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: The board ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               columnId1:
 *                 type: string
 *                 description: ID of the first column
 *               columnId2:
 *                 type: string
 *                 description: ID of the second column
 *             required:
 *               - columnId1
 *               - columnId2
 *     responses:
 *       200:
 *         description: Columns swapped successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Column'
 */
router.patch("/:boardId/swap", swapColumns);

module.exports = router;
