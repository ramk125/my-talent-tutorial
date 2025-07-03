const Course = require('../models/Course');
const { catchAsync } = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllCourses = catchAsync(async (req, res, next) => {
    // Build query
    const features = new APIFeatures(Course.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    // Execute query
    const courses = await features.query;

    // Send response
    res.status(200).json({
        status: 'success',
        results: courses.length,
        data: {
            courses
        }
    });
});

exports.getCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.id)
        .populate('instructor', 'name email')
        .populate('students', 'name email');

    if (!course) {
        return next(new AppError('No course found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            course
        }
    });
});

exports.createCourse = catchAsync(async (req, res, next) => {
    // Add instructor to request body
    req.body.instructor = req.user.id;

    const course = await Course.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            course
        }
    });
});

exports.updateCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return next(new AppError('No course found with that ID', 404));
    }

    // Check if user is the instructor
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new AppError('You are not authorized to update this course', 403));
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            course: updatedCourse
        }
    });
});

exports.deleteCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return next(new AppError('No course found with that ID', 404));
    }

    // Check if user is the instructor
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new AppError('You are not authorized to delete this course', 403));
    }

    await course.remove();

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.enrollInCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return next(new AppError('No course found with that ID', 404));
    }

    // Check if user is already enrolled
    if (course.students.includes(req.user.id)) {
        return next(new AppError('You are already enrolled in this course', 400));
    }

    // Add user to course students
    course.students.push(req.user.id);
    await course.save();

    // Add course to user's enrolled courses
    req.user.enrolledCourses.push(course._id);
    await req.user.save();

    res.status(200).json({
        status: 'success',
        message: 'Successfully enrolled in course'
    });
});

exports.getEnrolledCourses = catchAsync(async (req, res, next) => {
    const courses = await Course.find({ students: req.user.id });

    res.status(200).json({
        status: 'success',
        results: courses.length,
        data: {
            courses
        }
    });
});

exports.searchCourses = catchAsync(async (req, res, next) => {
    const searchQuery = req.query.q;

    if (!searchQuery) {
        return next(new AppError('Please provide a search query', 400));
    }

    const courses = await Course.find({
        $text: { $search: searchQuery }
    }).sort({ score: { $meta: 'textScore' } });

    res.status(200).json({
        status: 'success',
        results: courses.length,
        data: {
            courses
        }
    });
}); 