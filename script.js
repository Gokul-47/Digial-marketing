 // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            const backToTop = document.getElementById('backToTop');
            
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Show/hide back to top button
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        // Back to top functionality
        document.getElementById('backToTop').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // 404 Page Functionality
        const externalLinkBtn = document.getElementById('externalLinkBtn');
        const contactBtn = document.getElementById('contactBtn');
        const page404 = document.getElementById('page404');
        const backHomeBtn = document.getElementById('backHomeBtn');
        
        // Function to show 404 page
        function show404Page() {
            page404.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
        
        // Function to hide 404 page
        function hide404Page() {
            page404.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // Redirect all external links to 404 page
        externalLinkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            show404Page();
        });
        
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            show404Page();
        });
        
        // Also handle any footer links that might be external
        document.querySelectorAll('footer a').forEach(link => {
            if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
                // Internal links are fine
                return;
            }
            link.addEventListener('click', (e) => {
                e.preventDefault();
                show404Page();
            });
        });
        
        // Back to homepage button
        backHomeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            hide404Page();
        });
        
        // Testimonial Slider
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        
        testimonialDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const slideIndex = dot.getAttribute('data-slide');
                
                // Update active slide
                testimonialSlides.forEach(slide => slide.classList.remove('active'));
                testimonialSlides[slideIndex].classList.add('active');
                
                // Update active dot
                testimonialDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });
        
        // Auto-rotate testimonials
        let currentTestimonial = 0;
        function rotateTestimonials() {
            testimonialSlides[currentTestimonial].classList.remove('active');
            testimonialDots[currentTestimonial].classList.remove('active');
            
            currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
            
            testimonialSlides[currentTestimonial].classList.add('active');
            testimonialDots[currentTestimonial].classList.add('active');
        }
        
        // Start auto rotation after 5 seconds
        setInterval(rotateTestimonials, 5000);
        
        // Portfolio Filter
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Filter items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
        
        // Animation on scroll
        function animateOnScroll() {
            const elements = document.querySelectorAll('.service-card, .portfolio-item, .team-member, .process-step, .about-content, .about-text, .about-image, .stat, .hero-text, .hero-image');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('animated');
                }
            });
            
            // Animate section titles
            const sectionTitles = document.querySelectorAll('.section-title');
            sectionTitles.forEach(title => {
                const titlePosition = title.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (titlePosition < screenPosition) {
                    const h2 = title.querySelector('h2');
                    const p = title.querySelector('p');
                    
                    if (h2 && !h2.style.animation) {
                        h2.style.animation = 'fadeInDown 0.8s ease-out forwards';
                    }
                    
                    if (p && !p.style.animation) {
                        p.style.animation = 'fadeInUp 0.8s ease-out 0.3s forwards';
                    }
                }
            });
        }
        
        // Trigger animation on load and scroll
        window.addEventListener('load', animateOnScroll);
        window.addEventListener('scroll', animateOnScroll);
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Button ripple effect
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                // Remove any existing ripple
                const existingRipple = this.querySelector('.ripple');
                if (existingRipple) {
                    existingRipple.remove();
                }
                
                // Create ripple element
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.7);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    top: ${y}px;
                    left: ${x}px;
                `;
                
                this.appendChild(ripple);
                
                // Remove ripple after animation completes
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add CSS for ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);