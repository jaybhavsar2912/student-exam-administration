const express = require('express');
const { isAuthenticated } = require('../Middleware/auth');
const { getAllStudents, getStudentById, updateStudent, deleteStudent } = require('../Controller/manageStudentController');
const router = express.Router();

router.get('/students', isAuthenticated, getAllStudents);
router.get('/students/:id', isAuthenticated, getStudentById); 
router.put('/students/:id', isAuthenticated, updateStudent); 
router.delete('/students/:id', isAuthenticated, deleteStudent);

module.exports = router;
