document.addEventListener('DOMContentLoaded', function () {
    // Initialize Bootstrap modals once
    const loginModalElement = document.getElementById('loginModal');
    const registerModalElement = document.getElementById('registerModal');
    const loginModal = new bootstrap.Modal(loginModalElement);
    const registerModal = new bootstrap.Modal(registerModalElement);

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(el => new bootstrap.Tooltip(el));

    // Navigation button active toggle
    const navButtons = document.querySelectorAll('.navbar-nav .btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Handle course enrollment buttons
    const enrollButtons = document.querySelectorAll('.btn-primary:not([data-bs-toggle])');
    enrollButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const courseCard = this.closest('.card');
            const courseTitle = courseCard.querySelector('.card-title').textContent;

            const isLoggedIn = Boolean(localStorage.getItem('userLoggedIn')); // Update with real check

            if (!isLoggedIn) {
                loginModal.show();
                localStorage.setItem('pendingEnrollment', courseTitle);
            } else {
                showEnrollmentSuccess(courseTitle);
            }
        });
    });

    // Handle "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.btn-success');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const courseCard = this.closest('.card');
            const courseTitle = courseCard.querySelector('.card-title').textContent;
            showToast(`${courseTitle} added to cart!`, 'success');
        });
    });

    // Handle "View Subjects" buttons
    const viewSubjectButtons = document.querySelectorAll('a[href="#"]');
    viewSubjectButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const courseCard = this.closest('.card');
            const courseTitle = courseCard.querySelector('.card-title').textContent;
            showToast(`Loading subjects for ${courseTitle}...`, 'info');
        });
    });

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            // Simulated login
            localStorage.setItem('userLoggedIn', 'true');
            showToast('Login successful!', 'success');

            const pendingEnrollment = localStorage.getItem('pendingEnrollment');
            if (pendingEnrollment) {
                showEnrollmentSuccess(pendingEnrollment);
                localStorage.removeItem('pendingEnrollment');
            }

            loginModal.hide();
        });
    }

    // Handle registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                showToast('Passwords do not match!', 'danger');
                return;
            }

            // Simulated registration
            showToast('Registration successful! Please login to continue.', 'success');
            registerModal.hide();
            loginModal.show();
        });
    }

    // Debounced search filter
    const searchInput = document.querySelector('.form-control[type="search"]');
    if (searchInput) {
        let debounceTimeout;
        searchInput.addEventListener('input', function () {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                const searchTerm = this.value.toLowerCase();
                const courseCards = document.querySelectorAll('.card');
                courseCards.forEach(card => {
                    const title = card.querySelector('.card-title').textContent.toLowerCase();
                    const description = card.querySelector('.card-text').textContent.toLowerCase();
                    card.style.display = (title.includes(searchTerm) || description.includes(searchTerm)) ? '' : 'none';
                });
            }, 200);
        });
    }

    // Social media links
    const socialLinks = document.querySelectorAll('.d-flex.gap-3 a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.split(' ')[1].split('-')[1];
            showToast(`Redirecting to our ${platform} page...`, 'info');
        });
    });

    // Footer links
    const footerLinks = document.querySelectorAll('footer a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            showToast(`Loading ${this.textContent} page...`, 'info');
        });
    });

    // Hover effects for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // === Helper Functions ===
    function showToast(message, type = 'info') {
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type} border-0`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');

        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-${getIconForType(type)} me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;

        toastContainer.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();

        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }

    function getIconForType(type) {
        switch (type) {
            case 'success': return 'check-circle';
            case 'danger': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            case 'info':
            default: return 'info-circle';
        }
    }

    function showEnrollmentSuccess(courseTitle) {
        showToast(`Successfully enrolled in ${courseTitle}!`, 'success');
    }
});
