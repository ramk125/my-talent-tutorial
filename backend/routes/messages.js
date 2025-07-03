const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { auth, checkRole } = require('../middleware/auth');

// Submit contact form message
router.post('/', async (req, res) => {
    try {
        const message = new Message({
            ...req.body,
            user: req.user?._id // Optional: if user is logged in
        });
        
        await message.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error sending message' });
    }
});

// Get all messages (admin only)
router.get('/', auth, checkRole(['admin']), async (req, res) => {
    try {
        const messages = await Message.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

// Get message by ID (admin only)
router.get('/:id', auth, checkRole(['admin']), async (req, res) => {
    try {
        const message = await Message.findById(req.params.id)
            .populate('user', 'name email');
        
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching message' });
    }
});

// Update message status (admin only)
router.patch('/:id/status', auth, checkRole(['admin']), async (req, res) => {
    try {
        const { status } = req.body;
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        
        res.json(message);
    } catch (error) {
        res.status(400).json({ message: 'Error updating message status' });
    }
});

// Delete message (admin only)
router.delete('/:id', auth, checkRole(['admin']), async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting message' });
    }
});

module.exports = router; 