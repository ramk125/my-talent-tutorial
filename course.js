document.addEventListener('DOMContentLoaded', function() {
    // 1. Search Functionality
    const searchInput = document.querySelector('.search-box input');
    const searchIcon = document.querySelector('.search-box i');
    
    searchIcon.addEventListener('click', function() {
        if (searchInput.value.trim() !== '') {
            alert(`Searching for: ${searchInput.value}`);
            // In a real app, you would redirect to search results or filter courses
        } else {
            searchInput.focus();
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && searchInput.value.trim() !== '') {
            alert(`Searching for: ${searchInput.value}`);
        }
    });

    // 2. Filter Functionality
    const filterCheckboxes = document.querySelectorAll('.filter-section input[type="checkbox"]');
    const filterRadios = document.querySelectorAll('.filter-section input[type="radio"]');
    
    function applyFilters() {
        const selectedCategories = Array.from(document.querySelectorAll('.filter-section input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.nextElementSibling.textContent);
        
        const priceRange = document.querySelector('.filter-section input[type="radio"]:checked')?.nextElementSibling.textContent || 'All';
        
        console.log('Applied filters:', {
            categories: selectedCategories,
            price: priceRange
        });
        
        // In a real app, you would filter the courses based on these selections
        alert(`Filters applied:\nCategories: ${selectedCategories.join(', ')}\nPrice: ${priceRange}`);
    }
    
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    filterRadios.forEach(radio => {
        radio.addEventListener('change', applyFilters);
    });

    // 3. Sort Dropdown
    // const sortDropdown = document.querySelector('.filter-section .dropdown');
    // const sortOptions = document.querySelectorAll('.filter-section .dropdown-item');
    
    sortOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const sortBy = this.textContent;
            const dropdownButton = sortDropdown.querySelector('.dropdown-toggle');
            
            dropdownButton.textContent = sortBy;
            console.log('Sorted by:', sortBy);
            
            // In a real app, you would sort the courses
            alert(`Courses sorted by: ${sortBy}`);
        });
    });

    // 4. Course Card Interactions
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        // Hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
        
        // Enroll button click
        const enrollBtn = card.querySelector('.enroll-btn');
        if (enrollBtn) {
            enrollBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const courseTitle = card.querySelector('.card-title').textContent;
                alert(`Enrolling in: ${courseTitle}`);
                
                // In a real app, you would add to cart or redirect to checkout
            });
        }
        
        // Add to cart button click
        const addToCartBtns = card.querySelectorAll('.btn-success');
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productName = card.querySelector('.card-title').textContent;
                alert(`Added to cart: ${productName}`);
            });
        });
    });

    // 5. Class Level Cards
    const classLevelCards = document.querySelectorAll('.col .card.text-center');
    
    classLevelCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a button inside the card
            if (!e.target.classList.contains('btn')) {
                const classLevel = card.querySelector('.card-title').textContent;
                alert(`Showing courses for: ${classLevel}`);
                
                // In a real app, you would filter courses by class level
            }
        });
    });

    // 6. Study Material Cards
    const studyMaterialCards = document.querySelectorAll('.study-material-section .card');
    
    studyMaterialCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a button inside the card
            if (!e.target.classList.contains('btn')) {
                const materialType = card.querySelector('.card-title').textContent;
                alert(`Showing ${materialType} resources`);
                
                // In a real app, you would show the selected study material
            }
        });
    });

    // 7. Pagination
    const paginationItems = document.querySelectorAll('.pagination .page-item:not(.disabled)');
    
    paginationItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const pageText = this.querySelector('.page-link').textContent;
            alert(`Loading page: ${pageText}`);
            
            // In a real app, you would load the corresponding page
        });
    });

    // 8. Responsive adjustments
    function handleResize() {
        if (window.innerWidth < 768) {
            // Mobile adjustments
            document.querySelectorAll('.course-card .card-body').forEach(body => {
                body.style.padding = '1rem';
            });
        } else {
            // Desktop adjustments
            document.querySelectorAll('.course-card .card-body').forEach(body => {
                body.style.padding = '';
            });
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Run once on load

    // 9. Cart functionality simulation
    let cartItems = 0;
    const addToCartButtons = document.querySelectorAll('.btn-success:not(.enroll-btn)');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartItems++;
            updateCartCount();
        });
    });
    
    function updateCartCount() {
        // In a real app, you would update a cart icon counter
        console.log(`Cart items: ${cartItems}`);
    }

    // 10. Course rating interaction
    const ratingStars = document.querySelectorAll('.course-rating i');
    
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const ratingContainer = this.parentElement;
            const stars = ratingContainer.querySelectorAll('i');
            const clickedIndex = Array.from(stars).indexOf(this);
            
            stars.forEach((s, index) => {
                if (index <= clickedIndex) {
                    s.classList.add('fas', 'text-warning');
                    s.classList.remove('far');
                } else {
                    s.classList.add('far');
                    s.classList.remove('fas', 'text-warning');
                }
            });
            
            // Update rating text
            const ratingText = ratingContainer.querySelector('span');
            const newRating = (clickedIndex + 1).toFixed(1);
            ratingText.textContent = `(${newRating})`;
            
            // In a real app, you would send this rating to your backend
            console.log(`Rated ${newRating} stars`);
        });
    });
});