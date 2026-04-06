/* ============================================
   PREMIUM PORTFOLIO SCRIPT - ADVANCED INTERACTIONS
   ============================================ */

// Custom Cursor Glow
const cursor = document.getElementById('cursor-glow');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 15 + 'px';
  cursor.style.top = mouseY - 15 + 'px';
  cursor.classList.add('active');
});

document.addEventListener('mouseleave', () => {
  cursor.classList.remove('active');
});

// Hide cursor over interactive elements
document.addEventListener('mouseenter', () => {
  const interactive = document.querySelectorAll('a, button, input, textarea');
  interactive.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.display = 'none';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.display = 'block';
    });
  });
});

// Scroll Progress Bar
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
if (savedTheme === 'dark') {
  htmlElement.style.colorScheme = 'dark';
  document.body.style.backgroundColor = '#000000';
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
  const currentTheme = localStorage.getItem('portfolio-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  localStorage.setItem('portfolio-theme', newTheme);
  
  if (newTheme === 'dark') {
    htmlElement.style.colorScheme = 'dark';
    document.body.style.backgroundColor = '#000000';
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    htmlElement.style.colorScheme = 'light';
    document.body.style.backgroundColor = '';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
});

// Floating Navbar Active Link
const navLinks = document.querySelectorAll('[data-section]');
const sections = document.querySelectorAll('section');

function updateActiveNav() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.style.color = '';
    const href = link.getAttribute('href');
    if (href === '#' + current) {
      link.style.color = '#8b5cf6';
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// Smooth Scrolling
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Section Reveal Animation
const revealSections = document.querySelectorAll('.reveal-section');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

revealSections.forEach(section => {
  observer.observe(section);
});

// Typing Animation for Hero Section
const typingLines = document.querySelectorAll('.typing-line');
const typingTexts = [];

typingLines.forEach(line => {
  typingTexts.push(line.getAttribute('data-text'));
  line.textContent = '';
});

let currentLineIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeEffect() {
  const line = typingLines[currentLineIndex];
  const fullText = typingTexts[currentLineIndex];
  
  if (isDeleting) {
    currentCharIndex--;
  } else {
    currentCharIndex++;
  }
  
  line.textContent = fullText.substring(0, currentCharIndex);
  
  let typeSpeed = isDeleting ? 50 : 50;
  
  if (!isDeleting && currentCharIndex === fullText.length) {
    typeSpeed = 2000; // Pause before deleting
    isDeleting = true;
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentLineIndex = (currentLineIndex + 1) % typingLines.length;
    typeSpeed = 500; // Pause before typing next line
  }
  
  setTimeout(typeEffect, typeSpeed);
}

typeEffect();

// Animated Skill Bars on Scroll
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

function animateSkills() {
  skillBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight && !skillsAnimated) {
      skillsAnimated = true;
      skillBars.forEach(b => {
        const width = b.style.width;
        b.style.width = '0';
        setTimeout(() => {
          b.style.width = width;
        }, 100);
      });
    }
  });
}

window.addEventListener('scroll', animateSkills);

// Project Modal Functionality
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');

const projectData = {
  '1': {
    title: 'Chatbot for Autism Children',
    description: 'An empathetic AI chatbot designed to support communication and learning for children with autism using advanced Natural Language Processing techniques.',
    technologies: ['Python', 'NLP', 'TensorFlow', 'UX Design'],
    features: [
      'Conversational AI with empathetic responses',
      'Customizable learning modules',
      'Parent/guardian dashboard',
      'Progress tracking and analytics'
    ],
    challenge: 'Creating an AI system that understands emotional context and responds appropriately to children with autism.',
    solution: 'Implemented sentiment analysis and custom training data focusing on accessibility and inclusive design.',
    impact: 'Presented at inter-college symposiums and received recognition for innovative approach to assistive technology.'
  },
  '2': {
    title: 'AI Recommendation Engine',
    description: 'A machine learning-powered recommendation system that intelligently suggests content based on user behavior, preferences, and engagement patterns.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Data Analysis'],
    features: [
      'Collaborative filtering algorithm',
      'Content-based recommendations',
      'Real-time suggestion updates',
      'Performance metrics dashboard'
    ],
    challenge: 'Balancing accuracy with computational efficiency for large datasets.',
    solution: 'Implemented hybrid recommendation approach combining collaborative and content-based filtering.',
    impact: 'Improved recommendation accuracy by 35% and reduced computation time by 40%.'
  },
  '3': {
    title: 'Oracle Cloud Internship',
    description: 'Hands-on experience working on AI-driven enterprise solutions at Oracle, learning industry best practices and cloud-enabled architecture patterns.',
    technologies: ['Oracle Cloud', 'Java', 'ML', 'Cloud Architecture'],
    features: [
      'AI-powered automation workflows',
      'Cloud resource optimization',
      'Enterprise data pipeline',
      'Scalable microservices'
    ],
    challenge: 'Understanding and implementing enterprise-scale AI solutions with multiple services.',
    solution: 'Collaborated with senior engineers, participated in code reviews, and deployed production-ready solutions.',
    impact: 'Gained practical experience with enterprise AI deployment and learned best practices in cloud scalability.'
  }
};

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const projectId = card.getAttribute('data-project');
    const data = projectData[projectId];
    
    modalBody.innerHTML = `
      <div style="padding-top: 3rem;">
        <h2 style="font-size: 1.8rem; margin-bottom: 1rem;">${data.title}</h2>
        <p style="color: var(--text-secondary); font-size: 1.05rem; margin-bottom: 1.5rem;">${data.description}</p>
        
        <div style="margin-bottom: 2rem;">
          <h3 style="font-weight: 700; margin-bottom: 0.8rem; color: var(--primary);">Technologies Used</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${data.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
          </div>
        </div>
        
        <div style="margin-bottom: 2rem;">
          <h3 style="font-weight: 700; margin-bottom: 0.8rem; color: var(--primary);">Key Features</h3>
          <ul style="list-style: none; padding: 0;">
            ${data.features.map(feature => `
              <li style="display: flex; gap: 0.8rem; margin-bottom: 0.8rem; color: var(--text-secondary);">
                <span style="color: var(--primary);">✓</span>
                ${feature}
              </li>
            `).join('')}
          </ul>
        </div>
        
        <div style="margin-bottom: 2rem;">
          <h3 style="font-weight: 700; margin-bottom: 0.8rem; color: var(--primary);">Challenge</h3>
          <p style="color: var(--text-secondary);">${data.challenge}</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
          <h3 style="font-weight: 700; margin-bottom: 0.8rem; color: var(--primary);">Solution</h3>
          <p style="color: var(--text-secondary);">${data.solution}</p>
        </div>
        
        <div>
          <h3 style="font-weight: 700; margin-bottom: 0.8rem; color: var(--primary);">Impact</h3>
          <p style="color: var(--text-secondary);">${data.impact}</p>
        </div>
      </div>
    `;
    
    modal.classList.add('active');
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const notification = document.getElementById('success-notification');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const button = contactForm.querySelector('button');
    
    // Reset errors
    [name, email, subject, message].forEach(field => {
      const error = field.parentElement.querySelector('.form-error');
      error.textContent = '';
    });
    
    // Validation
    let isValid = true;
    
    if (!name.value.trim()) {
      showError(name, 'Name is required');
      isValid = false;
    }
    
    if (!email.value.trim()) {
      showError(email, 'Email is required');
      isValid = false;
    } else if (!validateEmail(email.value)) {
      showError(email, 'Please enter a valid email');
      isValid = false;
    }
    
    if (!subject.value.trim()) {
      showError(subject, 'Subject is required');
      isValid = false;
    }
    
    if (!message.value.trim()) {
      showError(message, 'Message is required');
      isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading state
    button.disabled = true;
    const originalText = button.innerHTML;
    button.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    
    try {
      const response = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          subject: subject.value,
          message: message.value
        })
      });
      
      if (response.ok) {
        // Show success notification
        notification.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
        // Hide notification after 4 seconds
        setTimeout(() => {
          notification.classList.remove('show');
        }, 4000);
      } else {
        showError(message, 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      showError(message, 'Network error. Please try again.');
    } finally {
      button.disabled = false;
      button.innerHTML = originalText;
    }
  });
}

function showError(field, message) {
  const error = field.parentElement.querySelector('.form-error');
  error.textContent = message;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Particle Background Animation
function createParticles() {
  const bg = document.querySelector('.particle-background');
  const particlesHTML = Array.from({ length: 50 }, (_, i) => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = 3 + Math.random() * 4;
    const delay = Math.random() * 2;
    return `
      <div class="particle" style="
        --x: ${x}%;
        --y: ${y}%;
        --duration: ${duration}s;
        --delay: ${delay}s;
      "></div>
    `;
  }).join('');
  
  const style = document.createElement('style');
  style.textContent = `
    .particle {
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(139, 92, 246, 0.5);
      left: var(--x);
      top: var(--y);
      border-radius: 50%;
      animation: float var(--duration) infinite ease-in-out var(--delay);
    }
    
    @keyframes float {
      0% {
        transform: translate(0, 0) scale(1);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translate(var(--tx, 10px), var(--ty, -10px)) scale(0);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

createParticles();

// Dynamically adjust header scroll behavior
let lastScrollY = 0;
const header = document.querySelector('.floating-header');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  
  if (scrollY > lastScrollY && scrollY > 100) {
    // Scrolling down
    header.style.transform = 'translateX(-50%) translateY(-120px)';
  } else {
    // Scrolling up
    header.style.transform = 'translateX(-50%) translateY(0)';
  }
  
  lastScrollY = scrollY;
}, false);

// Page Load Animation
window.addEventListener('load', () => {
  document.querySelector('.hero-content').style.animation = 'contentSlide 0.8s ease-out';
});

// Parallax effect for hero orbs
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const orbs = document.querySelectorAll('.gradient-orb');
  
  orbs.forEach((orb, index) => {
    const offset = scrollY * (0.5 + index * 0.1);
    orb.style.transform = `translateY(${offset}px)`;
  });
});

console.log('Premium Portfolio Script Loaded ✨');
