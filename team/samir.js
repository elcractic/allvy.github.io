document.addEventListener('DOMContentLoaded', function() {
    // ==============================================
    // Mini Music Player Functionality
    // ==============================================
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.volume = 0.7;
    audio.autoplay = true;
    
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const songTitle = document.querySelector('.song-title');
    const artist = document.querySelector('.artist');
    const albumArt = document.querySelector('.album-art img');
    
    // Music playlist - Add your own songs here
    const playlist = [
        {
            title: "Digital Dreams",
            artist: "Code Waves",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            cover: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
        },
        {
            title: "Syntax Symphony",
            artist: "Dev Beats",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            cover: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
        },
        {
            title: "Algorithm Groove",
            artist: "Binary Jazz",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            cover: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
        }
    ];
    
    let currentTrack = 0;
    

    function loadTrack(trackIndex) {
        const track = playlist[trackIndex];
        audio.src = track.src;
        songTitle.textContent = track.title;
        artist.textContent = track.artist;
        albumArt.src = track.cover;
        

        currentTrack = trackIndex;
    }
    

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Toggles the playback state of the audio.
 * If the audio is currently paused, it will start playing and update the play button to show a pause icon.
/*******  ad9ffdf1-120c-4c0d-a235-a283885c5c8c  *******/
    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
    

    function nextTrack() {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    

    function prevTrack() {
        currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrack);
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    // Event listeners
    playBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);
    
    volumeSlider.addEventListener('input', function() {
        audio.volume = this.value;
    });
    
    // Handle autoplay restrictions
    audio.play().catch(error => {
        // If autoplay fails, show play button
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        console.log("Autoplay prevented. User must interact first.");
    });
    
    // Update time display
    audio.addEventListener('timeupdate', function() {
        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    });
    
    // When song ends, play next
    audio.addEventListener('ended', nextTrack);
    
    // Initialize with first track
    loadTrack(0);
    
    // ==============================================
    // Terminal Animation
    // ==============================================
    const codeLines = [
        "// Full stack developer",
        "const buildSolution = (problem) => {",
        "    const backend = new NodeJS(problem);",
        "    const frontend = new React(design);",
        "    return backend.connect(frontend)",
        "                 .deploy();",
        "};",
        "",
        "const success = buildSolution(yourRequirements);"
    ];
    
    const terminalOutput = document.getElementById('terminal-output');
    const runCodeBtn = document.getElementById('run-code-btn');
    const codeElement = document.getElementById('animated-code');
    
    // Run code button functionality
    runCodeBtn.addEventListener('click', function() {
        terminalOutput.style.display = 'block';
        terminalOutput.innerHTML = '> Solution deployed successfully! 🚀';
        
        setTimeout(() => {
            terminalOutput.style.display = 'none';
        }, 3000);
    });
    
    // Typing animation for code
    function typeCode() {
        codeElement.innerHTML = '';
        let currentLine = 0;
        let currentChar = 0;
        
        codeElement.classList.add('typing');
        
        function type() {
            if (currentLine < codeLines.length) {
                if (currentChar < codeLines[currentLine].length) {
                    codeElement.innerHTML += codeLines[currentLine].charAt(currentChar);
                    currentChar++;
                    setTimeout(type, Math.random() * 50 + 30);
                } else {
                    codeElement.innerHTML += '\n';
                    currentLine++;
                    currentChar = 0;
                    setTimeout(type, 100);
                }
            } else {
                codeElement.classList.remove('typing');
            }
        }
        
        setTimeout(type, 1000);
    }
    
    // Initialize typing animation
    typeCode();
    
    // ==============================================
    // Navigation and Scroll Effects
    // ==============================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
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
            }
        });
    });
    
    // Back to top button
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ==============================================
    // Scroll Animations
    // ==============================================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-card, .project-card, .about-image, .contact-form');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.skill-card, .project-card, .about-image, .contact-form').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});