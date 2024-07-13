const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger.json');

const ensureAuthenticated = require('../middleware/ensureAuthenticated'); // Ensure you export this middleware

router.use('/', ensureAuthenticated, swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = router;
