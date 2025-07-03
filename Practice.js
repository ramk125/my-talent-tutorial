// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation bar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Modal form validation
    // Login form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            
            if (username.trim() === '' || password.trim() === '') {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the data to the server
            console.log('Login submitted:', { username, password });
            alert('Login successful! (This is a demo)');
            
            // Close the modal
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            loginModal.hide();
        });
    }

    // Registration form validation
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Basic validation
            if (fullName.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (password.length < 6) {
                alert('Password should be at least 6 characters long');
                return;
            }
            
            // Here you would typically send the data to the server
            console.log('Registration submitted:', { fullName, email, password });
            alert('Registration successful! (This is a demo)');
            
            // Close the modal
            const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            registerModal.hide();
        });
    }

    // Class card hover effect
    const classCards = document.querySelectorAll('.class-card');
    classCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Subject card click event
    const subjectCards = document.querySelectorAll('.subject-card');
    subjectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a button inside the card
            if (!e.target.classList.contains('btn')) {
                const title = this.querySelector('.subject-title').textContent;
                alert(`You clicked on ${title}. This would navigate to the subject page in a real application.`);
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}. This would perform a real search in a full application.`);
            } else {
                alert('Please enter a search term');
            }
        });
    }

    // Mobile menu close when clicking a link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) { // Bootstrap lg breakpoint
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Demo functionality for "Explore" buttons
    const exploreButtons = document.querySelectorAll('.class-card .btn-primary');
    exploreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const classRange = this.parentElement.querySelector('h5').textContent;
            alert(`Exploring ${classRange}. This would show courses for this class range in a real application.`);
        });
    });
});