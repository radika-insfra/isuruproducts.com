// Data
const products = [
    {
        id: 1,
        name: "Dehydrated Jackfruit",
        category: "Dehydrated Food",
        image: "images/jackfruit.png"
    },
    {
        id: 2,
        name: "Golden Tropic Mix",
        category: "Value Added",
        image: "images/jackfruit.png"
    },
    {
        id: 3,
        name: "Kurakkan Flour",
        category: "Healthy Grains",
        image: "images/kurakkan.png"
    },
    {
        id: 4,
        name: "Premium Ceylon Tea",
        category: "Beverages",
        image: "images/tea.png"
    },
    {
        id: 5,
        name: "Traditional Sweets",
        category: "Sweets",
        image: "images/sweets.png"
    },
    {
        id: 6,
        name: "Thala Guli",
        category: "Sweets",
        image: "images/sweets.png"
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    loadProducts();
    initAnimations();
    initCursor();
    initMenu();
});

// Smooth Scroll (Lenis)
let lenis;
function initLenis() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        direction: 'vertical',
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

// Animations (GSAP)
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Reveal
    const heroText = new SplitType('.split-text', { types: 'lines, words' });

    const tl = gsap.timeline();
    tl.from(heroText.words, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.2
    })
        .from('.hero-label', {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power2.out"
        }, "-=1")
        .from('.hero-desc', {
            opacity: 0,
            x: -20,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8");

    // Parallax Hero Image
    gsap.to('.hero-img', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Intro Text Animation
    const introText = document.querySelectorAll('.intro-text p');
    gsap.from(introText, {
        scrollTrigger: {
            trigger: '.intro-text',
            start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });

    // Product Stagger
    gsap.utils.toArray('.product-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
            },
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    });
}

// Custom Cursor
function initCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Animate dot immediately
        dot.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;

        // Animate outline with delay
        outline.animate({
            transform: `translate(${posX}px, ${posY}px) translate(-50%, -50%)`
        }, { duration: 500, fill: 'forwards' });
    });

    // Hover effects
    document.querySelectorAll('a, .menu-trigger, .product-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.style.width = '60px';
            outline.style.height = '60px';
            outline.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
            outline.style.borderColor = 'transparent';
        });

        el.addEventListener('mouseleave', () => {
            outline.style.width = '40px';
            outline.style.height = '40px';
            outline.style.backgroundColor = 'transparent';
            outline.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
    });
}

// Menu Logic
function initMenu() {
    const trigger = document.querySelector('.menu-trigger');
    const closeBtn = document.querySelector('.menu-close');
    const overlay = document.querySelector('.menu-overlay');
    const links = document.querySelectorAll('.main-menu a');

    function toggleMenu() {
        const isActive = overlay.classList.contains('active');

        if (!isActive) {
            overlay.classList.add('active');
            lenis.stop(); // Stop scrolling
        } else {
            overlay.classList.remove('active');
            lenis.start(); // Resume scrolling
        }
    }

    trigger.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });
}

// Load Products
function loadProducts() {
    const grid = document.getElementById('product-grid');
    const phoneNumber = "94771234567";

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const message = encodeURIComponent(`I'm interested in the ${product.name}.`);
        const link = `https://wa.me/${phoneNumber}?text=${message}`;

        card.innerHTML = `
            <a href="${link}" target="_blank">
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                </div>
                <div class="product-meta">
                    <div class="meta-left">
                        <span class="p-cat">${product.category}</span>
                        <h3 class="p-title">${product.name}</h3>
                    </div>
                    <div class="p-btn"><i class="ph ph-arrow-up-right"></i></div>
                </div>
            </a>
        `;

        grid.appendChild(card);
    });
}
