// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Theme Settings
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            const selectedTheme = this.value;
            document.body.className = `theme-${selectedTheme}`;
            localStorage.setItem('theme', selectedTheme);
            showToast(`Theme changed to ${selectedTheme}`, 'success');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        themeSelect.value = savedTheme;
        document.body.className = `theme-${savedTheme}`;
    }

    // Language Settings
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            localStorage.setItem('language', selectedLanguage);
            showToast(`Language changed to ${selectedLanguage}`, 'success');
            // In a real application, you would reload the page with the new language
        });

        // Load saved language
        const savedLanguage = localStorage.getItem('language') || 'en';
        languageSelect.value = savedLanguage;
    }

    // Notification Settings
    const notificationToggles = document.querySelectorAll('.notification-toggle');
    notificationToggles.forEach(toggle => {
        // Load saved notification settings
        const settingKey = toggle.getAttribute('data-setting');
        const savedSetting = localStorage.getItem(`notification_${settingKey}`);
        if (savedSetting !== null) {
            toggle.checked = savedSetting === 'true';
        }

        toggle.addEventListener('change', function() {
            const setting = this.getAttribute('data-setting');
            const isEnabled = this.checked;
            localStorage.setItem(`notification_${setting}`, isEnabled);
            showToast(`${setting} notifications ${isEnabled ? 'enabled' : 'disabled'}`, 'info');
        });
    });

    // Privacy Settings
    const privacyToggles = document.querySelectorAll('.privacy-toggle');
    privacyToggles.forEach(toggle => {
        // Load saved privacy settings
        const settingKey = toggle.getAttribute('data-setting');
        const savedSetting = localStorage.getItem(`privacy_${settingKey}`);
        if (savedSetting !== null) {
            toggle.checked = savedSetting === 'true';
        }

        toggle.addEventListener('change', function() {
            const setting = this.getAttribute('data-setting');
            const isEnabled = this.checked;
            localStorage.setItem(`privacy_${setting}`, isEnabled);
            showToast(`${setting} setting ${isEnabled ? 'enabled' : 'disabled'}`, 'info');
        });
    });

    // Account Settings
    const accountForm = document.getElementById('accountForm');
    if (accountForm) {
        accountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Basic validation
            if (!email || !currentPassword) {
                showToast('Please fill in all required fields', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }

            // Password validation if new password is provided
            if (newPassword) {
                if (newPassword.length < 8) {
                    showToast('New password must be at least 8 characters long', 'error');
                    return;
                }

                if (newPassword !== confirmPassword) {
                    showToast('New passwords do not match', 'error');
                    return;
                }
            }

            // Here you would typically send the data to your server
            showToast('Account settings updated successfully!', 'success');
            this.reset();
        });
    }

    // Data Management
    const clearDataButton = document.getElementById('clearDataButton');
    if (clearDataButton) {
        clearDataButton.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear all your data? This action cannot be undone.')) {
                // Clear all local storage
                localStorage.clear();
                showToast('All data has been cleared', 'success');
                // Reload the page to reflect changes
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        });
    }

    // Export Data
    const exportDataButton = document.getElementById('exportDataButton');
    if (exportDataButton) {
        exportDataButton.addEventListener('click', function() {
            // Get all stored data
            const data = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                data[key] = localStorage.getItem(key);
            }

            // Create and download JSON file
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'talent-tutorial-data.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            showToast('Data exported successfully!', 'success');
        });
    }

    // Import Data
    const importDataInput = document.getElementById('importDataInput');
    if (importDataInput) {
        importDataInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        const data = JSON.parse(e.target.result);
                        // Clear existing data
                        localStorage.clear();
                        // Import new data
                        for (const key in data) {
                            localStorage.setItem(key, data[key]);
                        }
                        showToast('Data imported successfully!', 'success');
                        // Reload the page to reflect changes
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    } catch (error) {
                        showToast('Invalid data file', 'error');
                    }
                };
                reader.readAsText(file);
            }
        });
    }

    // Help & Support
    const helpItems = document.querySelectorAll('.help-item');
    helpItems.forEach(item => {
        item.addEventListener('click', function() {
            const question = this.querySelector('h6').textContent;
            const answer = this.querySelector('.help-answer');
            answer.classList.toggle('show');
            this.querySelector('.help-icon').classList.toggle('rotate');
        });
    });

    // Feedback Form
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const feedbackType = document.getElementById('feedbackType').value;
            const feedbackMessage = document.getElementById('feedbackMessage').value;

            if (!feedbackMessage) {
                showToast('Please enter your feedback message', 'error');
                return;
            }

            // Here you would typically send the feedback to your server
            showToast('Thank you for your feedback!', 'success');
            this.reset();
        });
    }
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