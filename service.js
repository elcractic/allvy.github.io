// Enhanced Service Data with White-Aqua Theme
const servicesData = [
    {
        name: "Logo Design",
        description: "Professional logo creation that captures your brand essence",
        icon: "fas fa-palette",
        specialists: [
            {
                username: "@vege7ables",
                role: "Logo Designer",
                portfolio: "team/muazam.html",
                initials: "VG"
            },
            {
                username: "@aayanhussain00",
                role: "Logo Designer / Store Maker",
                portfolio: "team/aayan.html",
                initials: "AH"
            }
        ]
    },
    {
        name: "Web Development",
        description: "Custom websites and web applications built to perfection",
        icon: "fas fa-code",
        specialists: [
            {
                username: "@areebdevs",
                role: "Programmer / Web Designer",
                portfolio: "team/areeb.html",
                initials: "AD"
            },
            {
                username: "@elcractic.efx",
                role: "Programmer , Web Designer , Software Developer , VPS/RDP Managements",
                portfolio: "team/samir.html",
                initials: "EE"
            },
            {
                username: "@zaidsultaan9",
                role: "Python Programmer / Tech Issue Solver",
                portfolio: "team/mzaid.html",
                initials: "ZS"
            }
        ]
    },
    {
        name: "Video Editing",
        description: "Professional video editing that tells your story",
        icon: "fas fa-film",
        specialists: [
            {
                username: "@saadatt57",
                role: "Video Editor",
                portfolio: "team/saadatt.html",
                initials: "SA"
            },
            {
                username: "@valx_itachi",
                role: "Video & Photo Editor / Graphic Designer",
                portfolio: "team/",
                initials: "VI"
            }
        ]
    },
    {
        name: "Graphic Design",
        description: "Stunning visual content that makes an impact",
        icon: "fas fa-paint-brush",
        specialists: [
            {
                username: "@valx_itachi",
                role: "Video & Photo Editor / Graphic Designer",
                portfolio: "#",
                initials: "VI"
            }
        ]
    },
    {
        name: "E-commerce Solutions",
        description: "Complete online store setup and optimization",
        icon: "fas fa-store",
        specialists: [
            {
                username: "@aayanhussain00",
                role: "Logo Designer / Store Maker",
                portfolio: "#",
                initials: "AM"
            }
        ]
    },

    {
        name: "Sales Services",
        description: "Professional sales strategies and execution",
        icon: "fas fa-chart-line",
        specialists: [
            {
                username: "@ayooothemaster",
                role: "Sales Specialist",
                portfolio: "team/yash.html",
                initials: "AY"
            }
        ]
    }
];

// DOM Elements
const servicesGrid = document.getElementById('servicesGrid');
const serviceModal = document.getElementById('serviceModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const specialistsList = document.getElementById('specialistsList');
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Initialize the page
function init() {
    setupCanvas();
    renderServices();
    setupEventListeners();
    animateParticles();
    window.addEventListener('resize', setupCanvas);
}

// Particle System for Interactive Background
let particles = [];
const particleCount = window.innerWidth < 768 ? 30 : 60;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 2;
        this.density = Math.random() * 30 + 1;
        this.color = `rgba(0, 198, 251, ${Math.random() * 0.4 + 0.1})`;
        this.baseX = this.x;
        this.baseY = this.y;
        this.velocity = {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5
        };
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    
    update() {
        // Move particles
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.velocity.x *= -1;
        if (this.y < 0 || this.y > canvas.height) this.velocity.y *= -1;
        
        // Draw connections to nearby particles
        for (let i = 0; i < particles.length; i++) {
            const dx = this.x - particles[i].x;
            const dy = this.y - particles[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 198, 251, ${1 - distance/100})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(particles[i].x, particles[i].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        
        this.draw();
    }
}

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
    
    requestAnimationFrame(animateParticles);
}

// Mouse interaction with particles
let mouse = {
    x: null,
    y: null,
    radius: 100
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    
    // Push particles away from mouse
    for (let i = 0; i < particles.length; i++) {
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius * 2;
            
            particles[i].velocity.x = -forceDirectionX * force;
            particles[i].velocity.y = -forceDirectionY * force;
        }
    }
});

// Render all services with enhanced UI// Render all services with enhanced UI
function renderServices() {
    servicesGrid.innerHTML = '';
    
    servicesData.forEach((service, index) => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.style.animationDelay = `${index * 0.1 + 0.1}s`;
        
        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <div class="specialist-count">
                ${service.specialists.length} ${service.specialists.length > 1 ? 'Specialists' : 'Specialist'}
            </div>
        `;
        
        serviceCard.addEventListener('click', () => openServiceModal(service));
        servicesGrid.appendChild(serviceCard);
    });
}

// Open modal with service details
function openServiceModal(service) {
    modalTitle.textContent = service.name;
    specialistsList.innerHTML = '';
    
    service.specialists.forEach(specialist => {
        const specialistCard = document.createElement('div');
        specialistCard.className = 'specialist-card';
        specialistCard.innerHTML = `
            <div class="specialist-avatar">${specialist.initials}</div>
            <div class="specialist-info">
                <h4>${specialist.username}</h4>
                <p>${specialist.role}</p>
                <a href="${specialist.portfolio}" target="_blank" class="portfolio-link">
                    <i class="fas fa-external-link-alt"></i> View Portfolio
                </a>
            </div>
        `;
        specialistsList.appendChild(specialistCard);
    });
    
    // Show modal with animation
    serviceModal.style.display = 'flex';
    setTimeout(() => {
        serviceModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }, 10);
}

// Close modal with animation
function closeServiceModal() {
    serviceModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
        serviceModal.style.display = 'none';
    }, 400);
}

// Set up event listeners
function setupEventListeners() {
    closeModal.addEventListener('click', closeServiceModal);
    
    // Close modal when clicking outside content
    window.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            closeServiceModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && serviceModal.classList.contains('show')) {
            closeServiceModal();
        }
    });
}

// Initialize the page when loaded
document.addEventListener('DOMContentLoaded', init);