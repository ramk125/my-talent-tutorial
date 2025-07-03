// API Configuration
const API_URL = 'http://localhost:5000/api';

// Helper function for API calls
async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Something went wrong');
        }

        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Authentication API calls
const auth = {
    register: (userData) => apiCall('/auth/register', 'POST', userData),
    login: (credentials) => apiCall('/auth/login', 'POST', credentials),
    logout: () => apiCall('/auth/logout', 'POST'),
    getCurrentUser: () => apiCall('/auth/me')
};

// User API calls
const users = {
    getProfile: () => apiCall('/users/profile'),
    updateProfile: (data) => apiCall('/users/profile', 'PUT', data),
    updateSettings: (settings) => apiCall('/users/settings', 'PUT', settings),
    getEnrolledCourses: () => apiCall('/users/courses'),
    enrollInCourse: (courseId) => apiCall(`/users/courses/${courseId}`, 'POST')
};

// Course API calls
const courses = {
    getAll: () => apiCall('/courses'),
    getById: (id) => apiCall(`/courses/${id}`),
    create: (courseData) => apiCall('/courses', 'POST', courseData),
    update: (id, courseData) => apiCall(`/courses/${id}`, 'PUT', courseData),
    delete: (id) => apiCall(`/courses/${id}`, 'DELETE'),
    addRating: (id, ratingData) => apiCall(`/courses/${id}/ratings`, 'POST', ratingData)
};

// Message API calls
const messages = {
    send: (messageData) => apiCall('/messages', 'POST', messageData),
    getAll: () => apiCall('/messages'),
    getById: (id) => apiCall(`/messages/${id}`),
    updateStatus: (id, status) => apiCall(`/messages/${id}/status`, 'PATCH', { status }),
    delete: (id) => apiCall(`/messages/${id}`, 'DELETE')
};

// Theme management
const theme = {
    get: () => localStorage.getItem('theme') || 'light',
    set: (theme) => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    },
    toggle: () => {
        const currentTheme = theme.get();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        theme.set(newTheme);
        return newTheme;
    }
};

// Form validation
const validation = {
    email: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    password: (password) => {
        return password.length >= 6;
    },
    required: (value) => {
        return value.trim() !== '';
    }
};

// Export all utilities
window.api = {
    auth,
    users,
    courses,
    messages,
    theme,
    validation
}; 