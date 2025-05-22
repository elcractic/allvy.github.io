document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Smooth scrolling for all links
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
    
    // Music Player
    const audio = document.getElementById('bg-music');
    const playBtn = document.getElementById('play-btn');
    const muteBtn = document.getElementById('mute-btn');
    const volumeSlider = document.getElementById('volume-slider');
    
    // Try to autoplay (may be blocked by browser)
    audio.volume = 0.5;
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Autoplay was prevented, show play button
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
    }
    
    playBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            this.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            this.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    muteBtn.addEventListener('click', function() {
        if (audio.muted) {
            audio.muted = false;
            this.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            audio.muted = true;
            this.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
    
    volumeSlider.addEventListener('input', function() {
        audio.volume = this.value;
    });
    
    // Snowflakes/Petals Effect
    function createSnowflakes() {
        const container = document.getElementById('snowflakes-container');
        const snowflakes = ['❄', '❅', '❆', '✻', '✼', '❀', '✽', '✾', '❁'];
        
        for (let i = 0; i < 50; i++) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.innerHTML = snowflakes[Math.floor(Math.random() * snowflakes.length)];
            
            // Random properties
            const size = Math.random() * 20 + 10;
            const posX = Math.random() * window.innerWidth;
            const duration = Math.random() * 10 + 5;
            const delay = Math.random() * 5;
            
            snowflake.style.left = `${posX}px`;
            snowflake.style.fontSize = `${size}px`;
            snowflake.style.animationDuration = `${duration}s`;
            snowflake.style.animationDelay = `${delay}s`;
            
            container.appendChild(snowflake);
        }
    }
    
    createSnowflakes();
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Animate elements when scrolling
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.ecommerce-card, .philosophy-card, .info-card, .step');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    document.querySelectorAll('.ecommerce-card, .philosophy-card, .info-card, .step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});