/**
 * Krushna Mali Portfolio - Main Script
 * Vanilla ES6+, GSAP 3.12.5, ScrollTrigger
 */

(function() {
  'use strict';

  // ==========================================
  // 1. Motion Config
  // ==========================================
  const MOTION = {
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    duration: { fast: 0.15, base: 0.3, slow: 0.6 },
    ease: { major: 'power3.out', medium: 'power2.out', minor: 'power1.out' }
  };

  const updateMotionConfig = (e) => {
    MOTION.reduced = e.matches;
    if (MOTION.reduced) {
      MOTION.duration = { fast: 0, base: 0, slow: 0 };
    } else {
      MOTION.duration = { fast: 0.15, base: 0.3, slow: 0.6 };
    }
  };

  if (MOTION.reduced) {
    MOTION.duration = { fast: 0, base: 0, slow: 0 };
  }

  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', updateMotionConfig);

  // Check if GSAP is available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded. Animations will not play.');
    return;
  }

  // ==========================================
  // 2. GSAP Registration
  // ==========================================
  gsap.registerPlugin(ScrollTrigger);

  // ==========================================
  // 3. Navigation & Smooth Scroll
  // ==========================================
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('main > section, section');
  const navHeight = 64;

  // Intersection Observer to update active nav link
  const observerOptions = {
    root: null,
    rootMargin: `-${navHeight + 10}px 0px 0px 0px`,
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    if (section.id) {
      observer.observe(section);
    }
  });

  // Smooth scroll logic
  const smoothScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId.substring(1));
    if (targetElement) {
      const top = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    }
  };

  const allNavLinks = document.querySelectorAll('.nav__link, .mobile-menu__link');
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothScrollTo(href);
      }
    });
  });

  // Scrolled nav state
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          nav.classList.add('nav--scrolled');
        } else {
          nav.classList.remove('nav--scrolled');
        }
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // ==========================================
  // 4. Mobile Menu
  // ==========================================
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');
  
  const toggleMobileMenu = () => {
    const isOpen = document.body.classList.contains('menu-open');
    if (isOpen) {
      document.body.classList.remove('menu-open');
      mobileMenu.classList.remove('mobile-menu--open');
      navToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    } else {
      document.body.classList.add('menu-open');
      mobileMenu.classList.add('mobile-menu--open');
      navToggle.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
    }
  };

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (document.body.classList.contains('menu-open')) {
          toggleMobileMenu();
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        toggleMobileMenu();
        navToggle.focus();
      }
    });

    // Focus Trap
    mobileMenu.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const focusableElements = [navToggle, ...Array.from(mobileLinks)];
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  // ==========================================
  // 5. Hero Entrance Animation
  // ==========================================
  const heroTl = gsap.timeline();
  
  if (MOTION.reduced) {
    heroTl.from('.hero__label', { opacity: 0, duration: 0.6 })
          .from('.hero__title', { opacity: 0, duration: 0.8 }, "<")
          .from('.hero__subtitle', { opacity: 0, duration: 0.6 }, "<")
          .from('.hero__actions', { opacity: 0, duration: 0.5 }, "<")
          .from('.hero__availability', { opacity: 0, duration: 0.4 }, "<");
  } else {
    heroTl.from('.hero__label', { opacity: 0, y: 20, duration: 0.6, ease: MOTION.ease.major })
          .from('.hero__title', { opacity: 0, y: 30, duration: 0.8, ease: MOTION.ease.major, stagger: 0.1 }, "-=0.4")
          .from('.hero__subtitle', { opacity: 0, y: 20, duration: 0.6, ease: MOTION.ease.major }, "-=0.5")
          .from('.hero__actions', { opacity: 0, y: 20, duration: 0.5, ease: MOTION.ease.major }, "-=0.4")
          .from('.hero__availability', { opacity: 0, duration: 0.4, ease: MOTION.ease.major }, "-=0.3");
  }

  // ==========================================
  // 6. Hero Parallax
  // ==========================================
  if (!MOTION.reduced) {
    gsap.to('.hero__shape--grid', {
      y: 80,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
    gsap.to('.hero__shape--circle', {
      y: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
    gsap.to('.hero__shape--dots', {
      y: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
    gsap.to('.hero__content', {
      y: -50,
      opacity: 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // ==========================================
  // 7. Section Reveals
  // ==========================================
  const revealElements = document.querySelectorAll(
    '.section__title, .section__subtitle, .project, .proof__item, .pipeline__step, .workflow__step, .tech__item, .about__grid, .timeline__item, .roadmap__node, .resume-cta__card, .contact__link'
  );

  revealElements.forEach(el => {
    if (MOTION.reduced) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          el.classList.add('revealed');
          gsap.set(el, { opacity: 1 });
        },
        once: true
      });
    } else {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          el.classList.add('revealed');
          gsap.fromTo(el, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: MOTION.duration.slow, ease: MOTION.ease.medium }
          );
        },
        once: true
      });
    }
  });

  // ==========================================
  // 8. Proof Strip Counters
  // ==========================================
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    const targetValue = parseFloat(counter.getAttribute('data-count'));
    const suffix = counter.getAttribute('data-suffix') || '';
    
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetValue,
          duration: 2,
          ease: MOTION.ease.major,
          onUpdate: () => {
            counter.innerText = Math.floor(obj.val) + suffix;
          }
        });
      }
    });
  });

  // ==========================================
  // 9. Project Card Toggle
  // ==========================================
  const projectToggles = document.querySelectorAll('.project__toggle');
  projectToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const isOpen = targetEl.classList.contains('project__details--open');
        const textSpan = toggle.querySelector('.project__toggle-text');
        if (isOpen) {
          targetEl.classList.remove('project__details--open');
          toggle.setAttribute('aria-expanded', 'false');
          if (textSpan) textSpan.innerText = 'View Details';
        } else {
          targetEl.classList.add('project__details--open');
          toggle.setAttribute('aria-expanded', 'true');
          if (textSpan) textSpan.innerText = 'Hide Details';
        }
      }
    });
  });

  // ==========================================
  // 10. Tech Ecosystem Filter
  // ==========================================
  const techFilters = document.querySelectorAll('.tech__filter');
  const techItems = document.querySelectorAll('.tech__item');
  
  // Initial filter state matching active tab
  techItems.forEach(item => {
    if (item.getAttribute('data-tier') !== 'hands-on') {
      item.classList.add('tech__item--hidden');
    }
  });

  techFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      const filterValue = filter.getAttribute('data-filter');
      
      techFilters.forEach(f => {
        f.classList.remove('active');
        f.setAttribute('aria-selected', 'false');
      });
      filter.classList.add('active');
      filter.setAttribute('aria-selected', 'true');
      
      let visibleItems = [];
      techItems.forEach(item => {
        if (item.getAttribute('data-tier') === filterValue) {
          item.classList.remove('tech__item--hidden');
          visibleItems.push(item);
        } else {
          item.classList.add('tech__item--hidden');
        }
      });
      
      if (!MOTION.reduced) {
        gsap.fromTo(visibleItems,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: MOTION.duration.base, stagger: 0.03, ease: MOTION.ease.major }
        );
      } else {
        gsap.set(visibleItems, { opacity: 1, y: 0 });
      }
    });
  });

  // ==========================================
  // 11. Magnetic Button & 12. Cursor Light
  // ==========================================
  if (window.matchMedia('(pointer: fine)').matches && !MOTION.reduced) {
    // Magnetic Button
    const magneticButtons = document.querySelectorAll('.btn--primary');
    magneticButtons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // limit translation to max 4px
        const maxTranslation = 4;
        const moveX = (x / rect.width) * (maxTranslation * 2); 
        const moveY = (y / rect.height) * (maxTranslation * 2);

        gsap.to(btn, {
          x: Math.max(-maxTranslation, Math.min(maxTranslation, moveX)),
          y: Math.max(-maxTranslation, Math.min(maxTranslation, moveY)),
          duration: 0.3,
          ease: MOTION.ease.medium
        });
      });
      
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });

    // Cursor Follow Light
    const cursorLight = document.createElement('div');
    cursorLight.classList.add('cursor-light');
    document.body.appendChild(cursorLight);
    
    Object.assign(cursorLight.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
      pointerEvents: 'none',
      zIndex: 0,
      transform: 'translate(-50%, -50%)',
      opacity: 0,
      transition: 'opacity 0.3s ease'
    });

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lightX = mouseX;
    let lightY = mouseY;
    
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorLight.style.opacity === '0') {
        cursorLight.style.opacity = '1';
      }
    });

    const renderLight = () => {
      lightX += (mouseX - lightX) * 0.1;
      lightY += (mouseY - lightY) * 0.1;
      cursorLight.style.transform = `translate(calc(${lightX}px - 50%), calc(${lightY}px - 50%))`;
      requestAnimationFrame(renderLight);
    };
    renderLight();
    
    document.addEventListener('mouseleave', () => {
      cursorLight.style.opacity = '0';
    });
  }

})();
