const products = [
    {
        id: 1,
        name: "Dehydrated Jackfruit",
        category: "Dehydrated Food",
        description: "Premium quality naturally dried jackfruit. A pure, preservative-free vegan meat substitute perfect for curries.",
        image: "images/jackfruit.png"
    },
    {
        id: 2,
        name: "Golden Tropic Mix",
        category: "Value Added",
        description: "An exotic blend of dehydrated tropical fruits. A perfect nutritious snack for energy on the go.",
        image: "images/jackfruit.png" 
    },
    {
        id: 3,
        name: "Kurakkan Flour",
        category: "Healthy Grains",
        description: "100% pure finger millet flour. Rich in fiber and minerals, ideal for Rotti, Pittu, and healthy baking.",
        image: "images/kurakkan.png"
    },
    {
        id: 4,
        name: "Premium Ceylon Tea",
        category: "Beverages",
        description: "Hand-picked tea leaves from the misty hills of Sri Lanka. Experience the true aroma of Ceylon tea.",
        image: "images/tea.png"
    },
    {
        id: 5,
        name: "Traditional Sweets (Rulan)",
        category: "Sweets",
        description: "Authentic Sri Lankan semolina sweets made with ghee and cashews. A festive delight.",
        image: "images/sweets.png"
    },
    {
        id: 6,
        name: "Thala Guli",
        category: "Sweets",
        description: "Sesame balls sweetened with jaggery. A traditional healthy sweet treat.",
        image: "images/sweets.png" 
    }
];

const phoneNumber = "94771234567"; // Replace with actual number

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupScrollEffect();
});

function loadProducts() {
    const grid = document.getElementById('product-grid');
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // WhatsApp Message Construction
        const message = encodeURIComponent(`Hi, I am interested in ${product.name}. Please provide more details about pricing and delivery.`);
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <a href="${whatsappLink}" target="_blank" class="btn btn-primary btn-sm">View Details</a>
                </div>
            </div>
            <div class="product-details">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <a href="${whatsappLink}" target="_blank" class="btn btn-whatsapp">
                    <i class="ph ph-whatsapp-logo"></i> Order on WhatsApp
                </a>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function setupScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}
