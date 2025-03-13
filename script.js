document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // User name handling
    const usernameElement = document.getElementById('username');
    const storedName = sessionStorage.getItem('visitorName');

    if (usernameElement) {
        if (storedName) {
            console.log('Name from sessionStorage:', storedName);
            usernameElement.textContent = storedName;
        } 
        else {
            const name = prompt('Please enter your name:', '');
            console.log('Name entered:', name);
            if (name && name.trim() !== '') {
                usernameElement.textContent = name;
                sessionStorage.setItem('visitorName', name);
            } else {
                usernameElement.textContent = '(Your Name)';
            }
        }
    }
    
    // Update time in contact form
    function updateTime() {
        const now = new Date();
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = now.toLocaleString();
        }
    }
    
    if (document.getElementById('current-time')) {
        updateTime();
        setInterval(updateTime, 1000);
    }
    
    // Contact form validation and submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isValid = true;
            
            // Validate name
            const name = document.getElementById('name').value;
            const nameError = document.getElementById('nameError');
            if (!name.trim()) {
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }
            
            // Validate email if present on this form
            const emailField = document.getElementById('email');
            if (emailField) {
                const email = emailField.value;
                const emailError = document.getElementById('emailError');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!email.trim() || !emailRegex.test(email)) {
                    emailError.style.display = 'block';
                    isValid = false;
                } else {
                    emailError.style.display = 'none';
                }
            }
            
            // Validate status radio buttons if present
            const prospective = document.getElementById('prospective');
            const current = document.getElementById('current');
            const other = document.getElementById('other');
            const statusError = document.getElementById('statusError');
            
            if (statusError) {
                if ((!prospective || !prospective.checked) && 
                    (!current || !current.checked) && 
                    (!other || !other.checked)) {
                    statusError.style.display = 'block';
                    isValid = false;
                } else {
                    statusError.style.display = 'none';
                }
            }
            
            // Validate message
            const message = document.getElementById('message').value;
            const messageError = document.getElementById('messageError');
            if (!message.trim()) {
                messageError.style.display = 'block';
                isValid = false;
            } else {
                messageError.style.display = 'none';
            }
            
            // If valid, update info panel
            if (isValid) {
                const infoName = document.getElementById('info-name');
                const infoEmail = document.getElementById('info-email');
                const infoStatus = document.getElementById('info-status');
                const infoMessage = document.getElementById('info-message');
                
                if (infoName) infoName.textContent = name;
                
                if (infoEmail && emailField) {
                    infoEmail.textContent = emailField.value;
                }
                
                if (infoStatus) {
                    let status = '';
                    if (prospective && prospective.checked) status = 'Prospective Parent';
                    else if (current && current.checked) status = 'Current Parent';
                    else if (other && other.checked) status = 'Other';
                    infoStatus.textContent = status;
                }
                
                if (infoMessage) infoMessage.textContent = message;
                
                contactForm.reset();
                const infoPanel = document.getElementById('submitted-info');
                if (infoPanel) {
                    infoPanel.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // Smooth scrolling for navigation links
    const quickLinks = document.querySelectorAll('.quick-link-btn');
    if (quickLinks.length > 0) {
        quickLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const currentScroll = window.scrollY;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
                    const direction = targetPosition < currentScroll ? 'up' : 'down';

                    scrollToSection(targetSection);
                    animateSection(targetSection, direction);
                } else {
                    console.log('Section not found for ID:', targetId);
                }
            });
        });
    }

    // Navigation link handling
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';

            // Handle same page links
            if (href.startsWith('#')) {
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const currentScroll = window.scrollY;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
                    const direction = targetPosition < currentScroll ? 'up' : 'down';

                    scrollToSection(targetSection);
                    animateSection(targetSection, direction);
                } else if (href === '#welcome' && currentPage === 'index.html') {
                    scrollToTop();
                    const welcomeSection = document.querySelector('#welcome');
                    if (welcomeSection) animateSection(welcomeSection, 'up');
                } else if (href === '#about-banner' && currentPage === 'profile.html') {
                    scrollToTop();
                    const aboutBanner = document.querySelector('#about-banner');
                    if (aboutBanner) animateSection(aboutBanner, 'up');
                }
            } else {
                // Handle links to different pages
                const [targetPage, targetSection] = href.split('#');
                if (targetPage && targetPage !== currentPage) {
                    const transitionOverlay = document.createElement('div');
                    transitionOverlay.classList.add('page-transition-overlay');
                    document.body.appendChild(transitionOverlay);

                    const isToProfile = targetPage === 'profile.html';
                    const directionClass = isToProfile ? 'slide-to-left' : 'slide-to-right';

                    document.body.classList.add('page-exit', directionClass);

                    setTimeout(() => {
                        transitionOverlay.classList.add('active');
                    }, 10); 

                    setTimeout(() => {
                        window.location.href = href;
                    }, 500); 

                } else if (targetSection) {
                    const section = document.querySelector(`#${targetSection}`);
                    if (section) {
                        const currentScroll = window.scrollY;
                        const targetPosition = section.getBoundingClientRect().top + window.scrollY;
                        const direction = targetPosition < currentScroll ? 'up' : 'down';

                        scrollToSection(section);
                        animateSection(section, direction);
                    }
                }
            }
        });
    });

    // Helper function - scroll to section
    function scrollToSection(section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Helper function - scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Helper function - section animation
    function animateSection(section, direction) {
        document.querySelectorAll('section, .about-banner').forEach(sec => {
            sec.classList.remove('slide-in-up', 'slide-in-down');
        });
        const animationClass = direction === 'up' ? 'slide-in-up' : 'slide-in-down';
        section.classList.add(animationClass);
        setTimeout(() => {
            section.classList.remove(animationClass);
        }, 800);
    }

    // Page load transitions
    window.addEventListener('load', () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const referrer = document.referrer;
        const fromProfile = referrer.includes('profile.html');
        const fromIndex = referrer.includes('index.html');

        const existingOverlay = document.querySelector('.page-transition-overlay');
        if (existingOverlay) {
            existingOverlay.classList.remove('active');
            setTimeout(() => {
                if (document.body.contains(existingOverlay)) {
                    document.body.removeChild(existingOverlay);
                }
            }, 500); 
        }

        let enterClass = 'slide-in-from-right';
        if (currentPage === 'index.html' && fromProfile) {
            enterClass = 'slide-in-from-left';
        } else if (currentPage === 'profile.html' && fromIndex) {
            enterClass = 'slide-in-from-right';
        }

        document.body.classList.add('page-enter', enterClass);
        setTimeout(() => {
            document.body.classList.remove('page-enter', enterClass);
        }, 500); 

        // Handle hash in URL
        const hash = window.location.hash;
        if (hash) {
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                setTimeout(() => {
                    scrollToSection(targetSection);
                    animateSection(targetSection, 'down');
                }, 100);
            }
        }
    });

    // Image slider functionality (only on index.html)
    const slider = document.querySelector('.slider');
    if (slider) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const dotsContainer = document.querySelector('.slider-dots');
        let currentSlide = 1;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID = 0;
        let autoSlideInterval;

        // Clone first and last slides for infinite effect
        const firstSlideClone = slides[0].cloneNode(true);
        const lastSlideClone = slides[slides.length - 1].cloneNode(true);
        slider.appendChild(firstSlideClone);
        slider.insertBefore(lastSlideClone, slides[0]);

        const allSlides = document.querySelectorAll('.slide');
        slider.style.transform = `translateX(${-currentSlide * 100}%)`;

        // Create dots for slider navigation
        function createDots() {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < slides.length; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    stopAutoSlide();
                    currentSlide = i + 1;
                    setSliderPosition(true);
                    updateDots();
                    startAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
        }

        // Set slider position
        function setSliderPosition(withTransition = true) {
            slider.style.transition = withTransition 
                ? 'transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)' 
                : 'none';
            slider.style.transform = `translateX(${-currentSlide * 100}%)`;
            prevTranslate = -currentSlide * slider.clientWidth;
        }

        // Update navigation dots
        function updateDots() {
            const actualIndex = (currentSlide - 1 + slides.length) % slides.length;
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === actualIndex);
            });
        }

        // Next slide function
        function nextSlide() {
            currentSlide++;
            setSliderPosition();
            if (currentSlide === allSlides.length - 1) {
                setTimeout(() => {
                    currentSlide = 1;
                    setSliderPosition(false);
                }, 600);
            }
            updateDots();
        }

        // Previous slide function
        function prevSlide() {
            currentSlide--;
            setSliderPosition();
            if (currentSlide === 0) {
                setTimeout(() => {
                    currentSlide = slides.length;
                    setSliderPosition(false);
                }, 600);
            }
            updateDots();
        }

        // Auto slide functions
        function startAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        // Add button event listeners
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });

            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
        }

        // Touch and drag functionality
        function startDragging(e) {
            isDragging = true;
            startPos = getPositionX(e);
            currentTranslate = prevTranslate;
            stopAutoSlide();
            animationID = requestAnimationFrame(animation);
            slider.style.transition = 'none';
            e.preventDefault();
        }

        function drag(e) {
            if (isDragging) {
                const currentPosition = getPositionX(e);
                const moveDistance = currentPosition - startPos;
                currentTranslate = prevTranslate + moveDistance;
                slider.style.transform = `translateX(${currentTranslate}px)`;
                e.preventDefault();
            }
        }

        function stopDragging() {
            if (isDragging) {
                isDragging = false;
                cancelAnimationFrame(animationID);
                const movedBy = currentTranslate - prevTranslate;
                const slideWidth = slider.clientWidth;

                if (movedBy < -slideWidth / 3 && currentSlide < allSlides.length - 1) {
                    currentSlide++;
                } else if (movedBy > slideWidth / 3 && currentSlide > 0) {
                    currentSlide--;
                }

                if (currentSlide === allSlides.length - 1) {
                    setTimeout(() => {
                        currentSlide = 1;
                        setSliderPosition(false);
                    }, 500);
                } else if (currentSlide === 0) {
                    setTimeout(() => {
                        currentSlide = slides.length;
                        setSliderPosition(false);
                    }, 500);
                }

                setSliderPosition(true);
                updateDots();
                startAutoSlide();
            }
        }

        function getPositionX(e) {
            return e.type.includes('touch') ? e.touches[0].clientX : e.pageX;
        }

        function animation() {
            if (isDragging) {
                slider.style.transform = `translateX(${currentTranslate}px)`;
                requestAnimationFrame(animation);
            }
        }

        // Add slider touch events
        slider.addEventListener('mousedown', startDragging);
        slider.addEventListener('touchstart', startDragging, { passive: false });
        slider.addEventListener('mouseup', stopDragging);
        slider.addEventListener('touchend', stopDragging);
        slider.addEventListener('mousemove', drag);
        slider.addEventListener('touchmove', drag, { passive: false });
        slider.addEventListener('mouseleave', stopDragging);
        slider.addEventListener('touchcancel', stopDragging);

        // Initialize slider
        createDots();
        setSliderPosition();
        startAutoSlide();

        // Handle slider transitions properly
        slider.addEventListener('transitionend', () => {
            if (currentSlide === 0) {
                currentSlide = slides.length;
                setSliderPosition(false);
                updateDots();
            } else if (currentSlide === allSlides.length - 1) {
                currentSlide = 1;
                setSliderPosition(false);
                updateDots();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (slider) {
                setSliderPosition(false);
                const slides = document.querySelectorAll('.slide');
                slides.forEach(slide => {
                    slide.style.height = `${slider.clientHeight}px`;
                });
            }
        });
    }

    // Animated heading text
    const welcomeHeading = document.querySelector('.welcome h1');
    
    if (welcomeHeading) {
        // Character-by-character animation
        animateText(welcomeHeading);
        
        // Add interaction for username
        const usernameElement = document.getElementById('username');
        if (usernameElement) {
            usernameElement.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.1)';
                this.style.textShadow = '0 0 15px rgba(126, 87, 194, 0.8)';
            });
            
            usernameElement.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1)';
                this.style.textShadow = '';
            });
        }
    }
    
    // Character-by-character animation function
    function animateText(element) {
        if (!element) return;
        
        // Skip if already animated
        if (element.classList.contains('text-animated')) return;
        
        const text = element.textContent;
        let htmlContent = '';
        
        // Handle username span specially
        if (element.innerHTML.includes('span id="username"')) {
            // Preserve the span for username
            const parts = element.innerHTML.split(/<span id="username">(.*?)<\/span>/);
            
            // Animate the text before and after the span
            htmlContent = animateTextPart(parts[0]) + 
                          '<span id="username">' + (parts[1] || '(Your Name)') + '</span>' + 
                          (parts[2] ? animateTextPart(parts[2]) : '');
        } else {
            htmlContent = animateTextPart(text);
        }
        
        element.innerHTML = htmlContent;
        element.classList.add('text-animated');
        
        // Animate each character
        const chars = element.querySelectorAll('.char-animate');
        chars.forEach((char, index) => {
            setTimeout(() => {
                char.classList.add('char-visible');
            }, 50 * index);
        });
    }
    
    // Helper function to animate text parts
    function animateTextPart(text) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ') {
                result += ' ';
            } else {
                result += `<span class="char-animate">${text[i]}</span>`;
            }
        }
        return result;
    }
    
    // Interactive animations on mousemove
    document.addEventListener('mousemove', function(e) {
        const welcomeSection = document.querySelector('.welcome');
        if (!welcomeSection) return;
        
        const bounds = welcomeSection.getBoundingClientRect();
        if (e.clientX >= bounds.left && e.clientX <= bounds.right && 
            e.clientY >= bounds.top && e.clientY <= bounds.bottom) {
            
            // Calculate mouse position relative to section center
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            const posX = e.clientX - bounds.left - centerX;
            const posY = e.clientY - bounds.top - centerY;
            
            // Apply subtle parallax effect
            const welcomeHeading = document.querySelector('.welcome h1');
            const welcomeParagraph = document.querySelector('.welcome p');
            
            if (welcomeHeading) {
                welcomeHeading.style.transform = `translateX(${posX / 50}px) translateY(${posY / 50}px)`;
            }
            
            if (welcomeParagraph) {
                welcomeParagraph.style.transform = `translateX(${posX / 80}px) translateY(${posY / 80}px)`;
            }
        }
    });

    // Scrolling animations
    const sections = document.querySelectorAll('section, .about-banner');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-animate');
                
                // Add specific animation to children elements if needed
                const title = entry.target.querySelector('h2');
                if (title) {
                    title.classList.add('slide-in-left');
                }
                
                // Add animation to content containers
                const contentContainers = entry.target.querySelectorAll('.why-container, .event-container, .experience-container, .quote-container, .resource-container, .about-content, .vm-container, .stats-container, .achievement-container, .facility-icons, .testimonial-container, .leadership-container');
                contentContainers.forEach((container, index) => {
                    setTimeout(() => {
                        container.classList.add('slide-in-up');
                    }, 200);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Set correct slider height on page load
    document.addEventListener('DOMContentLoaded', () => {
        if (slider) {
            const slides = document.querySelectorAll('.slide');
            slides.forEach(slide => {
                slide.style.height = `${slider.clientHeight}px`;
            });
        }
    });

    console.log('Script loaded on:', window.location.pathname);
});