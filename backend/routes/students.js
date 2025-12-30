const router = require('express').Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

// Create a new student
router.post('/', createStudent);

// Get all students
router.get('/', getAllStudents);

// Get a student by ID
router.get('/:id', getStudentById);

// Update a student
router.put('/:id', updateStudent);

// Delete a student
router.delete('/:id', deleteStudent);

module.exports = router;
