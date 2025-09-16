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

router.post("/", authMiddleware, createBoard);
router.get("/", authMiddleware, getBoards)
router.get("/:boardId", authMiddleware, getBoard);
router.put("/:boardId", authMiddleware, updateBoard);
router.delete("/:boardId", authMiddleware, deleteBoard);

module.exports = router;