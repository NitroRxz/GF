/**
 * Romantic Dark Aesthetic Website Script
 */

// Secret Card Messages Data (Easily customizable!)
const secretMessages = {
  "1": {
    title: "something I wanted to tell you",
    icon: "fa-comment-dots",
    body: "Even on my busiest days, you are always running through my mind. You make every little moment feel meaningful just by being part of my life."
  },
  "2": {
    title: "one little reminder",
    icon: "fa-bell",
    body: "Please remember how amazing and unique you are. Whenever things get overwhelming, take a breath and remember that I am always here for you."
  },
  "3": {
    title: "just because",
    icon: "fa-gift",
    body: "You don't need a special occasion to be loved and appreciated. You deserve all the warmth and happiness in the world, today and every day."
  },
  "4": {
    title: "❤️",
    icon: "fa-heart",
    body: "Distance is only temporary, but what we have is forever. I love you more than words or code could ever express."
  }
};

// Canvas Background Floating Particles & Hearts System
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = 65;
    
    this.resize();
    this.init();
    
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.6 - 0.2,
        opacity: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        isHeart: Math.random() < 0.2,
        color: Math.random() > 0.5 ? '#ff2a6d' : '#9b51e0'
      });
    }
  }

  drawHeart(x, y, size, color, opacity) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.translate(x, y);
    this.ctx.scale(size / 10, size / 10);
    this.ctx.moveTo(0, 0);
    this.ctx.bezierCurveTo(-5, -5, -10, 0, 0, 10);
    this.ctx.bezierCurveTo(10, 0, 5, -5, 0, 0);
    this.ctx.fillStyle = color;
    this.ctx.globalAlpha = opacity;
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = color;
    this.ctx.fill();
    this.ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.005;

      // Reset when particle drifts off screen
      if (p.y < -10) p.y = this.canvas.height + 10;
      if (p.x < -10) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 10) p.x = -10;

      if (p.isHeart) {
        this.drawHeart(p.x, p.y, p.size * 3, p.color, Math.max(0.1, Math.min(0.8, p.opacity)));
      } else {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = Math.max(0.1, Math.min(0.8, p.opacity));
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = p.color;
        this.ctx.fill();
      }
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Particle Click Burst Effect
function createClickBurst(x, y) {
  const burstContainer = document.createElement('div');
  burstContainer.style.position = 'fixed';
  burstContainer.style.top = '0';
  burstContainer.style.left = '0';
  burstContainer.style.width = '100%';
  burstContainer.style.height = '100%';
  burstContainer.style.pointerEvents = 'none';
  burstContainer.style.zIndex = '9999';
  document.body.appendChild(burstContainer);

  const particleCount = 12;
  for (let i = 0; i < particleCount; i++) {
    const el = document.createElement('div');
    const isHeart = Math.random() > 0.4;
    el.innerHTML = isHeart ? '❤️' : '✨';
    el.style.position = 'absolute';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.fontSize = `${Math.random() * 14 + 10}px`;
    el.style.userSelect = 'none';
    el.style.transition = 'all 0.8s ease-out';
    
    burstContainer.appendChild(el);

    const angle = (i / particleCount) * Math.PI * 2;
    const velocity = Math.random() * 80 + 40;
    const destX = Math.cos(angle) * velocity;
    const destY = Math.sin(angle) * velocity;

    requestAnimationFrame(() => {
      el.style.transform = `translate(${destX}px, ${destY}px) scale(0)`;
      el.style.opacity = '0';
    });
  }

  setTimeout(() => burstContainer.remove(), 900);
}

// Interactive Tilt Effect on Cards
function applyTiltEffect() {
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const rotateX = (-y / rect.height) * 12;
      const rotateY = (x / rect.width) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Start Particle System
  const system = new ParticleSystem('bgCanvas');
  system.animate();

  // Apply Card Tilts
  applyTiltEffect();

  // Mouse Cursor Glow Tracking
  const cursorGlow = document.getElementById('cursorGlow');
  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });

  // Global Particle Click Burst Trigger
  window.addEventListener('click', (e) => {
    createClickBurst(e.clientX, e.clientY);
  });

  // Entry Transition (Hero "Open" Button)
  const openBtn = document.getElementById('openBtn');
  const heroOverlay = document.getElementById('heroOverlay');
  const mainContent = document.getElementById('mainContent');

  openBtn.addEventListener('click', () => {
    heroOverlay.classList.add('fade-out');
    
    setTimeout(() => {
      heroOverlay.style.display = 'none';
      mainContent.classList.remove('hidden');
    }, 1200);
  });

  // Modal Functionality for Secret Cards
  const modalOverlay = document.getElementById('messageModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalDoneBtn = document.getElementById('modalDoneBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalIcon = document.getElementById('modalIcon');

  const openModal = (cardId) => {
    const data = secretMessages[cardId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalBody.textContent = data.body;
    modalIcon.className = `fa-solid ${data.icon}`;

    modalOverlay.classList.remove('hidden');
  };

  const closeModal = () => {
    modalOverlay.classList.add('hidden');
  };

  document.querySelectorAll('.interactive-card').forEach(card => {
    card.addEventListener('click', () => {
      const cardId = card.getAttribute('data-card-id');
      openModal(cardId);
    });
  });

  closeModalBtn.addEventListener('click', closeModal);
  modalDoneBtn.addEventListener('click', closeModal);
  document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
});