const Page = require("../models/page.model");
const Column = require("../models/column.model");

async function getPages(req, res) {
  try {
    const { columnId } = req.params;
    const column = await Column.findById(columnId);
    if (!column) {
      return res.status(404).json({ error: "Column not found" });
    }
    const pages = await Page.find({ column: columnId }).sort({ order: 1 });
    res.status(200).json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createPage(req, res) {
  try {
    const { columnId } = req.params;
    const { title, content } = req.body || {};
    const userId = req.user.id;

    const column = await Column.findById(columnId).populate("board");
    if (!column) {
      return res.status(404).json({ error: "Column not found" });
    }

    const lastPage = await Page.findOne({ column: columnId }).sort({
      position: -1,
    });

    const position = lastPage ? lastPage.position + 1 : 0;

    const page = await Page.create({
      title: title && title.trim() !== "" ? title : "New page",
      content: content || "",
      column: columnId,
      board: column.board._id,
      owner: userId,
      position,
    });

    column.pages.push(page._id);
    await column.save();

    res.status(201).json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deletePage(req, res) {
  try {
    const { pageId } = req.params;
    const deleted = await Page.findByIdAndDelete(pageId);
    if (!deleted) return res.status(404).json({ error: "Page not found" });
    await Column.findByIdAndUpdate(deleted.column, {
      $pull: { pages: pageId },
    });
    res.status(200).json({ message: "Page deleted", page: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function swapPages(req, res) {
  try {
    const { pageId } = req.params;
    const { targetPosition } = req.body;

    const page = await Page.findById(pageId);
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    const sourcePosition = page.position;

    if (sourcePosition === targetPosition) {
      return res.status(200).json(page);
    }

    const targetPage = await Page.findOne({
      column: page.column,
      position: targetPosition,
    });

    if (!targetPage) {
      return res.status(404).json({ error: "Target page not found" });
    }

    [page.position, targetPage.position] = [targetPage.position, page.position];

    await page.save();
    await targetPage.save();

    res.status(200).json({
      message: "Pages swapped successfully",
      pages: [page, targetPage],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getPages,
  createPage,
  deletePage,
  swapPages,
};
