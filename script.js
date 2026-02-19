/* --- ORGANIC ENGINE (Natural, Breathable Motion) --- */

const gridContainer = document.getElementById('product-grid');

// Data Source
const products = [
    // Dehydrated Fruits
    { name: "Dehydrated Jackfruit", cat: "Exotic Fruit", img: "images/dehydrated-jackfruit.jpg" },
    { name: "Dehydrated Breadfruit", cat: "Exotic Fruit", img: "images/dehydrated-breadfruit.jpg" },
    { name: "Dried Mango", cat: "Tropical Sweet", img: "images/products/mango.jpg" }, // Fallback to generic if needed, but keeping consistent

    // Spices & Preserves
    { name: "Ceylon Cinnamon", cat: "Premium Spice", img: "images/products/cinnamon.jpg" },
    { name: "Black Pepper", cat: "Premium Spice", img: "images/products/pepper.jpg" },
    { name: "Mango Chutney", cat: "Savory Preserve", img: "images/mango-chutney.png" },

    // Traditional Grains & Sweeteners
    { name: "Kithul Powder", cat: "Natural Sweetener", img: "images/kithul-powder.png" },
    { name: "Kurakkan Flour", cat: "Finger Millet", img: "images/kurakkan-powder.png" },
    { name: "Pure Bee Honey", cat: "Wild Harvest", img: "images/natural-honey.jpg" },

    // Essentials
    { name: "Ceylon Tea", cat: "Highland Orange Pekoe", img: "images/tea.png" },
    { name: "Coconut Oil", cat: "Virgin Cold-Pressed", img: "images/products/coconut-oil.jpg" },
    { name: "Turmeric Powder", cat: "Healing Spice", img: "images/products/turmeric.jpg" }
];

document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    injectProducts();
    initEntrance();
});

// 1. ORGANIC SCROLL (Standard Damping, No Skew)
function initLenis() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// 2. PRODUCT INJECTION
function injectProducts() {
    products.forEach((prod, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="card-image-wrapper mask-soft-stone">
                <img src="${prod.img}" alt="${prod.name}" class="card-img">
            </div>
            <div class="card-meta">
                <h3 class="card-title">${prod.name}</h3>
                <span class="card-cat">${prod.cat}</span>
            </div>
        `;
        gridContainer.appendChild(card);
    });
}

// 3. GENTLE ENTRANCE
function initEntrance() {
    const tl = gsap.timeline();

    tl.from('.hero-label', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.2
    })
        .from('.hero-title span', {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=0.8")
        .from('.btn-organic', {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8");

    // Scroll Reveal for Products
    gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, i) => {
        gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 90%"
            }
        });
    });

    // Philosophy Reveal
    gsap.from('.philo-content > *', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '#philosophy',
            start: "top 80%"
        }
    });

    gsap.from('.philo-image', {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '#philosophy',
            start: "top 80%"
        }
    });

    // Process Steps Reveal
    gsap.from('.step-card', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '#process',
            start: "top 80%"
        }
    });
}
