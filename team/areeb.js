document.addEventListener('DOMContentLoaded', function() {

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            

            navLinks.classList.remove('active');
        });
    });
    

    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
 
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            

            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    

    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
  const runCodeBtn = document.getElementById('run-code-btn');
  const animatedCode = document.getElementById('animated-code');
  const terminalOutput = document.getElementById('terminal-output');
  const originalCode = animatedCode.textContent.trim();

  function typeWriter(element, text, speed = 30) {
    element.textContent = '';
    element.classList.add('typing');
    
    let i = 0;
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          element.classList.remove('typing');
          resolve();
        }
      }, speed);
    });
  }
  

  function simulateCodeExecution() {
    return new Promise(resolve => {
      terminalOutput.style.display = 'block';
      terminalOutput.textContent = '> Running solution...';
      
      setTimeout(() => {
        terminalOutput.innerHTML += '\n> Processing challenges...';
        
        setTimeout(() => {
          terminalOutput.innerHTML += '\n> Applying skills...';
          
          setTimeout(() => {
            terminalOutput.innerHTML += '\n\nSuccess! All challenges solved.';
            resolve();
          }, 800);
        }, 800);
      }, 800);
    });
  }
  

  setTimeout(() => {
    animatedCode.textContent = '';
    typeWriter(animatedCode, originalCode);
  }, 1000);
  

  runCodeBtn.addEventListener('click', async function() {

    this.innerHTML = '<i class="fas fa-cog fa-spin"></i> Running...';
    this.disabled = true;
    

    terminalOutput.style.display = 'none';
    terminalOutput.textContent = '';
    

    await typeWriter(animatedCode, originalCode);

    await simulateCodeExecution();

    setTimeout(() => {
      this.innerHTML = '<i class="fas fa-play"></i> Run Code';
      this.disabled = false;
    }, 1500);
  });
});