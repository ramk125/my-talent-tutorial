const express = require('express');
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/search', courseController.searchCourses);
router.get('/:id', courseController.getCourse);

// Protected routes
router.use(authController.protect);

router.post('/', authController.restrictTo('teacher', 'admin'), courseController.createCourse);
router.patch('/:id', authController.restrictTo('teacher', 'admin'), courseController.updateCourse);
router.delete('/:id', authController.restrictTo('teacher', 'admin'), courseController.deleteCourse);

// Student routes
router.post('/:id/enroll', courseController.enrollInCourse);
router.get('/enrolled/courses', courseController.getEnrolledCourses);

module.exports = router; 