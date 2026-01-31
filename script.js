// Data
const products = [
    {
        id: 1,
        name: "Jackfruit",
        category: "Dehydrated",
        desc: "Premium quality naturally dried jackfruit. A pure, preservative-free vegan meat substitute perfect for curries.",
        image: "images/jackfruit.png"
    },
    {
        id: 2,
        name: "Tropic Mix",
        category: "Snacks",
        desc: "An exotic blend of dehydrated tropical fruits. A perfect nutritious snack for energy on the go.",
        image: "images/jackfruit.png"
    },
    {
        id: 3,
        name: "Kurakkan Flour",
        category: "Grains",
        desc: "100% pure finger millet flour. Rich in fiber and minerals, ideal for Rotti, Pittu, and healthy baking.",
        image: "images/kurakkan.png"
    },
    {
        id: 4,
        name: "Ceylon Tea",
        category: "Estate",
        desc: "Hand-picked tea leaves from the misty hills of Sri Lanka. Experience the true aroma of Ceylon tea.",
        image: "images/tea.png"
    },
    {
        id: 5,
        name: "Rulan Aluwa",
        category: "Sweets",
        desc: "Authentic Sri Lankan semolina sweets made with ghee and cashews. A festive delight for special occasions.",
        image: "images/sweets.png"
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    injectProducts();
    initAnimations();
    initMenu();
});

// 1. Smooth Scroll
function initLenis() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        direction: 'vertical',
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    // Update Scroll Progress Bar
    lenis.on('scroll', ({ progress }) => {
        const bar = document.querySelector('.bar');
        if (bar) bar.style.height = `${progress * 100}%`;
    });

    requestAnimationFrame(raf);
}

// 2. Inject Products (Sticky Stack Structure)
function injectProducts() {
    const container = document.getElementById('product-stack');
    const phoneNumber = "94771234567";
    const alignments = ['align-left', 'align-center', 'align-right'];

    products.forEach((product, index) => {
        const alignClass = alignments[index % alignments.length]; // Cycle alignments
        const section = document.createElement('section');
        section.className = `product-section ${alignClass}`;

        // Quote Message
        const message = encodeURIComponent(`Hi, I'm interested in ordering ${product.name}.`);
        const link = `https://wa.me/${phoneNumber}?text=${message}`;

        section.innerHTML = `
            <div class="product-bg">
                <img src="${product.image}" alt="${product.name}" class="parallax-img">
            </div>
            <div class="product-card">
                <span class="p-number">0${index + 1}</span>
                <span class="p-cat">${product.category}</span>
                <h2>${product.name}</h2>
                <p class="p-desc">${product.desc}</p>
                <a href="${link}" class="btn-whatsapp-full" target="_blank">
                    Request Quote <i class="ph ph-whatsapp-logo"></i>
                </a>
            </div>
        `;

        container.appendChild(section);
    });
}

// 3. Animations & Parallax
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Parallax
    gsap.to('.hero-bg img', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Product Section Animations
    const sections = document.querySelectorAll('.product-section');
    sections.forEach((section) => {

        // Image Parallax (Background moves slower)
        const bgImg = section.querySelector('.parallax-img');
        gsap.fromTo(bgImg,
            { yPercent: -10, scale: 1.1 },
            {
                yPercent: 10,
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );

        // Content Card Reveal (Slide up + Fade)
        const card = section.querySelector('.product-card');
        gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 60%", // Trigger when section is 60% up viewport
                toggleActions: "play none none reverse"
            }
        });
    });
}

// 4. Menu Logic
function initMenu() {
    const trigger = document.querySelector('.menu-trigger');
    const close = document.querySelector('.menu-close');
    const overlay = document.querySelector('.menu-overlay');

    function toggle() {
        overlay.classList.toggle('active');
    }

    trigger.addEventListener('click', toggle);
    close.addEventListener('click', toggle);

    // Close menu when clicking a link
    overlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', toggle);
    });
}
