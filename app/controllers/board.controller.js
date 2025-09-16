const Board = require("../models/board.model");
const Column = require("../models/column.model");

async function createBoard(req, res) {
  try {
    const { title = "New database", description = "Add description" } =
      req.body;

    const owner = req.user._id;

    const board = await Board.create({ title, description, owner });

    await Column.insertMany([
      { name: "Not started", order: 1, board: board._id },
      { name: "In progress", order: 2, board: board._id },
      { name: "Done", order: 3, board: board._id },
    ]);

    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getBoard(req, res) {
  try {
    const { boardId } = req.params;

    const board = await Board.findById(boardId).populate(
      "owner",
      "username email"
    );

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    const columns = await Column.find({ board: boardId }).sort({ order: 1 });

    res.status(200).json({ board, columns });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getBoards(req, res) {
  try {
    const boards = await Board.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateBoard(req, res) {
  try {
    const { boardId } = req.params;
    const { title, description } = req.body;

    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedBoard) {
      return res.status(404).json({ error: "Board not found" });
    }

    res.status(200).json(updatedBoard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteBoard(req, res) {
  try {
    const { boardId } = req.params;

    const board = await Board.findByIdAndDelete(boardId);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    await Column.deleteMany({ board: boardId });

    res.status(200).json({ message: "Board deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createBoard,
  getBoard,
  getBoards,
  updateBoard,
  deleteBoard,
};
