require("dotenv").config();
const express = require("express");
const db = require("./app/configs/db.config");
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const authRoutes = require('./app/routes/auth.routes');
const taskRoutes = require('./app/routes/task.routes');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


console.log(db.getConnectionStatus());


app.get('/', (req, res) => {
  res.json({
    message: 'Notion API Server',
    status: 'Running',
    endpoints: {
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout (requires token)',
        profile: 'GET /api/auth/profile (requires token)',
        editProfile: 'PUT /api/auth/profile (requires token)',
        deleteAccount: 'DELETE /api/auth/account (requires token)'
      },
      tasks: 'GET /api/tasks'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
