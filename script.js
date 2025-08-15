// =============================================
// Portfolio Website JavaScript
// =============================================

"use strict";

// =============================================
// Global Variables and Configuration
// =============================================

const CONFIG = {
  typewriterSpeed: 50,
  scrollOffset: 80,
  animationDuration: 300,
  toastDuration: 5000,
  countUpDuration: 2000,
};

// Project data (matches the data model requirements)
const projectsData = [
  {
    id: 0,
    title: "LookMaxPro AI App",
    subtitle: "AI-based lookmaxing Android app",
    description:
      "A cutting-edge Android application that uses AI-driven facial analysis to provide personalized lookmaxing suggestions. Built with modern Android development practices and integrated with Firebase for seamless user experience.",
    features: [
      "On-device AI facial analysis using MediaPipe",
      "Personalized lookmaxing suggestions",
      "Real-time face detection and scoring",
      "Monetization-ready with subscription model",
      "Offline functionality for privacy",
      "Social sharing capabilities",
    ],
    tech: [
      "Android",
      "Firebase",
      "MediaPipe",
      "AI-assisted dev",
      "Kotlin",
      "Room Database",
    ],
    images: [
      "assets/lookmaxpro-1.png",
      "assets/lookmaxpro-2.png",
      "assets/lookmaxpro-3.png",
    ],
    video: "assets/lookmaxpro-demo.mp4",
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.pimpre.lookmaxpro",
      demo: "#",
    },
    category: "Mobile App",
    status: "Live on Play Store",
  },
  {
    id: 1,
    title: "Finance Insights Web App",
    subtitle: "Mini dashboard demo with charts and analytics",
    description:
      "A responsive web application providing financial insights through interactive charts and real-time data visualization. Features user authentication, responsive design, and modern UI components.",
    features: [
      "Interactive financial charts",
      "Real-time data updates",
      "User authentication system",
      "Responsive design for all devices",
      "Data export functionality",
      "Dark/Light theme support",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Firebase Auth", "Chart.js", "PWA"],
    images: ["assets/finance-1.png", "assets/finance-2.png"],
    video: "assets/finance-demo.mp4",
    links: {
      live: "#",
      repo: "#",
    },
    category: "Web App",
    status: "Demo Available",
  },
  {
    id: 2,
    title: "MVP Prototype w/ Monetization",
    subtitle: "Rapid MVP with ads/subscription integration",
    description:
      "A fully functional MVP prototype showcasing rapid development capabilities with integrated monetization strategies including advertisement placement and subscription models.",
    features: [
      "Paywall-ready subscription system",
      "Usage analytics and tracking",
      "Conversion-optimized landing page",
      "A/B testing framework",
      "User onboarding flow",
      "Revenue dashboard",
    ],
    tech: [
      "Firebase",
      "Stripe API",
      "Google AdMob",
      "No-code tools",
      "Analytics",
    ],
    images: ["assets/mvp-1.png"],
    video: "assets/mvp-demo.mp4",
    links: {
      live: "#",
      repo: "#",
    },
    category: "MVP",
    status: "Prototype",
  },
];

// =============================================
// DOM Elements
// =============================================

const elements = {
  // Navigation
  navbar: document.getElementById("navbar"),
  navMenu: document.getElementById("nav-menu"),
  navToggle: document.getElementById("nav-toggle"),
  navLinks: document.querySelectorAll(".nav-link"),
  themeToggle: document.getElementById("theme-toggle"),

  // Loading
  loadingScreen: document.getElementById("loading-screen"),

  // Hero
  typewriter: document.querySelector(".typewriter"),

  // Skills
  skillBars: document.querySelectorAll(".skill-progress"),

  // Stats
  statNumbers: document.querySelectorAll(".stat-number"),

  // Projects
  projectCards: document.querySelectorAll(".project-card"),
  projectDetailsButtons: document.querySelectorAll(".project-details-btn"),
  modal: document.getElementById("project-modal"),
  modalBody: document.getElementById("modal-body"),
  modalClose: document.getElementById("modal-close"),
  modalOverlay: document.getElementById("modal-overlay"),

  // Contact Form
  contactForm: document.getElementById("contact-form"),
  submitBtn: document.getElementById("submit-btn"),

  // Toast
  toast: document.getElementById("toast"),
  toastMessage: document.getElementById("toast-message"),
  toastClose: document.getElementById("toast-close"),
};

// =============================================
// Utility Functions
// =============================================

const utils = {
  // Debounce function for performance optimization
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Check if element is in viewport
  isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight - offset && rect.bottom >= offset;
  },

  // Smooth scroll to element
  scrollToElement(target, offset = CONFIG.scrollOffset) {
    const element =
      typeof target === "string" ? document.querySelector(target) : target;
    if (element) {
      const targetPosition = element.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  },

  // Animate number counting
  animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  },

  // Local storage helpers
  getStoredTheme() {
    return (
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  },

  setStoredTheme(theme) {
    localStorage.setItem("theme", theme);
  },
};

// =============================================
// Theme Management
// =============================================

const themeManager = {
  init() {
    const savedTheme = utils.getStoredTheme();
    this.setTheme(savedTheme);
    this.updateToggleIcon(savedTheme);

    if (elements.themeToggle) {
      elements.themeToggle.addEventListener("click", () => this.toggle());
    }

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          this.setTheme(e.matches ? "dark" : "light");
          this.updateToggleIcon(e.matches ? "dark" : "light");
        }
      });
  },

  toggle() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    this.setTheme(newTheme);
    utils.setStoredTheme(newTheme);
    this.updateToggleIcon(newTheme);
  },

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  },

  updateToggleIcon(theme) {
    if (elements.themeToggle) {
      const icon = elements.themeToggle.querySelector("i");
      icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
  },
};

// =============================================
// Navigation Management
// =============================================

const navigation = {
  init() {
    this.bindEvents();
    this.updateActiveLink();
    window.addEventListener(
      "scroll",
      utils.debounce(() => {
        this.updateNavbarStyle();
        this.updateActiveLink();
      }, 10)
    );
  },

  bindEvents() {
    // Mobile menu toggle
    if (elements.navToggle) {
      elements.navToggle.addEventListener("click", () =>
        this.toggleMobileMenu()
      );
    }

    // Navigation links
    elements.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("href");
        if (target.startsWith("#")) {
          utils.scrollToElement(target);
          this.closeMobileMenu();
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !elements.navbar.contains(e.target) &&
        elements.navMenu.classList.contains("active")
      ) {
        this.closeMobileMenu();
      }
    });

    // Close mobile menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && elements.navMenu.classList.contains("active")) {
        this.closeMobileMenu();
      }
    });
  },

  toggleMobileMenu() {
    elements.navMenu.classList.toggle("active");
    elements.navToggle.classList.toggle("active");

    // Prevent body scroll when menu is open
    document.body.style.overflow = elements.navMenu.classList.contains("active")
      ? "hidden"
      : "";
  },

  closeMobileMenu() {
    elements.navMenu.classList.remove("active");
    elements.navToggle.classList.remove("active");
    document.body.style.overflow = "";
  },

  updateNavbarStyle() {
    const scrolled = window.scrollY > 50;
    elements.navbar.style.background = scrolled
      ? "rgba(255, 255, 255, 0.98)"
      : "rgba(255, 255, 255, 0.95)";

    if (document.documentElement.getAttribute("data-theme") === "dark") {
      elements.navbar.style.background = scrolled
        ? "rgba(15, 23, 42, 0.98)"
        : "rgba(15, 23, 42, 0.95)";
    }
  },

  updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + CONFIG.scrollOffset + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (navLink) {
        if (scrollPos >= top && scrollPos < bottom) {
          elements.navLinks.forEach((link) => link.classList.remove("active"));
          navLink.classList.add("active");
        }
      }
    });
  },
};

// =============================================
// Loading Screen
// =============================================

const loadingScreen = {
  init() {
    // Hide loading screen after page loads
    window.addEventListener("load", () => {
      setTimeout(() => {
        if (elements.loadingScreen) {
          elements.loadingScreen.classList.add("hidden");
          // Remove from DOM after animation
          setTimeout(() => {
            elements.loadingScreen.remove();
          }, 500);
        }
      }, 500); // Minimum loading time for smooth experience
    });
  },
};

// =============================================
// Typewriter Effect
// =============================================

const typewriter = {
  init() {
    if (elements.typewriter) {
      const text = elements.typewriter.getAttribute("data-text");
      if (text) {
        this.type(elements.typewriter, text);
      }
    }
  },

  type(element, text) {
    element.textContent = "";
    let i = 0;

    const typeInterval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        // Remove cursor after typing is complete
        setTimeout(() => {
          element.style.borderRight = "none";
        }, 1000);
      }
    }, CONFIG.typewriterSpeed);
  },
};

// =============================================
// Scroll Animations
// =============================================

const scrollAnimations = {
  init() {
    this.observeElements();
    this.setupIntersectionObserver();
  },

  observeElements() {
    const elementsToAnimate = document.querySelectorAll(
      "section, .skill-item, .project-card, .testimonial-card, .blog-card"
    );

    elementsToAnimate.forEach((element) => {
      element.classList.add("fade-in");
    });
  },

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Trigger specific animations
            if (entry.target.closest(".skills")) {
              this.animateSkillBars();
            }

            if (entry.target.closest(".about")) {
              this.animateStatNumbers();
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    document.querySelectorAll(".fade-in").forEach((element) => {
      observer.observe(element);
    });
  },

  animateSkillBars() {
    elements.skillBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      if (width && !bar.classList.contains("animate")) {
        bar.classList.add("animate");
        setTimeout(() => {
          bar.style.width = `${width}%`;
        }, 200);
      }
    });
  },

  animateStatNumbers() {
    elements.statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-target"));
      if (target && !stat.classList.contains("animated")) {
        stat.classList.add("animated");
        utils.animateNumber(stat, 0, target, CONFIG.countUpDuration);
      }
    });
  },
};

// =============================================
// Project Modal
// =============================================

const projectModal = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    // Project detail buttons
    elements.projectDetailsButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const projectId = parseInt(button.getAttribute("data-project"));
        this.showProject(projectId);
      });
    });

    // Modal close events
    if (elements.modalClose) {
      elements.modalClose.addEventListener("click", () => this.close());
    }

    if (elements.modalOverlay) {
      elements.modalOverlay.addEventListener("click", () => this.close());
    }

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && elements.modal.classList.contains("active")) {
        this.close();
      }
    });
  },

  showProject(projectId) {
    const project = projectsData.find((p) => p.id === projectId);
    if (!project) return;

    const modalContent = this.generateModalContent(project);
    elements.modalBody.innerHTML = modalContent;
    elements.modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Setup image gallery if multiple images
    this.setupImageGallery(project.images);
  },

  generateModalContent(project) {
    const featuresHtml = project.features
      .map(
        (feature) =>
          `<li><i class="fas fa-check text-accent-primary"></i> ${feature}</li>`
      )
      .join("");

    const techHtml = project.tech
      .map((tech) => `<span class="tech-tag">${tech}</span>`)
      .join("");

    const linksHtml = Object.entries(project.links)
      .map(([key, url]) => {
        const iconMap = {
          playStore: "fab fa-google-play",
          live: "fas fa-external-link-alt",
          repo: "fab fa-github",
          demo: "fas fa-play",
        };
        const labelMap = {
          playStore: "Play Store",
          live: "Live Demo",
          repo: "GitHub",
          demo: "Demo",
        };

        return `
                <a href="${url}" class="btn btn-secondary" target="_blank" rel="noopener">
                    <i class="${iconMap[key] || "fas fa-link"}"></i>
                    ${labelMap[key] || key}
                </a>
            `;
      })
      .join("");

    return `
            <div class="project-modal-content">
                <div class="project-modal-header">
                    <span class="project-category">${project.category}</span>
                    <span class="project-status">${project.status}</span>
                </div>
                
                <h2 class="project-modal-title">${project.title}</h2>
                <p class="project-modal-subtitle">${project.subtitle}</p>
                
                <div class="project-modal-gallery">
                    <img src="${project.images[0]}" alt="${
      project.title
    }" class="main-project-image" loading="lazy">
                    ${
                      project.images.length > 1
                        ? `
                        <div class="project-thumbnails">
                            ${project.images
                              .map(
                                (img, index) =>
                                  `<img src="${img}" alt="${project.title} ${
                                    index + 1
                                  }" class="thumbnail ${
                                    index === 0 ? "active" : ""
                                  }" data-index="${index}" loading="lazy">`
                              )
                              .join("")}
                        </div>
                    `
                        : ""
                    }
                </div>

                <div class="project-modal-description">
                    <p>${project.description}</p>
                </div>

                <div class="project-modal-features">
                    <h3>Key Features</h3>
                    <ul>${featuresHtml}</ul>
                </div>

                <div class="project-modal-tech">
                    <h3>Technologies Used</h3>
                    <div class="tech-tags">${techHtml}</div>
                </div>

                <div class="project-modal-links">
                    ${linksHtml}
                </div>
            </div>
        `;
  },

  setupImageGallery(images) {
    if (images.length <= 1) return;

    const mainImage = elements.modalBody.querySelector(".main-project-image");
    const thumbnails = elements.modalBody.querySelectorAll(".thumbnail");

    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", () => {
        const index = parseInt(thumbnail.getAttribute("data-index"));
        mainImage.src = images[index];

        thumbnails.forEach((t) => t.classList.remove("active"));
        thumbnail.classList.add("active");
      });
    });
  },

  close() {
    elements.modal.classList.remove("active");
    document.body.style.overflow = "";
  },
};

// =============================================
// Contact Form
// =============================================

const contactForm = {
  init() {
    if (elements.contactForm) {
      elements.contactForm.addEventListener("submit", (e) =>
        this.handleSubmit(e)
      );
    }

    if (elements.toastClose) {
      elements.toastClose.addEventListener("click", () => this.hideToast());
    }
  },

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) return;

    this.setLoading(true);

    try {
      // Submit form using mailto
      await this.submitForm();
      this.showToast(
        "Email client opened! Please send the email to complete your message.",
        "success"
      );
      elements.contactForm.reset();
    } catch (error) {
      this.showToast("Failed to send message. Please try again.", "error");
    } finally {
      this.setLoading(false);
    }
  },

  validateForm() {
    const formData = new FormData(elements.contactForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();

    let isValid = true;

    // Reset previous errors
    this.clearErrors();

    // Validate name
    if (!name) {
      this.showFieldError("name", "Name is required");
      isValid = false;
    }

    // Validate email
    if (!email) {
      this.showFieldError("email", "Email is required");
      isValid = false;
    } else if (!this.isValidEmail(email)) {
      this.showFieldError("email", "Please enter a valid email address");
      isValid = false;
    }

    // Validate message
    if (!message) {
      this.showFieldError("message", "Message is required");
      isValid = false;
    } else if (message.length < 10) {
      this.showFieldError(
        "message",
        "Message must be at least 10 characters long"
      );
      isValid = false;
    }

    return isValid;
  },

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);

    if (field && errorElement) {
      field.closest(".form-group").classList.add("error");
      errorElement.textContent = message;
      errorElement.setAttribute("aria-live", "polite");
    }
  },

  clearErrors() {
    const errorElements = document.querySelectorAll(".error-message");
    const formGroups = document.querySelectorAll(".form-group");

    errorElements.forEach((element) => {
      element.textContent = "";
      element.removeAttribute("aria-live");
    });

    formGroups.forEach((group) => {
      group.classList.remove("error");
    });
  },

  async submitForm() {
    // Get form data
    const formData = new FormData(elements.contactForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const subject = formData.get("subject").trim() || "Portfolio Contact";
    const message = formData.get("message").trim();

    // Create mailto link with form data
    const mailtoSubject = encodeURIComponent(`${subject} - From ${name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const mailtoLink = `mailto:krishnamali19d@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Open email client
    window.open(mailtoLink);

    // Return success for the form handler
    return Promise.resolve({ success: true });
  },

  setLoading(loading) {
    const btnText = elements.submitBtn.querySelector(".btn-text");
    const btnLoading = elements.submitBtn.querySelector(".btn-loading");

    if (loading) {
      btnText.style.display = "none";
      btnLoading.style.display = "flex";
      elements.submitBtn.disabled = true;
    } else {
      btnText.style.display = "flex";
      btnLoading.style.display = "none";
      elements.submitBtn.disabled = false;
    }
  },

  showToast(message, type = "success") {
    elements.toastMessage.textContent = message;
    elements.toast.className = `toast ${type} show`;

    // Auto hide after duration
    setTimeout(() => {
      this.hideToast();
    }, CONFIG.toastDuration);
  },

  hideToast() {
    elements.toast.classList.remove("show");
  },
};

// =============================================
// Performance Optimizations
// =============================================

const performance = {
  init() {
    this.lazyLoadImages();
    this.preloadCriticalAssets();
  },

  lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src || img.dataset.src;
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      images.forEach((img) => {
        img.src = img.src || img.dataset.src;
      });
    }
  },

  preloadCriticalAssets() {
    // Preload hero image and other critical assets
    const criticalAssets = [
      "assets/profile-placeholder.jpg",
      "assets/lookmaxpro-1.png",
    ];

    criticalAssets.forEach((asset) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = asset;
      document.head.appendChild(link);
    });
  },
};

// =============================================
// Accessibility Enhancements
// =============================================

const accessibility = {
  init() {
    this.setupKeyboardNavigation();
    this.announcePageChanges();
    this.setupFocusManagement();
  },

  setupKeyboardNavigation() {
    // Skip to main content link
    const skipLink = document.createElement("a");
    skipLink.href = "#main";
    skipLink.textContent = "Skip to main content";
    skipLink.className = "skip-link";
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Keyboard navigation for project cards
    elements.projectCards.forEach((card) => {
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "View project details");

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const projectId = parseInt(card.getAttribute("data-project"));
          projectModal.showProject(projectId);
        }
      });
    });
  },

  announcePageChanges() {
    // Create live region for dynamic content announcements
    const liveRegion = document.createElement("div");
    liveRegion.id = "live-region";
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.style.cssText =
      "position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;";
    document.body.appendChild(liveRegion);
  },

  setupFocusManagement() {
    // Manage focus for modal
    elements.modal.addEventListener("show", () => {
      const firstFocusable = elements.modal.querySelector(
        'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
        firstFocusable.focus();
      }
    });

    // Trap focus in modal
    elements.modal.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        this.trapFocus(e, elements.modal);
      }
    });
  },

  trapFocus(e, container) {
    const focusableElements = container.querySelectorAll(
      'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
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
  },
};

// =============================================
// Analytics (Optional)
// =============================================

const analytics = {
  init() {
    this.trackPageView();
    this.setupEventTracking();
  },

  trackPageView() {
    // TODO: Replace with your analytics implementation
    if (typeof gtag !== "undefined") {
      gtag("config", "GA_MEASUREMENT_ID", {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  },

  setupEventTracking() {
    // Track project views
    elements.projectDetailsButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const projectId = button.getAttribute("data-project");
        this.trackEvent("project_view", {
          project_id: projectId,
          project_name: projectsData[projectId]?.title,
        });
      });
    });

    // Track contact form submissions
    if (elements.contactForm) {
      elements.contactForm.addEventListener("submit", () => {
        this.trackEvent("contact_form_submit");
      });
    }

    // Track external link clicks
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      link.addEventListener("click", () => {
        this.trackEvent("external_link_click", {
          link_url: link.href,
          link_text: link.textContent.trim(),
        });
      });
    });
  },

  trackEvent(eventName, parameters = {}) {
    // TODO: Replace with your analytics implementation
    if (typeof gtag !== "undefined") {
      gtag("event", eventName, parameters);
    }

    // Console log for development
    console.log("Analytics Event:", eventName, parameters);
  },
};

// =============================================
// Application Initialization
// =============================================

class PortfolioApp {
  constructor() {
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;

    try {
      // Initialize all modules
      loadingScreen.init();
      themeManager.init();
      navigation.init();
      typewriter.init();
      scrollAnimations.init();
      projectModal.init();
      contactForm.init();
      performance.init();
      accessibility.init();
      analytics.init();

      this.isInitialized = true;
      console.log("Portfolio website initialized successfully");
    } catch (error) {
      console.error("Error initializing portfolio:", error);
    }
  }

  // Public API for external use
  showProject(projectId) {
    projectModal.showProject(projectId);
  }

  scrollToSection(sectionId) {
    utils.scrollToElement(`#${sectionId}`);
  }

  toggleTheme() {
    themeManager.toggle();
  }
}

// =============================================
// Initialize Application
// =============================================

// Create global app instance
const portfolioApp = new PortfolioApp();

// Initialize when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => portfolioApp.init());
} else {
  portfolioApp.init();
}

// Make app available globally for debugging/external use
window.portfolioApp = portfolioApp;

// =============================================
// Service Worker Registration (Optional)
// =============================================

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
