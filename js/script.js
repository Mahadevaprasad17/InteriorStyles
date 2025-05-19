document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }

  // Stats Counter Animation
  const stats = document.querySelectorAll(".stat-number");
  const statsSection = document.querySelector(".stats");

  const startCounters = () => {
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count"));
      const duration = 2000;
      const step = target / (duration / 20);
      let current = 0;

      const counter = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(counter);
        }
        stat.textContent = Math.floor(current);
      }, 20);
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Initialize Swiper
  if (typeof Swiper !== "undefined") {
    const heroSwiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 0,
      effect: "fade",
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });

    const reviewSwiper = new Swiper(".reviewSwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  }

  // Mobile Menu Toggle
  const menuBtn = document.getElementById("openMenu");
  const closeBtn = document.getElementById("closeMenu");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-links ul li a");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.add("active");
    });
  }

  if (closeBtn && navLinks) {
    closeBtn.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  }

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navLinks) navLinks.classList.remove("active");
    });
  });

  // Navbar Scroll Effect
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.style.padding = "5px 0";
        header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
      } else {
        header.style.padding = "10px 0";
        header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
      }
    });
  }

  // Active Link Highlighting
  const sections = document.querySelectorAll("section[id]");

  function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector(".nav-links a[href*=" + sectionId + "]")
          .classList.add("active");
      } else {
        document
          .querySelector(".nav-links a[href*=" + sectionId + "]")
          .classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", debounce(scrollActive));

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Image Hover Effect
  const featureImages = document.querySelectorAll(
    ".feature-image, .offer-image"
  );
  featureImages.forEach((image) => {
    const img = image.querySelector("img");
    if (img) {
      image.addEventListener("mouseenter", () => {
        img.style.transform = "scale(1.05)";
      });

      image.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1)";
      });
    }
  });
});

// Project Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projectItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 200);
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.8)";
        setTimeout(() => {
          item.style.display = "none";
        }, 500);
      }
    });
  });
});

// Debounce Function
function debounce(func, wait = 100) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
