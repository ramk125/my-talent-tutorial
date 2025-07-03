document.addEventListener('DOMContentLoaded', function () {
    // === Team Member Cards Hover Effect ===
    document.querySelectorAll('.team-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // === Mission Statement Fade-In ===
    const missionStatement = document.querySelector('.mission-statement');
    if (missionStatement) {
        missionStatement.style.opacity = '0';
        missionStatement.style.transition = 'opacity 1s ease-in-out';
        setTimeout(() => {
            missionStatement.style.opacity = '1';
        }, 500);
    }

    // === Statistics Counter Animation on View ===
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'), 10);
        const duration = 2000;
        const increment = target / (duration / 16);
        let count = 0;

        const updateCount = () => {
            count += increment;
            if (count < target) {
                stat.textContent = Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(stat);
    });

    // === Timeline Animation ===
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });

    // === Partner Logos Hover Effect ===
    document.querySelectorAll('.partner-logo').forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            logo.style.filter = 'grayscale(0%)';
            logo.style.transition = 'filter 0.3s ease';
        });
        logo.addEventListener('mouseleave', () => {
            logo.style.filter = 'grayscale(100%)';
        });
    });

    // === Value Cards Click Alert ===
    document.querySelectorAll('.value-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.value-title')?.textContent || 'No Title';
            const description = card.querySelector('.value-description')?.textContent || 'No Description';
            alert(`${title}\n\n${description}`);
        });
    });

    // === Achievements Icon Animation ===
    document.querySelectorAll('.achievement-item').forEach(item => {
        const icon = item.querySelector('.achievement-icon');
        if (!icon) return;
        item.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });
        item.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
        });
    });
});
