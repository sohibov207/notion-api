require("dotenv").config();
const express = require("express");
const db = require("./app/configs/db.config");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(db.getConnectionStatus());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
