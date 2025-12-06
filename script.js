// script.js

// DOM elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const rippleButtons = document.querySelectorAll('.ripple');
const fadeElements = document.querySelectorAll('.fade-in');
const contentSection = document.querySelector('.content-section');
const profileImage = document.querySelector('.profile-photo');

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Ripple effect for buttons
rippleButtons.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');

    ripple.style.left = e.clientX - rect.left + 'px';
    ripple.style.top = e.clientY - rect.top + 'px';

    ripple.classList.add('ripple-effect');

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Fade-in on scroll
const fadeOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  fadeElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
      el.style.animationPlayState = 'running';
    }
  });

  if (contentSection) {
    const top = contentSection.getBoundingClientRect().top;
    if (top < triggerBottom) {
      contentSection.classList.add('fade-in-visible');
    }
  }
};

window.addEventListener('scroll', fadeOnScroll);
window.addEventListener('load', fadeOnScroll);

// Responsive image scaling on resize (extra precaution)
const scaleProfileImage = () => {
  if (window.innerWidth < 600) {
    profileImage.style.width = '90%';
  } else {
    profileImage.style.width = 'auto';
  }
};
window.addEventListener('resize', scaleProfileImage);
window.addEventListener('load', scaleProfileImage);

/* Ripple effect CSS injection */
const styleRippleEffect = document.createElement('style');
styleRippleEffect.textContent = `
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(46,204,113,0.5);
    animation: ripple-anim 0.6s linear;
    pointer-events: none;
    width: 100px;
    height: 100px;
    transform: translate(-50%, -50%) scale(0);
    will-change: transform, opacity;
  }
  @keyframes ripple-anim {
    to {
      transform: translate(-50%, -50%) scale(2.5);
      opacity: 0;
    }
  }
`;
document.head.appendChild(styleRippleEffect);