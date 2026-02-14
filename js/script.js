
document.addEventListener('DOMContentLoaded', function() {

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            body.classList.toggle('nav-open');
        });
    }

    // Add active class to navigation links based on current page
    const navLinks = document.querySelectorAll('.main-nav a');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        link.classList.remove('active');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                console.error('Please fill out all fields.');
                return;
            }
            
            console.log('Form Submitted:', { name, email, message });
            
            const submitButton = contactForm.querySelector('button');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;

            // Simulate network request
            setTimeout(() => {
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Thank you! Your message has been sent.';
                successMessage.style.color = 'var(--primary-color)';
                successMessage.style.marginTop = '15px';
                
                if (!contactForm.querySelector('p')) {
                    contactForm.appendChild(successMessage);
                }
                
                contactForm.reset();
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;

                setTimeout(() => successMessage.remove(), 5000);
            }, 1000);
        });
    }

    // Animate elements on scroll using Intersection Observer for better performance
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .timing-block, .category-item, .section-title, .about-summary-image, .about-summary-text, .about-content > div, .contact-section > div, .service-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scrolled');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add a 'scrolled' class for CSS animations
    const style = document.createElement('style');
    style.innerHTML = `
        .service-card, .feature-item, .timing-block, .category-item, .about-summary-image, .about-summary-text, .about-content > div, .contact-section > div, .service-item {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.6s ease-out, transform 0.8s ease-out;
        }
        .service-card.scrolled, .feature-item.scrolled, .timing-block.scrolled, .category-item.scrolled, .about-summary-image.scrolled, .about-summary-text.scrolled, .about-content > div.scrolled, .contact-section > div.scrolled, .service-item.scrolled {
            opacity: 1;
            transform: translateY(0);
        }
        /* Staggered animation for cards */
        .category-item, .feature-item, .timing-block {
             transition-delay: calc(0.07s * var(--item-index));
        }
    `;
    document.head.appendChild(style);

    // Set item index for staggered animation
    const gridItems = document.querySelectorAll('.category-item, .feature-item, .timing-block');
    gridItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index % 4);
    });

});