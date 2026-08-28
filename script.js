// STACKLY Multi-Page Interactive Experience Script

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu');

  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  // Multi-Page Active Nav Link Highlighting
  let currentPage = window.location.pathname.split('/').pop();
  if (!currentPage || currentPage === '') {
    currentPage = 'index.html';
  }

  // Desktop Navbar Active Link
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('nav-link-active', 'font-semibold');
    } else {
      link.classList.remove('nav-link-active', 'font-semibold');
    }
  });

  // Mobile Menu Drawer Active Link
  document.querySelectorAll('#mobile-menu nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('text-[#18181B]', 'font-bold', 'border-l-4', 'border-[#18181B]');
    } else {
      link.classList.remove('text-[#18181B]', 'font-bold', 'border-l-4', 'border-[#18181B]');
    }
  });

  // Mobile Menu Toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeMobileMenuBtn && mobileMenu) {
    closeMobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  // Modal Open/Close Helpers
  window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }
  };

  // Close modals when clicking backdrop
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        const parentModal = backdrop.closest('[id$="-modal"]');
        if (parentModal) {
          closeModal(parentModal.id);
        }
      }
    });
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      ['planning-modal', 'login-modal', 'signup-modal'].forEach(id => closeModal(id));
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }
  });

  // Toast helper
  window.showToast = function(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 4000);
  };

  // Handle Planning Form Submit
  const planningForm = document.getElementById('planning-form');
  if (planningForm) {
    planningForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('planning-modal');
      showToast('✨ Thank you! Your wedding consultation request has been received.');
      planningForm.reset();
    });
  }

  // Handle Login Form Submit
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('login-modal');
      loginForm.reset();
    });
  }

  // Handle Signup Form Submit
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('signup-modal');
      signupForm.reset();
    });
  }

  // Switch between Login and Signup modals
  window.switchModal = function(fromId, toId) {
    closeModal(fromId);
    setTimeout(() => openModal(toId), 150);
  };
});

// LOVE NOTES SLIDER ENGINE
let currentLoveNoteIndex = 0;

window.setLoveNoteSlide = function(index) {
  const slides = document.querySelectorAll('.love-note-slide');
  const dots = document.querySelectorAll('.love-note-dot');
  if (!slides.length) return;

  currentLoveNoteIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    if (i === currentLoveNoteIndex) {
      slide.classList.remove('opacity-0', 'pointer-events-none', 'translate-x-12', '-translate-x-12');
      slide.classList.add('opacity-100', 'translate-x-0');
    } else {
      slide.classList.remove('opacity-100', 'translate-x-0');
      slide.classList.add('opacity-0', 'pointer-events-none');
      if (i < currentLoveNoteIndex) {
        slide.classList.add('-translate-x-12');
      } else {
        slide.classList.add('translate-x-12');
      }
    }
  });

  dots.forEach((dot, i) => {
    if (i === currentLoveNoteIndex) {
      dot.className = 'love-note-dot w-3 h-3 rounded-full bg-[#685D54] transition-all shadow-xs';
    } else {
      dot.className = 'love-note-dot w-2.5 h-2.5 rounded-full bg-[#C5BBB0] hover:bg-[#685D54] transition-all';
    }
  });
};

window.changeLoveNoteSlide = function(direction) {
  setLoveNoteSlide(currentLoveNoteIndex + direction);
};

// Automatic slide rotation every 6 seconds
setInterval(() => {
  const slides = document.querySelectorAll('.love-note-slide');
  if (slides.length > 1) {
    changeLoveNoteSlide(1);
  }
}, 6000);

// AWWWARDS / APPLE / STRIPE LUXURY MOTION & SCROLL ENGINE
document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize Lenis Smooth Scroll Engine (Silky Wheel & Inertia Momentum)
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      smoothTouch: false,
      touchMultiplier: 2.0
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }
  }

  // 2. Initialize GSAP Awwwards-Grade Motion System
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();

    // A. Apple-Style Masked Title & Heading 3D Perspective Reveal
    gsap.utils.toArray('h1, h2, h3, .font-serif-title').forEach(heading => {
      if (heading.closest('.modal-backdrop, #profile-dropdown-menu, .hidden, #sidebar-drawer')) return;

      gsap.fromTo(heading,
        {
          yPercent: 35,
          rotateX: 10,
          opacity: 0,
          transformPerspective: 1000,
          transformOrigin: 'top center'
        },
        {
          scrollTrigger: {
            trigger: heading,
            start: 'top 92%',
            end: 'top 65%',
            scrub: 0.8
          },
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          ease: 'power3.out'
        }
      );
    });

    // B. Stripe-Style Elevator Lift & 3D Perspective Stagger for Grid Cards
    gsap.utils.toArray('section .grid, section .flex-wrap').forEach(grid => {
      if (grid.closest('.modal-backdrop, .hidden, #sidebar-drawer')) return;

      const cards = Array.from(grid.children).filter(c => !c.classList.contains('hidden'));
      if (cards.length > 0) {
        cards.forEach((card, idx) => {
          gsap.fromTo(card,
            {
              y: 65 + (idx % 3) * 20,
              scale: 0.93,
              rotateX: 6,
              opacity: 0.3,
              transformPerspective: 1000
            },
            {
              scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                end: 'top 65%',
                scrub: 1
              },
              y: 0,
              scale: 1,
              rotateX: 0,
              opacity: 1,
              ease: 'power3.out'
            }
          );
        });
      }
    });

    // C. Cinematic Depth Parallax for Photography & Hero Media
    gsap.utils.toArray('section img:not(.logo-img):not(.no-gsap)').forEach(img => {
      if (img.closest('.modal-backdrop, .hidden, #sidebar-drawer')) return;

      gsap.fromTo(img,
        {
          scale: 1.12,
          yPercent: -8,
          filter: 'brightness(0.9)'
        },
        {
          scrollTrigger: {
            trigger: img.parentElement || img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          },
          scale: 1.0,
          yPercent: 8,
          filter: 'brightness(1.0)',
          ease: 'none'
        }
      );
    });

    // D. Section-to-Section Soft Scale & Depth Movement
    gsap.utils.toArray('main > section').forEach(section => {
      if (section.closest('.modal-backdrop, .hidden, #sidebar-drawer')) return;

      gsap.fromTo(section,
        { opacity: 0.88, scale: 0.985 },
        {
          scrollTrigger: {
            trigger: section,
            start: 'top 95%',
            end: 'top 70%',
            scrub: 1
          },
          opacity: 1,
          scale: 1,
          ease: 'power2.out'
        }
      );
    });

  }
});





