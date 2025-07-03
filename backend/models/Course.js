const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A course must have a title'],
        trim: true,
        maxlength: [100, 'A course title must have less or equal than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'A course must have a description'],
        trim: true
    },
    level: {
        type: String,
        required: [true, 'A course must have a level'],
        enum: {
            values: ['Class 1-5', 'Class 6-8', 'Class 9-10', 'Class 11-12'],
            message: 'Level must be one of: Class 1-5, Class 6-8, Class 9-10, Class 11-12'
        }
    },
    subject: {
        type: String,
        required: [true, 'A course must have a subject'],
        trim: true
    },
    image: {
        type: String,
        default: 'default-course.jpg'
    },
    price: {
        type: Number,
        required: [true, 'A course must have a price']
    },
    duration: {
        type: Number,
        required: [true, 'A course must have a duration in hours']
    },
    instructor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A course must have an instructor']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    students: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    lessons: [{
        title: String,
        content: String,
        duration: Number,
        videoUrl: String,
        resources: [{
            title: String,
            url: String
        }]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual populate reviews
courseSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'course',
    localField: '_id'
});

// Index for better search performance
courseSchema.index({ title: 'text', description: 'text' });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course; 