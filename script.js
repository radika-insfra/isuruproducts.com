// Data
const products = [
    {
        id: 1,
        name: "Dehydrated Jackfruit",
        category: "Dehydrated Food",
        desc: "Premium quality naturally dried jackfruit. A pure, preservative-free vegan meat substitute perfect for curries.",
        image: "images/jackfruit.png"
    },
    {
        id: 2,
        name: "Golden Tropic Mix",
        category: "Value Added",
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
        name: "Premium Ceylon Tea",
        category: "Beverages",
        desc: "Hand-picked tea leaves from the misty hills of Sri Lanka. Experience the true aroma of Ceylon tea.",
        image: "images/tea.png"
    },
    {
        id: 5,
        name: "Traditional Sweets",
        category: "Confectionery",
        desc: "Authentic Sri Lankan semolina sweets made with ghee and cashews. A festive delight for special occasions.",
        image: "images/sweets.png"
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    loadProducts();
    initAnimations();
    initMobileMenu();
});

// 1. Smooth Scroll (Lenis)
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

    requestAnimationFrame(raf);
}

// 2. Load Products (Alternating Layout)
function loadProducts() {
    const feed = document.getElementById('product-feed');
    const phoneNumber = "94771234567";

    products.forEach((product, index) => {
        const isReverse = index % 2 !== 0; // Alternate every other item
        const row = document.createElement('div');
        row.className = `product-row ${isReverse ? 'reverse' : ''}`;

        // Detailed Inquiry Message
        const message = encodeURIComponent(`Hello Isuru Products, I would like to inquire about placing an order for: ${product.name}. Please provide details on pricing and availability.`);
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

        row.innerHTML = `
            <div class="product-visual">
                <img src="${product.image}" alt="${product.name}" class="reveal-img">
            </div>
            <div class="product-content">
                <span class="p-cat">${product.category}</span>
                <h3 class="p-title">${product.name}</h3>
                <p class="p-desc">${product.desc}</p>
                <a href="${whatsappLink}" class="btn-whatsapp" target="_blank">
                    Request Quote <i class="ph ph-arrow-right"></i>
                </a>
            </div>
        `;

        feed.appendChild(row);
    });
}

// 3. Animations (GSAP)
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Reveal
    const tl = gsap.timeline();

    tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
    })
        .from('.hero-meta', {
            opacity: 0,
            y: 20,
            duration: 1
        }, "-=1")
        .from('.hero-image-reveal img', {
            scale: 1.2,
            duration: 2,
            ease: "power2.out"
        }, "-=1.5");

    // Product Reveals
    gsap.utils.toArray('.product-row').forEach(row => {
        gsap.from(row.querySelector('.product-visual'), {
            scrollTrigger: {
                trigger: row,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(row.querySelector('.product-content'), {
            scrollTrigger: {
                trigger: row,
                start: "top 70%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.2, // Stagger text slightly after image
            ease: "power3.out"
        });
    });
}

// 4. Mobile Menu
function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const close = document.querySelector('.close-btn');
    const menu = document.querySelector('.mobile-menu');
    const links = document.querySelectorAll('.mobile-links a');

    function toggle() {
        menu.classList.toggle('active');
    }

    btn.addEventListener('click', toggle);
    close.addEventListener('click', toggle);
    links.forEach(l => l.addEventListener('click', toggle));
}
