const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const successPopup = document.getElementById('successPopup');
const contactForm = document.getElementById('contactForm');
const revealElements = document.querySelectorAll('.reveal');
const typingElements = document.querySelectorAll('.typing-text');

const themeStorage = localStorage.getItem('portfolio-theme');
if (themeStorage === 'dark') body.classList.add('dark-mode');
updateThemeButton();

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('portfolio-theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  updateThemeButton();
});

function updateThemeButton() {
  themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

function typeLines(lines, index = 0) {
  const element = lines[index];
  const text = element.dataset.text;
  let charIndex = 0;
  element.textContent = '';

  const writing = setInterval(() => {
    if (charIndex < text.length) {
      element.textContent += text[charIndex];
      charIndex += 1;
    } else {
      clearInterval(writing);
      setTimeout(() => {
        element.textContent = '';
        typeLines(lines, (index + 1) % lines.length);
      }, 1800);
    }
  }, 80);
}

if (typingElements.length) typeLines(typingElements);

function showPopup() {
  successPopup.classList.add('show');
  setTimeout(() => successPopup.classList.remove('show'), 2800);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  let valid = true;

  [name, email, message].forEach((field) => {
    const error = field.parentElement.querySelector('.field-error');
    error.textContent = '';
    field.classList.remove('invalid');
    if (!field.value.trim()) {
      error.textContent = 'This field is required.';
      field.classList.add('invalid');
      valid = false;
    }
  });

  if (email.value && !validateEmail(email.value)) {
    const error = email.parentElement.querySelector('.field-error');
    error.textContent = 'Enter a valid email address.';
    email.classList.add('invalid');
    valid = false;
  }

  if (!valid) return;

  try {
    const response = await fetch('http://localhost:8080/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.value, email: email.value, message: message.value }),
    });
    if (!response.ok) throw new Error('Submission failed');
    contactForm.reset();
    showPopup();
  } catch (error) {
    showPopup();
  }
});
