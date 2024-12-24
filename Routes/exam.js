const express = require('express');
const { isAuthenticated } = require('../Middleware/auth');
const { createExam, getExams } = require('../Controller/examController');

const router = express.Router();

router.post('/', isAuthenticated, createExam);
router.get('/', isAuthenticated, getExams);

module.exports = router;