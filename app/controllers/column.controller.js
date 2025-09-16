const Column = require("../models/column.model");

async function getColumns(req, res) {
  try {
    const { boardId } = req.params;
    const columns = await Column.find({ board: boardId })
      .sort({ order: 1 })
      .populate({
        path: "pages",
        options: { sort: { order: 1 } },
      });
    res.status(200).json(columns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function swapColumns(req, res) {
  try {
    const { columnId, targetOrder } = req.body;
    const column = await Column.findById(columnId);
    if (!column) return res.status(404).json({ error: "Column not found" });

    const targetColumn = await Column.findOne({
      board: column.board,
      order: targetOrder,
    });

    if (!targetColumn) {
      return res.status(404).json({ error: "Target column not found" });
    }

    const oldOrder = column.order;
    column.order = targetColumn.order;
    targetColumn.order = oldOrder;

    await column.save();
    await targetColumn.save();

    const updated = await Column.find({ board: column.board })
      .sort({ order: 1 })
      .populate({
        path: "pages",
        options: { sort: { position: 1 } },
      });

    res.status(200).json({
      message: "Columns swapped successfully",
      columns: updated,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getColumns,
  swapColumns,
};
