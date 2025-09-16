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

async function movePage(req, res) {
  try {
    const { pageId } = req.params;
    const { targetColumnId, targetPosition } = req.body;

    const page = await Page.findById(pageId);
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    if (targetColumnId && page.column.toString() !== targetColumnId) {
      await Column.findByIdAndUpdate(page.column, {
        $pull: { pages: pageId },
      });

      await Column.findByIdAndUpdate(targetColumnId, {
        $push: { pages: pageId },
      });

      page.column = targetColumnId;
    }

    if (typeof targetPosition === "number") {
      const pagesInColumn = await Page.find({ column: page.column }).sort({
        position: 1,
      });

      pagesInColumn.splice(page.position, 1);
      pagesInColumn.splice(targetPosition, 0, page);

      await Promise.all(
        pagesInColumn.map((p, idx) =>
          Page.findByIdAndUpdate(p._id, { position: idx })
        )
      );
    }

    await page.save();

    res.status(200).json({ message: "Page moved successfully", page });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getPages,
  createPage,
  deletePage,
  movePage,
};
