// Smooth scrolling for navbar links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Animate sections, skills, projects, education
const sections = document.querySelectorAll('.section');
const skills = document.querySelectorAll('.skill');
const projects = document.querySelectorAll('.project');
const eduCards = document.querySelectorAll('.edu-card');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) current = section.getAttribute('id');

    // Reveal section
    if (section.getBoundingClientRect().top < window.innerHeight - 100) {
      section.classList.add('visible');
    }
  });

  skills.forEach(skill => {
    if (skill.getBoundingClientRect().top < window.innerHeight - 100) skill.classList.add('visible');
  });

  projects.forEach(proj => {
    if (proj.getBoundingClientRect().top < window.innerHeight - 100) proj.classList.add('visible');
  });

  eduCards.forEach(card => {
    if (card.getBoundingClientRect().top < window.innerHeight - 100) card.classList.add('visible');
  });

  // Highlight navbar
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// Particle background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const colors = ['#00bfff','#4e54c8','#8f94fb','#ffffff'];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

function initParticles(num=100){
  particlesArray.length = 0;
  for(let i=0;i<num;i++) particlesArray.push(new Particle());
}

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// Button click color toggle
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('clicked')); // remove from all
    button.classList.add('clicked'); // add to clicked button
  });
});
const btn = document.getElementById("themeToggle");

btn.onclick = () => {
  document.body.classList.toggle("light");
  btn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
};
window.onscroll = () => {
  const scroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById("progress").style.width =
    (scroll / height) * 100 + "%";
};
function openModal() {
  document.getElementById("modal").style.display = "flex";
}
function closeModal() {
  document.getElementById("modal").style.display = "none";
}
const text = "Hi, I'm Sudeepa Ekanthappa Bannihatti";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 80);
  }
}
typeWriter();
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll(".section, .project, .skill, .edu-card")
  .forEach(el => observer.observe(el));
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});
