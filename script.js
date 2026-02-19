// Data
const categories = [
    {
        title: "Dehydrated Fruits",
        desc: "Premium quality naturally dried fruits. No additives, just pure taste.",
        products: [
            {
                id: 1,
                name: "Jackfruit",
                desc: "Premium quality naturally dried jackfruit. A pure, preservative-free vegan meat substitute perfect for curries.",
                image: "images/dehydrated-jackfruit.jpg"
            },
            {
                id: 10,
                name: "Dehydrated Breadfruit",
                desc: "Naturally dried breadfruit slices. A versatile, starchy staple perfect for frying or curries.",
                image: "images/dehydrated-breadfruit.jpg"
            }
        ]
    },
    {
        title: "Tropical Snacks",
        desc: "Exotic blends of dehydrated fruits for energy on the go.",
        products: [
            {
                id: 8,
                name: "Golden Tropic",
                desc: "A delightful mix of preserved tropical fruits in a jar. Taste the sunshine in every bite.",
                image: "images/golden-tropic.png"
            }
        ]
    },
    {
        title: "Grains & Flours",
        desc: "Nutritious grains and flours for healthy traditional cooking.",
        products: [
            {
                id: 4,
                name: "Kurakkan Flour",
                desc: "100% pure finger millet flour. Rich in fiber and minerals, ideal for Rotti, Pittu, and healthy baking.",
                image: "images/kurakkan-powder.png"
            },
            {
                id: 12,
                name: "Kithul Powder",
                desc: "Pure nutritious starch from the Kithul palm. Known for its cooling properties and distinct flavor in traditional desserts.",
                image: "images/kithul-powder.png"
            }
        ]
    },
    {
        title: "Estate Teas",
        desc: "Hand-picked tea leaves from the misty hills of Sri Lanka.",
        products: [
            {
                id: 5,
                name: "Ceylon Tea",
                desc: "Hand-picked tea leaves from the misty hills of Sri Lanka. Experience the true aroma of Ceylon tea.",
                image: "images/tea.png"
            }
        ]
    },
    // {
    //     title: "Traditional Sweets",
    //     desc: "Authentic Sri Lankan festive delights.",
    //     products: [
    //         {
    //             id: 6,
    //             name: "Rulan Aluwa",
    //             desc: "Authentic Sri Lankan semolina sweets made with ghee and cashews. A festive delight for special occasions.",
    //             image: "images/sweets.png"
    //         }
    //     ]
    // },
    {
        title: "Condiments & Jars",
        desc: "Flavorful additions to your meals, preserved with care.",
        products: [
            {
                id: 7,
                name: "Natural Mango Chutney",
                desc: "A perfect blend of sweet and spicy mango chutney, made from fresh mangoes. An ideal accompaniment for any meal.",
                image: "images/mango-chutney.png"
            }
        ]
    },
    {
        title: "Natural Sweeteners",
        desc: "Nature's purest sugar alternatives for a healthier lifestyle.",
        products: [
            {
                id: 9,
                name: "Natural Bee Honey",
                desc: "Pure honey harvested from carefully maintained beehives. A natural sweetener known for its quality and goodness.",
                image: "images/natural-honey.jpg"
            }
        ]
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
    const phoneNumber = "94742514538";
    const alignments = ['align-left', 'align-right'];
    let globalProductIndex = 0; // To keep track of total products for ID/Numbering if needed

    categories.forEach((category) => {
        // 1. Create Category Header Section
        const catSection = document.createElement('section');
        catSection.className = 'category-header product-section align-center';
        catSection.dataset.category = category.title; // For HUD tracking

        catSection.innerHTML = `
             <div class="product-bg" style="background: var(--bg-dark);">
                <div class="luxury-grid"></div>
            </div>
            <div class="category-card">
                <div class="luxury-flourish"></div>
                <span class="cat-label">Collection</span>
                <h2>${category.title}</h2>
                <div class="luxury-separator"></div>
                <p>${category.desc}</p>
            </div>
        `;
        container.appendChild(catSection);

        // 2. iterate through products in this category
        category.products.forEach((product) => {
            const alignClass = alignments[globalProductIndex % alignments.length]; // Cycle alignments
            const section = document.createElement('section');
            section.className = `product-section ${alignClass}`;
            section.dataset.category = category.title; // For HUD tracking

            // Quote Message
            const message = encodeURIComponent(`Hi, I'm interested in ordering ${product.name} from the ${category.title} collection.`);
            const link = `https://wa.me/${phoneNumber}?text=${message}`;

            section.innerHTML = `
                <div class="product-bg">
                    <img src="${product.image}" alt="${product.name}" class="parallax-img">
                </div>
                <div class="product-card">
                    <span class="p-number">0${globalProductIndex + 1}</span>
                    <span class="p-cat">${category.title}</span>
                    <h2>${product.name}</h2>
                    <p class="p-desc">${product.desc}</p>
                    <a href="${link}" class="btn-whatsapp-full" target="_blank">
                        Request Quote <i class="ph ph-whatsapp-logo"></i>
                    </a>
                </div>
            `;

            container.appendChild(section);
            globalProductIndex++;
        });
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

    sections.forEach((section, i) => {
        // 1. Section Pinning (The "Slide Over" effect)
        // We pin each section as it reaches the top, and the next one slides over it.
        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            pin: true,
            pinSpacing: false, // This makes the NEXT section slide OVER the pinned one
            anticipatePin: 1
        });

        // Set z-index so later sections are "above" earlier ones
        gsap.set(section, { zIndex: i + 1 });

        // 2. Image Parallax Restoration
        const bgImg = section.querySelector('.parallax-img');
        if (bgImg) {
            gsap.fromTo(bgImg,
                { yPercent: -15, scale: 1.1 },
                {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }

        // 3. Content Card Reveal & HUD Update
        const card = section.querySelector('.product-card');
        const hudName = document.querySelector('.hud-name');

        ScrollTrigger.create({
            trigger: section,
            start: "top 30%", // Wait until more of the section is visible
            end: "bottom 30%",
            onEnter: () => {
                if (section.dataset.category && hudName.textContent !== section.dataset.category) {
                    gsap.to(hudName, {
                        opacity: 0,
                        y: -10,
                        duration: 0.3,
                        onComplete: () => {
                            hudName.textContent = section.dataset.category;
                            gsap.to(hudName, { opacity: 1, y: 0, duration: 0.3 });
                        }
                    });
                }
            },
            onEnterBack: () => {
                if (section.dataset.category && hudName.textContent !== section.dataset.category) {
                    gsap.to(hudName, {
                        opacity: 0,
                        y: 10,
                        duration: 0.3,
                        onComplete: () => {
                            hudName.textContent = section.dataset.category;
                            gsap.to(hudName, { opacity: 1, y: 0, duration: 0.3 });
                        }
                    });
                }
            }
        });

        if (card) {
            gsap.to(card, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    });

    // Luxury HUD Visibility (Hide in Hero and Footer)
    ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        end: "bottom 30%", // Hide earlier
        onEnterBack: () => gsap.to(".category-hud", { opacity: 0, y: -20, duration: 0.4, ease: "power2.inOut" }),
        onLeave: () => gsap.to(".category-hud", { opacity: 1, y: 0, duration: 0.4, ease: "power2.inOut" })
    });

    const footer = document.querySelector('footer');
    if (footer) {
        ScrollTrigger.create({
            trigger: footer,
            start: "top 95%", // Hide almost immediately when footer enters
            onEnter: () => gsap.to(".category-hud", { opacity: 0, y: -20, duration: 0.4, ease: "power2.inOut" }),
            onLeaveBack: () => gsap.to(".category-hud", { opacity: 1, y: 0, duration: 0.4, ease: "power2.inOut" })
        });
    }

    // Initial State for HUD - Absolutely Hidden
    gsap.set(".category-hud", { opacity: 0, y: -20 });
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
