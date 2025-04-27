document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour initialiser un carousel
    function initCarousel(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return null;

        const track = container.querySelector('.carousel-track');
        const slides = Array.from(container.querySelectorAll('.carousel-slide'));
        const dotsContainer = container.querySelector('.carousel-dots');
        const prevButton = container.querySelector('.carousel-arrow.prev');
        const nextButton = container.querySelector('.carousel-arrow.next');

        let currentSlide = 0;
        let isTransitioning = false;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let autoplayTimer;

        // Créer les points de navigation
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Slide ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        // Mettre à jour les points
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        // Aller à une slide spécifique
        function goToSlide(index, smooth = true) {
            if (isTransitioning || index === currentSlide) return;
            isTransitioning = true;

            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            track.style.transition = smooth ? 'transform 0.5s ease-in-out' : 'none';
            track.style.transform = `translateX(-${index * 100}%)`;
            currentSlide = index;
            updateDots();

            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }

        // Navigation
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        // Autoplay
        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(nextSlide, 5000);
        }

        function stopAutoplay() {
            if (autoplayTimer) clearInterval(autoplayTimer);
        }

        // Gestion du glissement
        function getPositionX(e) {
            return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        }

        function dragStart(e) {
            if (isTransitioning) return;
            isDragging = true;
            startPos = getPositionX(e);
            track.style.cursor = 'grabbing';
            stopAutoplay();
        }

        function drag(e) {
            if (!isDragging) return;

            const currentPosition = getPositionX(e);
            const diff = currentPosition - startPos;
            currentTranslate = prevTranslate + diff;

            // Limiter le glissement
            const maxTranslate = -(slides.length - 1) * container.offsetWidth;
            currentTranslate = Math.max(Math.min(currentTranslate, 0), maxTranslate);

            track.style.transform = `translateX(${currentTranslate}px)`;
        }

        function dragEnd() {
            isDragging = false;
            track.style.cursor = '';

            const movedBy = currentTranslate - prevTranslate;
            const threshold = container.offsetWidth * 0.2;

            if (Math.abs(movedBy) > threshold) {
                if (movedBy > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
            } else {
                goToSlide(currentSlide);
            }

            startAutoplay();
        }

        // Event listeners
        if (prevButton) prevButton.addEventListener('click', prevSlide);
        if (nextButton) nextButton.addEventListener('click', nextSlide);

        // Touch events
        track.addEventListener('touchstart', dragStart);
        track.addEventListener('touchmove', drag);
        track.addEventListener('touchend', dragEnd);

        // Mouse events
        track.addEventListener('mousedown', dragStart);
        track.addEventListener('mousemove', drag);
        track.addEventListener('mouseup', dragEnd);
        track.addEventListener('mouseleave', dragEnd);

        // Prevent context menu
        track.addEventListener('contextmenu', (e) => e.preventDefault());

        // Pause on hover
        container.addEventListener('mouseenter', stopAutoplay);
        container.addEventListener('mouseleave', startAutoplay);

        // Start autoplay
        startAutoplay();

        return {
            next: nextSlide,
            prev: prevSlide,
            goTo: goToSlide
        };
    }

    // Initialiser les carousels
    const projectsCarousel = initCarousel('.projects-carousel');
    const experienceCarousel = initCarousel('.experience-carousel');

    // Navigation au clavier globale
    document.addEventListener('keydown', (e) => {
        const activeSection = document.querySelector(':target') || document.querySelector('#projects');
        if (activeSection.id === 'projects' && projectsCarousel) {
            if (e.key === 'ArrowLeft') projectsCarousel.prev();
            if (e.key === 'ArrowRight') projectsCarousel.next();
        } else if (activeSection.id === 'experience' && experienceCarousel) {
            if (e.key === 'ArrowLeft') experienceCarousel.prev();
            if (e.key === 'ArrowRight') experienceCarousel.next();
        }
    });
});

