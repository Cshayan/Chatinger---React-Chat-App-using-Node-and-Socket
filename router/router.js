// Import dependencies
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Chat server Backend in port 5000');
});

module.exports = router;