require("dotenv").config();
const express = require("express");
const db = require("./app/configs/db.config");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./app/routes/auth.routes");
const boardRoutes = require("./app/routes/board.routes");
const columnRoutes = require("./app/routes/column.routes");
const pageRoutes = require("./app/routes/page.routes");

app.use("/api/auth", authRoutes);
app.use("/api/board", boardRoutes);
app.use("/api/columns", columnRoutes);
app.use("/api/pages", pageRoutes);

console.log(db.getConnectionStatus());

app.get("/", (req, res) => {
  res.json({
    message: "Notion API Server",
    status: "Running",
    endpoints: {
      auth: {
        signup: "POST /api/auth/signup",
        login: "POST /api/auth/login",
        logout: "POST /api/auth/logout (requires token)",
        profile: "GET /api/auth/profile (requires token)",
        editProfile: "PUT /api/auth/profile (requires token)",
        deleteAccount: "DELETE /api/auth/account (requires token)",
      },
      pages: "GET /api/pages",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
