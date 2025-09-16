const express = require("express");
const {
  getPages,
  createPage,
  deletePage,
  swapPages,
} = require("../controllers/page.controller");
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router();

router.get("/:columnId/", authMiddleware, getPages);
router.post("/:columnId/", authMiddleware, createPage);
router.delete("/:pageId", authMiddleware, deletePage);
router.patch("/:pageId/swap", authMiddleware, swapPages);

module.exports = router;