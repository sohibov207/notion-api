const express = require("express");
const { swapColumns, getColumns } = require("../controllers/column.controller");
const router = express.Router();

router.get("/:boardId/", getColumns)
router.patch("/:boardId/swap", swapColumns);

module.exports = router;