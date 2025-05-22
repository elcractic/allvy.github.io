document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Header scroll effect with debounce
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 66);
    }, false);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate statistics counting
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const duration = 1000;
        const startTime = performance.now();
        
        function updateCounters(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const current = Math.floor(progress * target);
                stat.textContent = current;
            });
            
            if (progress < 1) {
                requestAnimationFrame(updateCounters);
            }
        }
        
        requestAnimationFrame(updateCounters);
    }
    
    let statsAnimated = false;
    function checkStatsAnimation() {
        const statsSection = document.querySelector('.hero');
        const statsPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (!statsAnimated && statsPosition < screenPosition) {
            statsAnimated = true;
            animateStats();
            window.removeEventListener('scroll', checkStatsAnimation);
        }
    }
    
    window.addEventListener('scroll', checkStatsAnimation);
    checkStatsAnimation();

    // Fixed Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    let isAnimating = false;
    let testimonialInterval;
    
    function showTestimonial(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateX(100px)';
            testimonial.classList.remove('active');
        });
        
        // Update current index
        currentTestimonial = index;
        if (currentTestimonial >= testimonials.length) currentTestimonial = 0;
        if (currentTestimonial < 0) currentTestimonial = testimonials.length - 1;
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentTestimonial].classList.add('active');
        
        // Show new testimonial
        setTimeout(() => {
            testimonials[currentTestimonial].style.opacity = '1';
            testimonials[currentTestimonial].style.transform = 'translateX(0)';
            testimonials[currentTestimonial].classList.add('active');
            isAnimating = false;
        }, 300);
    }
    
    function startTestimonialSlider() {
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
    }
    
    // Initialize slider
    testimonials.forEach((testimonial, index) => {
        if (index === 0) {
            testimonial.style.opacity = '1';
            testimonial.style.transform = 'translateX(0)';
            testimonial.classList.add('active');
        } else {
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateX(100px)';
        }
    });
    dots[0].classList.add('active');
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentTestimonial) {
                showTestimonial(index);
                startTestimonialSlider();
            }
        });
    });
    
    startTestimonialSlider();

    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 60,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Animate elements on scroll with Intersection Observer
    const animateOnScroll = function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        document.querySelectorAll('.service-card, .feature-item, .step, .contact-info, .contact-form').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            observer.observe(element);
        });
    };
    
    // Run animation on load
    window.addEventListener('load', animateOnScroll);
    
    // Fixed Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const service = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !service || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, service, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Fixed Newsletter Form in Footer
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // Here you would typically send the email to your server
            console.log('Newsletter subscription:', email);
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
    
    // Make all links in footer work properly
    document.querySelectorAll('footer a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    });
});