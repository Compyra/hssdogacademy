// script.js

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav a[href^="#"], .btn-primary[href^="#"], .btn-secondary[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to header
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#ffffff';
            header.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Add animation to service cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards and gallery items
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add click tracking for contact buttons
    const contactButtons = document.querySelectorAll('.contact-btn');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a subtle animation feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Simple mobile menu toggle (if needed)
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('.nav');
            const header = document.querySelector('.header .container');
            
            if (!document.querySelector('.mobile-menu-btn')) {
                const menuBtn = document.createElement('button');
                menuBtn.className = 'mobile-menu-btn';
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                menuBtn.style.cssText = `
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: var(--primary-color);
                    cursor: pointer;
                `;
                
                header.appendChild(menuBtn);
                
                menuBtn.addEventListener('click', () => {
                    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
                    nav.style.position = 'absolute';
                    nav.style.top = '100%';
                    nav.style.left = '0';
                    nav.style.right = '0';
                    nav.style.backgroundColor = 'white';
                    nav.style.flexDirection = 'column';
                    nav.style.padding = '1rem';
                    nav.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                });
            }
        }
    };
    
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
});

// Photo Gallery Management
const photoGallery = {
    // Array to store photo data - easy to add more photos here
    photos: [
        { src: './media/1.jpeg', caption: 'Séance de dressage individuelle' },
        { src: './media/2.jpeg', caption: 'Formation d\'obéissance de base' },
        { src: './media/3.jpeg', caption: 'Équipe professionnelle à l\'œuvre' },
        { src: './media/4.jpeg', caption: '' },
        { src: './media/5.jpg', caption: '' },
        { src: './media/6.jpg', caption: 'Socialisation entre chiens' },
        { src: './media/7.jpg', caption: '' },
        { src: './media/8.jpg', caption: 'Nos installations modernes' },
        { src: './media/9.jpg', caption: 'Chiens en pension - aire de jeu' },
        { src: './media/10.jpeg', caption: '' },
        { src: './media/11.jpg', caption: 'Nos installations modernes' },
        { src: './media/12.jpeg', caption: 'Socialisation entre chiens' },
        { src: './media/13.jpg', caption: 'Séance de dressage individuelle' },
        { src: './media/14.jpg', caption: 'Formation d\'obéissance de base' },
        { src: './media/15.jpeg', caption: 'Formation d\'obéissance de base' },
        { src: './media/16.jpeg', caption: 'Formation d\'obéissance de base' },
        //{ src: './media/17.jpeg', caption: 'Formation d\'obéissance de base' },
        // Add more photos here easily:
        // { src: './media/photo7.jpg', caption: 'Description de la photo' },
    ],
    
    init() {
        this.createPhotoGrid();
        this.setupModal();
    },
    
    createPhotoGrid() {
        const photoGrid = document.getElementById('photoGrid');
        if (!photoGrid) return;
        
        this.photos.forEach((photo, index) => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.innerHTML = `
                <img src="${photo.src}" alt="${photo.caption}" loading="lazy">
                <div class="photo-caption">${photo.caption}</div>
            `;
            
            // Add click event to open modal
            photoItem.addEventListener('click', () => {
                this.openModal(photo.src, photo.caption);
            });
            
            photoGrid.appendChild(photoItem);
        });
    },
    
    setupModal() {
        const modal = document.getElementById('photoModal');
        const modalClose = document.getElementById('modalClose');
        
        // Close modal when clicking close button
        modalClose.addEventListener('click', () => {
            this.closeModal();
        });
        
        // Close modal when clicking outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        // Close modal with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    },
    
    openModal(src, caption) {
        const modal = document.getElementById('photoModal');
        const modalImage = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');
        
        modalImage.src = src;
        modalImage.alt = caption;
        modalCaption.textContent = caption;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    },
    
    closeModal() {
        const modal = document.getElementById('photoModal');
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    },
    
    // Method to easily add new photos programmatically
    addPhoto(src, caption) {
        this.photos.push({ src, caption });
        this.refreshGallery();
    },
    
    refreshGallery() {
        const photoGrid = document.getElementById('photoGrid');
        if (photoGrid) {
            photoGrid.innerHTML = '';
            this.createPhotoGrid();
        }
    }
};

// Form validation and contact functionality
function validatePhoneNumber(phone) {
    const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
    return phoneRegex.test(phone);
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize photo gallery
    photoGallery.init();
    
    // Add hover effects to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero h1');
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
        
        // Start typing effect after a small delay
        setTimeout(typeWriter, 500);
    }
});