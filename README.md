# 📝 Notion API Clone

A fully functional **Notion-inspired API** built with **Node.js + Express**.
Supports **authentication, boards, columns, pages, CRUD operations, swapping columns, moving pages**, and comes with **Swagger API docs**.

---

## 🚀 Features

- 🔑 **Authentication**

  - Signup, Login, Logout
  - Profile management (view, edit, delete)

- 📋 **Boards**

  - Create, read, update, delete boards

- 📊 **Columns**

  - Add, update, delete, reorder columns

- 📄 **Pages**

  - Full CRUD on pages
  - Move pages across columns

- 📚 **API Documentation**

  - Interactive Swagger UI at `/api-docs`

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Auth:** JWT (JSON Web Tokens)
- **Docs:** Swagger

---

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sohibov207/notion-api.git
   cd notion-clone-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```env
   MONGO_URI=mongodb://localhost:27017/notion-db
   JWT_SECRET=your_secret_here
   PORT=3000
   ```

4. Start the server:

   ```bash
   npm start
   ```

Server will run at:
👉 `http://localhost:3000`
Swagger docs at:
👉 `http://localhost:3000/api-docs`

---

## 📡 API Endpoints

### Authentication

- `POST /api/auth/signup` – Register a new user
- `POST /api/auth/login` – Login and receive token
- `POST /api/auth/logout` – Logout (requires token)
- `GET /api/auth/profile` – Get user profile
- `PUT /api/auth/profile` – Update profile
- `DELETE /api/auth/account` – Delete account

### Boards

- `GET /api/board` – Get all boards
- `POST /api/board` – Create a new board
- `PUT /api/board/:id` – Update board
- `DELETE /api/board/:id` – Delete board

### Columns

- `GET /api/columns` – Get all columns
- `POST /api/columns` – Create a column
- `PUT /api/columns/:id` – Update column
- `DELETE /api/columns/:id` – Delete column
- `PATCH /api/columns/swap` – Swap/reorder columns

### Pages

- `GET /api/pages` – Get all pages
- `POST /api/pages` – Create a page
- `PUT /api/pages/:id` – Update page
- `DELETE /api/pages/:id` – Delete page
- `PATCH /api/pages/move` – Move page to another column

---

## 🧪 Testing

Use **Postman** or the built-in **Swagger UI** at:
`http://localhost:3000/api-docs`

---

## 📌 Roadmap

- [ ] Add rich-text content support for pages
- [ ] Collaborators and sharing

---

## 📜 License

MIT License © 2025
