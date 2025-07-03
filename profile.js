// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Profile image upload handling
    const profileImageInput = document.getElementById('profileImageInput');
    const profileImage = document.getElementById('profileImage');

    if (profileImageInput && profileImage) {
        profileImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        profileImage.src = e.target.result;
                        showToast('Profile image updated successfully!', 'success');
                    };
                    reader.readAsDataURL(file);
                } else {
                    showToast('Please select a valid image file', 'error');
                }
            }
        });
    }

    // Profile form submission
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const bio = document.getElementById('bio').value;

            // Basic validation
            if (!fullName || !email) {
                showToast('Please fill in all required fields', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }

            // Phone validation (optional)
            if (phone && !/^\+?[\d\s-]{10,}$/.test(phone)) {
                showToast('Please enter a valid phone number', 'error');
                return;
            }

            // Update profile information
            document.querySelector('h4.mb-1').textContent = fullName;
            
            // Close modal
            const editProfileModal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
            if (editProfileModal) {
                editProfileModal.hide();
            }

            showToast('Profile updated successfully!', 'success');
        });
    }

    // Password form submission
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Basic validation
            if (!currentPassword || !newPassword || !confirmPassword) {
                showToast('Please fill in all password fields', 'error');
                return;
            }

            // Password strength validation
            if (newPassword.length < 8) {
                showToast('New password must be at least 8 characters long', 'error');
                return;
            }

            // Password match validation
            if (newPassword !== confirmPassword) {
                showToast('New passwords do not match', 'error');
                return;
            }

            // Clear form
            passwordForm.reset();

            // Close modal
            const changePasswordModal = bootstrap.Modal.getInstance(document.getElementById('changePasswordModal'));
            if (changePasswordModal) {
                changePasswordModal.hide();
            }

            showToast('Password changed successfully!', 'success');
        });
    }

    // Course progress animation
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const targetWidth = Math.floor(Math.random() * 100);
        let currentWidth = 0;
        const interval = setInterval(() => {
            if (currentWidth >= targetWidth) {
                clearInterval(interval);
            } else {
                currentWidth++;
                bar.style.width = `${currentWidth}%`;
                bar.setAttribute('aria-valuenow', currentWidth);
                bar.parentElement.nextElementSibling.querySelector('.progress-text').textContent = `${currentWidth}% Complete`;
            }
        }, 30);
    });

    // Mark course as complete
    const completeButtons = document.querySelectorAll('.btn-complete');
    completeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseCard = this.closest('.enrolled-course');
            const progressBar = courseCard.querySelector('.progress-bar');
            const progressText = courseCard.querySelector('.progress-text');
            const badge = courseCard.querySelector('.badge');

            if (progressBar.style.width !== '100%') {
                progressBar.style.width = '100%';
                progressBar.setAttribute('aria-valuenow', 100);
                progressText.textContent = '100% Complete';
                badge.textContent = 'Completed';
                badge.classList.remove('bg-primary');
                badge.classList.add('bg-success');
                this.disabled = true;
                showToast('Course marked as complete!', 'success');
            }
        });
    });

    // Download certificate
    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseTitle = this.closest('.enrolled-course').querySelector('.course-title').textContent;
            const progressBar = this.closest('.enrolled-course').querySelector('.progress-bar');
            
            if (progressBar.style.width === '100%') {
                showToast(`Preparing certificate for ${courseTitle}...`, 'info');
                // Simulate download delay
                setTimeout(() => {
                    showToast('Certificate downloaded successfully!', 'success');
                }, 2000);
            } else {
                showToast('Please complete the course first', 'error');
            }
        });
    });

    // Notification toggles
    const notificationToggles = document.querySelectorAll('.notification-toggle');
    notificationToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const setting = this.getAttribute('data-setting');
            const status = this.checked ? 'enabled' : 'disabled';
            showToast(`${setting} notifications ${status}`, 'info');
        });
    });

    // Social media links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').classList[1].split('-')[1];
            showToast(`Redirecting to ${platform}...`, 'info');
            // In a real application, you would redirect to the actual social media URL
        });
    });

    // Animate statistics
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const targetValue = parseInt(stat.getAttribute('data-value'));
        let currentValue = 0;
        const increment = targetValue / 50;
        const interval = setInterval(() => {
            if (currentValue >= targetValue) {
                clearInterval(interval);
                stat.textContent = targetValue;
            } else {
                currentValue = Math.min(currentValue + increment, targetValue);
                stat.textContent = Math.floor(currentValue);
            }
        }, 20);
    });
});

// Toast notification function
function showToast(message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'error' ? 'danger' : type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast, {
        autohide: true,
        delay: 3000
    });
    bsToast.show();

    // Remove toast after it's hidden
    toast.addEventListener('hidden.bs.toast', function() {
        toast.remove();
    });
}

// Create toast container if it doesn't exist
function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(container);
    return container;
} 