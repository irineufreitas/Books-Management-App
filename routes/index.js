const express = require('express');
const router = express.Router();

router.use('/api-docs', require('./swaggerRoute'));

router.use('/authors', require('./authorRoutes'));

router.use('/books', require('./bookRoutes'));

module.exports = router;