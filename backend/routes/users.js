const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Get user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password')
            .populate('enrolledCourses');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
    try {
        const updates = req.body;
        const allowedUpdates = ['name', 'profile', 'settings'];
        
        // Filter out non-allowed updates
        Object.keys(updates).forEach(key => {
            if (!allowedUpdates.includes(key)) {
                delete updates[key];
            }
        });

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error updating profile' });
    }
});

// Update user settings
router.put('/settings', auth, async (req, res) => {
    try {
        const { theme, notifications } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    'settings.theme': theme,
                    'settings.notifications': notifications
                }
            },
            { new: true, runValidators: true }
        ).select('-password');

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error updating settings' });
    }
});

// Get enrolled courses
router.get('/courses', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('enrolledCourses');
        res.json(user.enrolledCourses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching enrolled courses' });
    }
});

// Enroll in a course
router.post('/courses/:courseId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        if (user.enrolledCourses.includes(req.params.courseId)) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        user.enrolledCourses.push(req.params.courseId);
        await user.save();

        res.json({ message: 'Successfully enrolled in course' });
    } catch (error) {
        res.status(500).json({ message: 'Error enrolling in course' });
    }
});

module.exports = router; 