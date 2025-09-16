const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getPages,
  createPage,
  deletePage,
  movePage
} = require("../controllers/page.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pages
 *   description: Page management endpoints
 */

/**
 * @swagger
 * /pages/{columnId}/:
 *   get:
 *     summary: Get all pages in a column
 *     tags: [Pages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the column
 *     responses:
 *       200:
 *         description: List of pages
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Column not found
 */
router.get("/:columnId/", authMiddleware, getPages);

/**
 * @swagger
 * /pages/{columnId}/:
 *   post:
 *     summary: Create a new page in a column
 *     tags: [Pages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the column
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               position:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Page created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/:columnId/", authMiddleware, createPage);

/**
 * @swagger
 * /pages/{pageId}:
 *   delete:
 *     summary: Delete a page by ID
 *     tags: [Pages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pageId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the page
 *     responses:
 *       200:
 *         description: Page deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Page not found
 */
router.delete("/:pageId", authMiddleware, deletePage);

/**
 * @swagger
 * /pages/{pageId}/move:
 *   patch:
 *     summary: Move a page to another column or position
 *     tags: [Pages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pageId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the page
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetColumnId:
 *                 type: string
 *                 description: ID of the target column
 *               newPosition:
 *                 type: integer
 *                 description: New position index in the target column
 *     responses:
 *       200:
 *         description: Page moved successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Page not found
 */
router.patch("/:pageId/move", authMiddleware, movePage);

module.exports = router;
