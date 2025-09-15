const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Task routes working',
    data: []
  });
});

module.exports = router;
