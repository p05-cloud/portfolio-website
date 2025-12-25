document.addEventListener('DOMContentLoaded', function () {
    // Detect device capabilities
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;

    // ====================================
    // 1. HAMBURGER MENU FIX (CRITICAL)
    // ====================================
    const hamburger = document.querySelector('.hamburger, .nav-toggle');
    const navLinks = document.querySelector('.nav-links, .nav-menu');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a, .nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ====================================
    // 2. OPTIMIZED LOADING ANIMATION
    // ====================================
    if (!isTouchDevice && !prefersReducedMotion && !isMobile) {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-text">Loading...</div>
            </div>
        `;
        document.body.appendChild(loader);

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }, 800);
        });
    }

    // ====================================
    // 3. SMOOTH SCROLL (MOBILE OPTIMIZED)
    // ====================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ====================================
    // 4. ACTIVE NAV LINK (THROTTLED)
    // ====================================
    let scrollTimeout;
    const updateActiveNavLink = () => {
        const fromTop = window.scrollY + 150;
        document.querySelectorAll('.navbar .nav-links a, .nav-menu a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const section = document.querySelector(href);
                if (section) {
                    const { offsetTop, offsetHeight } = section;
                    if (offsetTop <= fromTop && offsetTop + offsetHeight > fromTop) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                }
            }
        });
    };

    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNavLink, 100);
    });

    // ====================================
    // 5. INTERSECTION OBSERVER (OPTIMIZED)
    // ====================================
    const observerOptions = {
        threshold: isMobile ? 0.05 : 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('section, .glass-card, .fade-in-up, .fade-in, .skill-category, .project-card, .certification-item').forEach(element => {
        observer.observe(element);
    });

    // ====================================
    // 6. SKILL PROGRESS BARS
    // ====================================
    const animateSkillBars = () => {
        document.querySelectorAll('.skill-progress').forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width') || bar.style.getPropertyValue('--progress') || '0%';
                bar.style.width = width;
            }, index * 50);
        });
    };

    // Initialize skill bars
    document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    const skillsSection = document.querySelector('#skills, .skills-section, .skills-showcase');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        skillsObserver.observe(skillsSection);
    }

    // ====================================
    // 7. CARD HOVER EFFECTS (DESKTOP ONLY)
    // ====================================
    if (!isTouchDevice && !isMobile) {
        const cards = document.querySelectorAll('.glass-card:not(.featured), .project-card, .skill-category, .certification-item');
        
        cards.forEach(card => {
            // Disable transform effects for cards that shouldn't tilt
            const shouldNotTilt = card.closest('.about-section') || card.classList.contains('featured');
            if (shouldNotTilt) return;

            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });

            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // ====================================
    // 8. NAVBAR SCROLL EFFECT (THROTTLED)
    // ====================================
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let navbarTimeout;

    if (navbar) {
        window.addEventListener('scroll', () => {
            clearTimeout(navbarTimeout);
            navbarTimeout = setTimeout(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 100) {
                    navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                    navbar.style.backdropFilter = 'blur(20px)';
                    navbar.style.boxShadow = '0 5px 20px rgba(0, 255, 255, 0.1)';
                } else {
                    navbar.style.background = 'rgba(0, 0, 0, 0.8)';
                    navbar.style.backdropFilter = 'blur(10px)';
                    navbar.style.boxShadow = 'none';
                }

                // Hide navbar on scroll down, show on scroll up (mobile only)
                if (isMobile) {
                    if (scrollTop > lastScrollTop && scrollTop > 300) {
                        navbar.style.transform = 'translateY(-100%)';
                    } else {
                        navbar.style.transform = 'translateY(0)';
                    }
                }
                lastScrollTop = scrollTop;
            }, 50);
        });
    }

    // ====================================
    // 9. SCROLL TO TOP BUTTON
    // ====================================
    const scrollToTopBtn = document.getElementById('scrollToTop') || document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        let scrollBtnTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollBtnTimeout);
            scrollBtnTimeout = setTimeout(() => {
                if (window.scrollY > 300) {
                    scrollToTopBtn.classList.add('show', 'visible');
                    scrollToTopBtn.style.opacity = '1';
                    scrollToTopBtn.style.visibility = 'visible';
                } else {
                    scrollToTopBtn.classList.remove('show', 'visible');
                    scrollToTopBtn.style.opacity = '0';
                    scrollToTopBtn.style.visibility = 'hidden';
                }
            }, 100);
        });

        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ====================================
    // 10. TIMELINE ANIMATIONS
    // ====================================
    const timelineItems = document.querySelectorAll('.timeline-item, .experience-item, .timeline-block');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // ====================================
    // 11. PARTICLES (DESKTOP ONLY)
    // ====================================
    if (!isTouchDevice && !prefersReducedMotion && !isMobile) {
        const createParticles = () => {
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'particles-container';
            particlesContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;';
            document.body.appendChild(particlesContainer);

            for (let i = 0; i < 30; i++) { // Reduced from 50
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: rgba(0, 255, 255, 0.3);
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    animation: float ${Math.random() * 10 + 15}s linear infinite;
                    animation-delay: ${Math.random() * 5}s;
                `;
                particlesContainer.appendChild(particle);
            }
        };
        createParticles();
    }

    // ====================================
    // 12. ADD NECESSARY CSS STYLES
    // ====================================
    const style = document.createElement('style');
    style.textContent = `
        /* Hamburger active state */
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }

        /* Navigation active on mobile */
        @media (max-width: 768px) {
            .nav-links, .nav-menu {
                position: fixed;
                left: -100%;
                top: 60px;
                width: 100%;
                height: calc(100vh - 60px);
                background: rgba(0, 0, 0, 0.98);
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transition: left 0.3s ease;
                z-index: 999;
            }
            
            .nav-links.active, .nav-menu.active {
                left: 0;
            }

            .nav-links li, .nav-menu li {
                margin: 20px 0;
            }

            .navbar {
                transition: transform 0.3s ease, background 0.3s ease;
            }
        }

        /* Loader */
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(0, 255, 255, 0.3);
            border-top: 3px solid #00ffff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        /* Animations */
        section, .glass-card, .fade-in-up, .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        section.animate-in, .glass-card.animate-in, .fade-in-up.animate-in, .fade-in.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        /* Particles */
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Active nav link */
        .navbar .nav-links a.active,
        .nav-menu a.active {
            color: #00ffff !important;
            font-weight: 600;
        }

        /* Scroll to top */
        .scroll-to-top {
            opacity: 0;
            visibility: hidden;
            transform: scale(0.8);
            transition: all 0.3s ease;
        }
        
        .scroll-to-top.show,
        .scroll-to-top.visible {
            opacity: 1 !important;
            visibility: visible !important;
            transform: scale(1);
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
            .particles-container {
                display: none !important;
            }
            
            /* Disable transform effects on touch devices */
            .glass-card,
            .project-card,
            .skill-category {
                transform: none !important;
            }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);

    // ====================================
    // 13. INITIALIZE ANIMATIONS
    // ====================================
    setTimeout(() => {
        document.querySelectorAll('.fade-in-up, .fade-in').forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, index * 50);
        });
    }, 300);

    // ====================================
    // 14. HANDLE WINDOW RESIZE
    // ====================================
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newIsMobile = window.innerWidth <= 768;
            if (newIsMobile !== isMobile) {
                location.reload(); // Reload if switching between mobile/desktop
            }
        }, 250);
    });

    // ====================================
    // 15. PERFORMANCE OPTIMIZATION
    // ====================================
    // Disable animations after page is fully loaded to save resources
    window.addEventListener('load', () => {
        setTimeout(() => {
            // Remove particle animations on mobile after initial load
            if (isMobile || isTouchDevice) {
                document.querySelectorAll('.particle, .floating-orb, .geometric-shapes').forEach(el => {
                    el.remove();
                });
            }
        }, 5000);
    });
});