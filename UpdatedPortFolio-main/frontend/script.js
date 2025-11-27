const cursorEffect = document.getElementById("cursorEffect");

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  console.log(x, "X", y, "Y")
  cursorEffect.style.background = `
    radial-gradient(circle 600px at ${x}px ${y}px, rgba(15,23,255,0.20), transparent 40%)
  `;
});
document.addEventListener("click", (e) => {
  const ripple = document.createElement("div");
  ripple.classList.add("ripple");
  ripple.style.left = `${e.pageX - 10}px`;
  ripple.style.top = `${e.pageY - 10}px`;
  ripple.style.width = ripple.style.height = '50px';

  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600); // Remove ripple after animation
});
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const icon = hamburger.querySelector('i');
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  navLinks.classList.toggle('show');

  // Toggle icon
  if (icon.classList.contains('fa-bars')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times'); // Close icon
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.remove('show');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close menu when clicking any nav link
const allLinks = navLinks.querySelectorAll('a');
allLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});


document.querySelector('.down-arrow').addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('#more-content').scrollIntoView({ behavior: 'smooth' });
});

// Scroll animations using GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animate each section on scroll
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".project-card").forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: i * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
      }
    });
  });

  gsap.to(".hero", {
    backgroundPosition: "50% 100%",
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    }
  });

  gsap.utils.toArray(".section").forEach((section) => {
    const elements = section.querySelectorAll("h2, p");
    gsap.from(elements, {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
      }
    });
  });

  gsap.from(".nav-links li", {
    opacity: 0,
    y: -10,
    stagger: 0.1,
    delay: 0.5,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from("footer", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: "footer",
      start: "top 90%",
    }
  });

  // Hero text animation
  gsap.from(".hero-text h1", {
    opacity: 0,
    y: -30,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(".hero-text h2", {
    opacity: 0,
    y: -20,
    delay: 0.3,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(".hero-text p", {
    opacity: 0,
    y: 10,
    delay: 0.6,
    duration: 1,
    ease: "power2.out",
  });
  gsap.utils.toArray(".blog-card").forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: i * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
      }
    });
  });

});
