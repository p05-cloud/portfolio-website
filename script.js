document.addEventListener('DOMContentLoaded', function () {
    // Enhanced Loading Animation
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div class="loader-text">Loading...</div>
        </div>
    `;
    document.body.appendChild(loader);

    // Hide loader after page loads
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('.navbar .nav-links a').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Highlight Active Navigation Link on Scroll
    const navLinks = document.querySelectorAll('.navbar .nav-links a');
    window.addEventListener('scroll', () => {
        const fromTop = window.scrollY + 100;

        navLinks.forEach(link => {
            const section = document.querySelector(link.hash);
            if (section) {
                const { offsetTop, offsetHeight } = section;
                if (offsetTop <= fromTop && offsetTop + offsetHeight > fromTop) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    });

    // Enhanced Scroll Animations with Different Effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .glass-card, .fade-in-up, .fade-in').forEach(element => {
        observer.observe(element);
    });

    // Typing Animation for Hero Text
    const heroTitle = document.querySelector('.name-highlight, .hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        setTimeout(typeWriter, 1000);
    }

    // Floating Particles Background
    const createParticles = () => {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    };
    createParticles();

    // Enhanced Skill Bars Animation
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.animationDelay = `${index * 0.2}s`;
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-15px) scale(1.05) rotateY(5deg)';
            category.style.boxShadow = '0 25px 50px rgba(0, 255, 255, 0.3)';
        });
        category.addEventListener('mouseleave', () => {
            category.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
            category.style.boxShadow = '0 10px 20px rgba(255, 255, 255, 0.1)';
        });
    });

    // Skill Progress Bars Animation
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const animateSkillBars = () => {
        skillProgressBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }, index * 100);
        });
    };

    // Initialize skill progress bars as empty
    skillProgressBars.forEach(bar => {
        bar.style.width = '0%';
    });

    // Trigger skill bars animation when skills section is visible
    const skillsSection = document.querySelector('#skills, .skills-section');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        });
        skillsObserver.observe(skillsSection);
    }

    // Enhanced Project Cards with 3D Effects
    const projectCards = document.querySelectorAll('.project-card, .glass-card:not(.about-section .glass-card)');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;

        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.transform = `translateY(-15px) rotateX(${(y - rect.height / 2) / 10}deg) rotateY(${(x - rect.width / 2) / 10}deg)`;
            card.style.boxShadow = '0 25px 50px rgba(0, 255, 255, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
            card.style.boxShadow = '0 10px 20px rgba(255, 255, 255, 0.1)';
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.transform = `translateY(-15px) rotateX(${(y - rect.height / 2) / 20}deg) rotateY(${(x - rect.width / 2) / 20}deg)`;
        });
    });

    // Timeline Animation with Enhanced Effects
    const timelineItems = document.querySelectorAll('.timeline-item, .experience-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
        item.classList.add('fade-in-up');

        // Add pulse effect to timeline dots
        const dot = item.querySelector('.timeline-dot');
        if (dot) {
            setTimeout(() => {
                dot.style.animation = 'pulse 2s infinite';
            }, index * 300);
        }
    });

    // Staggered Grid Animations
    const gridItems = document.querySelectorAll('.grid > *');
    gridItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in-up');
    });

    // Enhanced Contact Links with Ripple Effect
    const contactLinks = document.querySelectorAll('.contact-link, .contact-card');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = e.offsetX + 'px';
            ripple.style.top = e.offsetY + 'px';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-8px) scale(1.05)';
            link.style.boxShadow = '0 15px 30px rgba(0, 255, 255, 0.3)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
            link.style.boxShadow = '0 5px 15px rgba(255, 255, 255, 0.1)';
        });
    });

    // Parallax Effect for Background Elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');

        parallaxElements.forEach(element => {
            const rate = element.getAttribute('data-parallax') || 0.5;
            element.style.transform = `translateY(${scrolled * rate}px)`;
        });
    });

    // Enhanced Navbar with Glass Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 5px 20px rgba(0, 255, 255, 0.1)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = 'none';
            }
        });
    }



    // Scroll to Top Button Enhancement
    const scrollToTopBtn = document.getElementById('scrollToTop') || document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Enhanced CSS Animations
    const style = document.createElement('style');
    style.textContent = `
        /* Page Loader */
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
        .loader-content {
            text-align: center;
            color: #00ffff;
        }
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(0, 255, 255, 0.3);
            border-top: 3px solid #00ffff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        .loader-text {
            font-size: 1.2rem;
            font-weight: 600;
        }

        /* Particles */
        .particles-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }
        .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 255, 255, 0.5);
            border-radius: 50%;
            animation: float 20s linear infinite;
        }
        .particle:nth-child(odd) {
            background: rgba(255, 0, 255, 0.5);
            animation-duration: 25s;
        }

        /* Enhanced Animations */
        section, .glass-card, .fade-in-up, .fade-in {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        section.animate-in, .glass-card.animate-in, .fade-in-up.animate-in, .fade-in.animate-in {
            opacity: 1;
            transform: translateY(0) scale(1);
        }

        /* Typing Animation */
        .typing-cursor::after {
            content: '|';
            animation: blink 1s infinite;
        }

        /* Ripple Effect */
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }

        /* Cursor Follow */
        .cursor-follow {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(0, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            transition: all 0.1s ease;
            z-index: 9999;
        }

        /* Scroll to Top Enhancement */
        .scroll-to-top {
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        /* Pulse Animation for Timeline */
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
        }

        /* Float Animation for Particles */
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); }
            100% { transform: translateY(-100vh) rotate(360deg); }
        }

        /* Spin Animation */
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Ripple Animation */
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        /* Blink Animation */
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }

        /* Enhanced Hover Effects */
        .glass-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 255, 255, 0.2);
        }

        /* Navbar Active Link */
        .navbar .nav-links a.active {
            color: #00ffff !important;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }

        /* Responsive Enhancements */
        @media (max-width: 768px) {
            .particle {
                display: none;
            }
            .cursor-follow {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize all animations
    setTimeout(() => {
        document.querySelectorAll('.glass-card, .fade-in-up, .fade-in').forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, index * 50);
        });
    }, 500);
});
