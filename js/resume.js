(function($) {
  "use strict"; // Start of use strict

  // Initialize language
  let currentLang = 'fr';

  // Function to toggle language
  window.toggleLanguage = function() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    updateLanguage();
  };

  // Function to update all translations
  window.updateLanguage = function() {
    document.getElementById('current-lang').textContent = currentLang.toUpperCase();
    document.querySelector('.language-switch .other-lang').textContent = 
      currentLang === 'fr' ? 'EN' : 'FR';

    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[currentLang] && translations[currentLang][key]) {
        element.textContent = translations[currentLang][key];
      }
    });
  }

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

  // Show modal with specified image
  window.showModal = function(imageSrc) {
    $('#certificateModal').css('display', 'block');
    $('#modalImage').attr('src', 'img/' + imageSrc);
  };

  // Hide modal
  window.hideModal = function() {
    $('#certificateModal').css('display', 'none');
  };

  // Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('visible');
      }
  });
}, observerOptions);

// Observe all resume sections
document.querySelectorAll('.resume-section').forEach(section => {
  observer.observe(section);
});
// Fade-in apparition for project cards
document.querySelectorAll('.project-card').forEach(card => {
  observer.observe(card);
});

// Loading bar animation
window.addEventListener('load', () => {
  const loadingBar = document.querySelector('.loading-bar');
  loadingBar.style.width = '100%';
  setTimeout(() => {
      loadingBar.style.opacity = '0';
  }, 1000);
});

// ----- Progress Bar (lecture) -----
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = progress + '%';
});

// Smooth scroll for navigation links (offset sticky nav)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1 && document.querySelector(href)) {
          e.preventDefault();
          const target = document.querySelector(href);
          const offset = document.querySelector('.sticky-nav')?.offsetHeight || 0;
          const top = target.getBoundingClientRect().top + window.scrollY - offset + 2;
          window.scrollTo({ top, behavior: 'smooth' });
      }
  });
});

// ----- Active Nav Highlight -----
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
      }
  });
  navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
      }
  });
});

// ----- Burger Menu Mobile Overlay -----
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.navbar-toggler');
    const navCollapse = document.querySelector('.navbar-collapse');

    if (burger && navCollapse) {
        // Supprimer les gestionnaires d'événements existants
        burger.replaceWith(burger.cloneNode(true));
        const newBurger = document.querySelector('.navbar-toggler');

        // Ajouter le nouveau gestionnaire d'événements
        newBurger.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            if (navCollapse.classList.contains('show')) {
                navCollapse.classList.remove('show');
                navCollapse.removeAttribute('aria-modal');
                navCollapse.removeAttribute('tabindex');
            } else {
                navCollapse.classList.add('show');
                navCollapse.setAttribute('aria-modal', 'true');
                navCollapse.setAttribute('tabindex', '0');
            }
        });

        // Gestionnaire pour les liens de navigation
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navCollapse.classList.remove('show');
                navCollapse.removeAttribute('aria-modal');
                navCollapse.removeAttribute('tabindex');
            });
        });

        // Fermer le menu si on clique en dehors
        document.addEventListener('click', function(event) {
            if (!navCollapse.contains(event.target) && 
                !newBurger.contains(event.target) && 
                navCollapse.classList.contains('show')) {
                navCollapse.classList.remove('show');
                navCollapse.removeAttribute('aria-modal');
                navCollapse.removeAttribute('tabindex');
            }
        });
    }
});

// Dynamic skill badges animation
const animateSkills = () => {
  const skills = document.querySelectorAll('.skill-badge');
  skills.forEach((skill, index) => {
      skill.style.animationDelay = `${index * 0.1}s`;
  });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  animateSkills();
  initializeSkillBars();
  initTitleSlider();
  initCircularSkills();
});

// Typing animation for the introduction
const typeWriter = (element, text, speed = 50) => {
  let i = 0;
  const typing = setInterval(() => {
      if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
      } else {
          clearInterval(typing);
      }
  }, speed);
};

// ==== Project Slider Pro (Ultra professionnel) ====
function initProjectSliderPro() {
  const cards = document.querySelectorAll('.slider-track-pro .card');
  const leftArrow = document.querySelector('.project-slider-pro .slider-arrow-pro.left');
  const rightArrow = document.querySelector('.project-slider-pro .slider-arrow-pro.right');
  const pagination = document.querySelector('.slider-pagination-pro');
  let current = 0;
  let isDragging = false, startX = 0, currentX = 0;

  function showSlide(idx) {
      cards.forEach((card, i) => {
          card.classList.toggle('active', i === idx);
      });
      document.querySelectorAll('.slider-pagination-pro .dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === idx);
      });
      leftArrow.style.display = (idx === 0) ? 'none' : '';
      rightArrow.style.display = (idx === cards.length - 1) ? 'none' : '';
      current = idx;
  }

  // Dots
  pagination.innerHTML = '';
  cards.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => showSlide(i));
      pagination.appendChild(dot);
  });

  leftArrow.onclick = () => { if (current > 0) showSlide(current - 1); };
  rightArrow.onclick = () => { if (current < cards.length - 1) showSlide(current + 1); };

  // Swipe support
  const track = document.querySelector('.slider-track-pro');
  track.addEventListener('touchstart', e => {
      isDragging = true;
      startX = e.touches[0].clientX;
  });
  track.addEventListener('touchmove', e => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
  });
  track.addEventListener('touchend', () => {
      if (!isDragging) return;
      const dx = currentX - startX;
      if (dx > 50 && current > 0) {
          showSlide(current - 1);
      } else if (dx < -50 && current < cards.length - 1) {
          showSlide(current + 1);
      }
      isDragging = false;
      startX = 0;
      currentX = 0;
  });

  showSlide(0);
}



// ==== Project Carousel (Ultra fluide) ====
function initProjectCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const leftArrow = document.querySelector('.project-carousel .carousel-arrow.left');
  const rightArrow = document.querySelector('.project-carousel .carousel-arrow.right');
  const pagination = document.querySelector('.carousel-pagination');
  let current = 0;
  let isDragging = false, startX = 0, currentX = 0;

  function showSlide(idx) {
      slides.forEach((slide, i) => {
          slide.classList.toggle('active', i === idx);
      });
      document.querySelectorAll('.carousel-pagination .dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === idx);
      });
      leftArrow.disabled = idx === 0;
      rightArrow.disabled = idx === slides.length - 1;
      current = idx;
  }

  // Create dots
  pagination.innerHTML = '';
  slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => showSlide(i));
      pagination.appendChild(dot);
  });

  leftArrow.addEventListener('click', () => {
      if (current > 0) showSlide(current - 1);
  });
  rightArrow.addEventListener('click', () => {
      if (current < slides.length - 1) showSlide(current + 1);
  });

  // Swipe support for mobile
  const track = document.querySelector('.carousel-track');
  track.addEventListener('touchstart', e => {
      isDragging = true;
      startX = e.touches[0].clientX;
  });
  track.addEventListener('touchmove', e => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
  });
  track.addEventListener('touchend', () => {
      if (!isDragging) return;
      const dx = currentX - startX;
      if (dx > 50 && current > 0) {
          showSlide(current - 1);
      } else if (dx < -50 && current < slides.length - 1) {
          showSlide(current + 1);
      }
      isDragging = false;
      startX = 0;
      currentX = 0;
  });

  showSlide(0);
}

// ==== Ancien Project Slider/Carousel (pour fallback) ====
function initProjectSlider() {
  const slides = document.querySelectorAll('.project-slide');
  const leftArrow = document.querySelector('.project-slider .slider-arrow.left');
  const rightArrow = document.querySelector('.project-slider .slider-arrow.right');
  const pagination = document.querySelector('.slider-pagination');
  let current = 0;
  let isDragging = false, startX = 0, currentX = 0;

  function showSlide(idx) {
      slides.forEach((slide, i) => {
          slide.classList.toggle('active', i === idx);
      });
      document.querySelectorAll('.slider-pagination .dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === idx);
      });
      leftArrow.disabled = idx === 0;
      rightArrow.disabled = idx === slides.length - 1;
      current = idx;
  }

  // Create dots
  pagination.innerHTML = '';
  slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => showSlide(i));
      pagination.appendChild(dot);
  });

  leftArrow.addEventListener('click', () => {
      if (current > 0) showSlide(current - 1);
  });
  rightArrow.addEventListener('click', () => {
      if (current < slides.length - 1) showSlide(current + 1);
  });

  // Swipe support for mobile
  const track = document.querySelector('.slider-track');
  track.addEventListener('touchstart', e => {
      isDragging = true;
      startX = e.touches[0].clientX;
  });
  track.addEventListener('touchmove', e => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
  });
  track.addEventListener('touchend', () => {
      if (!isDragging) return;
      const dx = currentX - startX;
      if (dx > 50 && current > 0) {
          showSlide(current - 1);
      } else if (dx < -50 && current < slides.length - 1) {
          showSlide(current + 1);
      }
      isDragging = false;
      startX = 0;
      currentX = 0;
  });

  showSlide(0);
}

document.addEventListener('DOMContentLoaded', () => {
  animateSkills();
  initializeSkillBars();
  initTitleSlider();
  initCircularSkills();
  initProjectSlider();
  updateLanguage(); // Initialize translations
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
      card.querySelector('img').style.transform = 'scale(1.05)';
  });
  
  card.addEventListener('mouseleave', () => {
      card.querySelector('img').style.transform = 'scale(1)';
  });
});



// Initialize skill progress bars
const initializeSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-progress-bar');
  
  const animateSkillBar = (bar) => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
      bar.classList.add('animate');
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateSkillBar(entry.target);
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => observer.observe(bar));
};

// Title Slider
const initTitleSlider = () => {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slider-dots');
  let currentSlide = 0;
  let isAnimating = false;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      if (!isAnimating) {
        goToSlide(index);
      }
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function goToSlide(index) {
    if (currentSlide === index) return;
    
    isAnimating = true;
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    setTimeout(() => {
      isAnimating = false;
    }, 500); // Correspond à la durée de la transition CSS
  }

  function nextSlide() {
    if (!isAnimating) {
      goToSlide((currentSlide + 1) % slides.length);
    }
  }

  // Auto advance slides
  const interval = setInterval(nextSlide, 3000);

  // Pause auto-advance on hover
  slides.forEach(slide => {
    slide.addEventListener('mouseenter', () => clearInterval(interval));
    slide.addEventListener('mouseleave', () => setInterval(nextSlide, 3000));
  });

  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  document.querySelector('.slider-container').addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, false);

  document.querySelector('.slider-container').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  }, false);

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentSlide > 0) {
        // Swipe right - previous slide
        goToSlide(currentSlide - 1);
      } else if (diff < 0 && currentSlide < slides.length - 1) {
        // Swipe left - next slide
        goToSlide(currentSlide + 1);
      }
    }
  }
};

// Circular Skills Animation
const initCircularSkills = () => {
  const circles = document.querySelectorAll('.circle-progress');
  
  const animateCircle = (circle) => {
      const value = circle.getAttribute('data-value');
      const circumference = 2 * Math.PI * 54; // r=54 from SVG
      const offset = circumference - (value / 100) * circumference;
      
      const fill = circle.querySelector('.circle-fill');
      fill.style.setProperty('--target-dash', offset);
      fill.classList.add('animate');
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateCircle(entry.target);
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });

  circles.forEach(circle => observer.observe(circle));
};


})(jQuery); // End of use strict
