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
        
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
        
        // 404 Page Functionality
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
        
        // Redirect contact buttons to 404 page
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            show404Page();
        });

        // Make any link that points to #page404 open the 404 overlay
        document.querySelectorAll('a[href="#page404"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                show404Page();
            });
        });
        
        // Also handle any footer links that might be external (non-hash) and keep showing 404 if needed
        document.querySelectorAll('footer a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href === '#page404') {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    show404Page();
                });
                return;
            }
            if (href && href.startsWith('#')) {
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
        
        // Animation on scroll
        function animateOnScroll() {
            const elements = document.querySelectorAll('.service-card, .process-step, .stat-item');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        // Trigger animation on load and scroll
        window.addEventListener('load', animateOnScroll);
        window.addEventListener('scroll', animateOnScroll);
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                if (targetId === '#page404') {
                    e.preventDefault();
                    show404Page();
                    return;
                }
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });