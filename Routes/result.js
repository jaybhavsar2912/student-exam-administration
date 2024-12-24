const express = require('express');
const { isAuthenticated } = require('../Middleware/auth');
const { submitExam } = require('../Controller/resultController');

const router = express.Router();

router.post('/:id/submit', isAuthenticated, submitExam);

module.exports = router;