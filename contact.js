document.addEventListener('DOMContentLoaded', function() {
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const contactData = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Here you would typically make an API call to send contact message
            console.log('Sending contact message:', contactData);
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Handle map initialization
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Here you would typically initialize a map using a library like Google Maps
        console.log('Initializing map...');
        
        // For demo purposes, just show a placeholder
        mapElement.innerHTML = '<div class="map-placeholder">Map will be displayed here</div>';
    }

    // Handle FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            // Close all other answers
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                    otherItem.querySelector('.faq-question').classList.remove('active');
                }
            });
            
            // Toggle current answer
            const isOpen = answer.style.display === 'block';
            answer.style.display = isOpen ? 'none' : 'block';
            question.classList.toggle('active', !isOpen);
        });
    });

    // Handle social media links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            const url = this.getAttribute('href');
            
            // Here you would typically track social media clicks
            console.log(`Redirecting to ${platform}...`);
            window.open(url, '_blank');
        });
    });

    // Handle office hours display
    const officeHours = document.querySelectorAll('.office-hour');
    officeHours.forEach(hour => {
        hour.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
            this.style.transition = 'background-color 0.3s ease';
        });
        
        hour.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

    // Handle emergency contact
    const emergencyBtn = document.getElementById('emergencyBtn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function() {
            if (confirm('This will connect you to our emergency support line. Continue?')) {
                // Here you would typically initiate an emergency call
                console.log('Initiating emergency contact...');
                alert('Connecting to emergency support...');
            }
        });
    }
}); 