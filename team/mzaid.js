document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Typewriter Effect
    const typewriterTexts = [
        "Python Programmer",
        "Tech Expert",
        "Software Developer",
        "Cloud Architect",
        "AI Enthusiast"
    ];
    let currentTextIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.querySelector('.typewriter');
    
    function typeWriter() {
        const currentText = typewriterTexts[currentTextIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
            setTimeout(typeWriter, 500);
        } else {
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeWriter, speed);
        }
    }
    
    setTimeout(typeWriter, 1000);

    // Terminal Simulation
    const terminalCommands = [
        { command: "skills", output: "Python, Django, Flask, AWS, JavaScript, Docker, Machine Learning" },
        { command: "experience", output: "5+ years in software development and cloud architecture" },
        { command: "education", output: "BSc in Computer Science, Certified AWS Solutions Architect" },
        { command: "contact", output: "Email: zaid@example.com | Phone: (555) 123-4567" },
        { command: "help", output: "Available commands: skills, experience, education, contact, projects" }
    ];
    
    const terminalInput = document.querySelector('.terminal-input');
    const terminalBody = document.querySelector('.terminal-body');
    
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim();
            this.value = '';
            
            // Add command to terminal
            const commandElement = document.createElement('p');
            commandElement.innerHTML = `<span class="prompt">$</span> ${command}`;
            terminalBody.insertBefore(commandElement, terminalBody.lastElementChild);
            
            // Process command
            const output = processCommand(command);
            if (output) {
                const outputElement = document.createElement('p');
                outputElement.textContent = output;
                terminalBody.insertBefore(outputElement, terminalBody.lastElementChild);
            }
            
            // Scroll to bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });
    
    function processCommand(command) {
        if (command === 'help' || command === '?') {
            return "Available commands: " + terminalCommands.map(cmd => cmd.command).join(', ');
        }
        
        const foundCommand = terminalCommands.find(cmd => command === cmd.command);
        
        return foundCommand ? foundCommand.output : `Command not found: ${command}. Type "help" for available commands.`;
    }

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            const filter = this.dataset.filter;
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Animate skill bars on scroll
    const skillsSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    const skillsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(skillsSection);
        }
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = 'Send Message';
                submitBtn.style.backgroundColor = '';
            }, 3000);
        });
    }

    // Scroll Reveal Animations
    ScrollReveal().reveal('.about-content, .skill-category, .project-card, .contact-info, .contact-form', {
        delay: 200,
        distance: '50px',
        origin: 'bottom',
        interval: 100
    });

    // Smooth Scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
});