// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const heroSearchInput = document.querySelector('.search-box input');
    const heroSearchButton = document.querySelector('.search-box button');
    const navbarSearchInput = document.querySelector('.form-control[type="search"]');
    const classCards = document.querySelectorAll('.class-card');
    const subjectCards = document.querySelectorAll('.subject-card');
    const featureCards = document.querySelectorAll('.feature-card');
    const cards = document.querySelectorAll('.card');
    const buttons = document.querySelectorAll('.btn');
    const menuItems = document.querySelectorAll('.navbar-nav .nav-item a');

    // Initialize theme
    const savedTheme = window.api.theme.get();
    window.api.theme.set(savedTheme);

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add active class to current navigation item
    const currentLocation = location.href;
    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
        }
    });

    // Handle search functionality
    function handleSearch(query) {
        if (query) {
            window.location.href = `courses.html?search=${encodeURIComponent(query)}`;
        }
    }

    // Handle hero section search
    if (heroSearchInput && heroSearchButton) {
        heroSearchButton.addEventListener('click', () => {
            handleSearch(heroSearchInput.value.trim());
        });

        heroSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch(heroSearchInput.value.trim());
            }
        });
    }

    // Handle navbar search
    if (navbarSearchInput) {
        navbarSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch(navbarSearchInput.value.trim());
            }
        });

        // Add input event listener for real-time search suggestions
        navbarSearchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query) {
                // Here you can implement real-time search suggestions
                console.log('Searching for:', query);
            }
        });
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            try {
                const result = await window.api.auth.login({ email, password });
                if (result.user) {
                    // Close modal and redirect to profile
                    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                    modal.hide();
                    window.location.href = 'profile.html';
                }
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // Handle register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validate form
            if (!window.api.validation.required(name)) {
                alert('Please enter your full name');
                return;
            }
            if (!window.api.validation.email(email)) {
                alert('Please enter a valid email address');
                return;
            }
            if (!window.api.validation.password(password)) {
                alert('Password must be at least 6 characters long');
                return;
            }
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            try {
                const result = await window.api.auth.register({ name, email, password });
                if (result.user) {
                    // Close modal and redirect to profile
                    const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
                    modal.hide();
                    window.location.href = 'profile.html';
                }
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // Handle class card clicks
    classCards.forEach(card => {
        card.addEventListener('click', () => {
            const level = card.querySelector('h5').textContent;
            window.location.href = `courses.html?level=${encodeURIComponent(level)}`;
        });
    });

    // Handle subject card clicks
    subjectCards.forEach(card => {
        const startLearningBtn = card.querySelector('.btn-primary');
        const viewDetailsBtn = card.querySelector('.btn-outline-primary');

        if (startLearningBtn) {
            startLearningBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const subject = card.querySelector('.subject-title').textContent;
                window.location.href = `course.html?subject=${encodeURIComponent(subject)}`;
            });
        }

        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const subject = card.querySelector('.subject-title').textContent;
                window.location.href = `course.html?subject=${encodeURIComponent(subject)}&view=details`;
            });
        }
    });

    // Add animation to cards on scroll
    const cardObserverOptions = {
        threshold: 0.1
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, cardObserverOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        cardObserver.observe(card);
    });

    // Feature cards animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });

    // Add hover effect to buttons
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Switch between login and register modals
    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => {
        button.addEventListener('click', function() {
            const targetModal = this.getAttribute('data-bs-target');
            const currentModal = this.closest('.modal');
            
            if (currentModal) {
                const currentModalInstance = bootstrap.Modal.getInstance(currentModal);
                currentModalInstance.hide();
            }
        });
    });

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'btn btn-primary position-fixed bottom-0 end-0 m-3 rounded-circle';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.style.width = '50px';
    scrollToTopBtn.style.height = '50px';
    scrollToTopBtn.style.display = 'none';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Responsive adjustments
    function handleResponsive() {
        const navbar = document.querySelector('.navbar');
        if (window.innerWidth < 992) {
            navbar.classList.add('bg-white');
        } else {
            navbar.classList.remove('bg-white');
        }
    }

    window.addEventListener('resize', handleResponsive);
    handleResponsive();

    // Load featured courses
    async function loadFeaturedCourses() {
        try {
            const courses = await window.api.courses.getAll();
            const featuredCourses = courses.slice(0, 3); // Get first 3 courses
            
            const subjectCardsContainer = document.querySelector('.row');
            if (subjectCardsContainer) {
                featuredCourses.forEach(course => {
                    const card = createCourseCard(course);
                    subjectCardsContainer.appendChild(card);
                });
            }
        } catch (error) {
            console.error('Error loading featured courses:', error);
        }
    }

    // Create course card element
    function createCourseCard(course) {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        
        col.innerHTML = `
            <div class="subject-card">
                <div class="subject-image position-relative">
                    <img src="${course.image}" alt="${course.title}">
                    <span class="class-badge">${course.level}</span>
                </div>
                <div class="subject-content">
                    <h5 class="subject-title">${course.title}</h5>
                    <p class="subject-description">${course.description}</p>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary">Start Learning</button>
                        <button class="btn btn-outline-primary">View Details</button>
                    </div>
                </div>
            </div>
        `;
        
        return col;
    }

    // Load featured courses on page load
    loadFeaturedCourses();
}); 