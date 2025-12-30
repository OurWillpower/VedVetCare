// --- BACKEND DATABASE ---
const BACKEND_DB = {
    products: [
        {
            id: "P001",
            name: "VEDOLACT POWDER",
            category: "Lactation Specialist",
            desc: "Herbal galactagogue for Cows, Camels & Goats. Increases milk yield naturally.",
            image: "fa-bottle-droplet",
            tags: ["10g Pouch", "Twice a Day", "Herbal"]
        },
        {
            id: "P002",
            name: "LIVER TONIC",
            category: "Metabolism",
            desc: "Improves appetite and liver function in all livestock animals.",
            image: "fa-leaf",
            tags: ["Appetite", "Digestion", "Growth"]
        },
        {
            id: "P003",
            name: "CALCIUM SUPPLEMENT",
            category: "Bone & Milk",
            desc: "Essential minerals for high-yielding dairy animals.",
            image: "fa-bone",
            tags: ["Strength", "Milk Fever Prevention"]
        }
    ],
    ai_logic: {
        keywords: {
            "milk": "For milk issues, I recommend <strong>Vedolact Powder</strong>. Dosage: 10g x 2 times a day mixed with feed.",
            "vedolact": "<strong>Vedolact Powder</strong> is our flagship product. It is available in 10g pouches. It helps increase milk yield in lactating mammals.",
            "liver": "For appetite loss, our Herbal Liver Tonic is highly effective.",
            "camel": "We are experts in Camel health. Vedolact is safe and effective for Camels to boost lactation.",
            "dose": "The standard dose for Vedolact is <strong>10g twice a day</strong> for 15 days.",
            "hello": "Welcome to Ved Vet Care. How can I help your animals today?",
        },
        default: "I am Veda. I can help you with Vedolact usage or distributor enquiries."
    }
};

// --- SYSTEM INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    initHeroSlider(); // Start the hero slider
    
    // Smooth Animations
    gsap.from("nav", { y: -100, duration: 1, ease: "power4.out" });
});

// --- HERO SLIDER LOGIC ---
let currentSlide = 1;
const totalSlides = 3;
let slideInterval;

function initHeroSlider() {
    // Auto-rotate every 5 seconds
    slideInterval = setInterval(nextSlide, 5000);
}

function showSlide(slideIndex) {
    // Reset interval if user clicks manually
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);

    // Hide all
    for (let i = 1; i <= totalSlides; i++) {
        document.getElementById(`slide-${i}`).style.opacity = "0";
        document.getElementById(`slide-${i}`).style.zIndex = "0";
    }
    
    // Reset dots
    const dots = document.querySelectorAll('.slide-dot');
    dots.forEach(dot => {
        dot.classList.remove('bg-royalGold', 'ring-2');
        dot.classList.add('bg-white/30');
    });

    // Show current
    const activeSlide = document.getElementById(`slide-${slideIndex}`);
    activeSlide.style.opacity = "1";
    activeSlide.style.zIndex = "10";
    
    // Update active dot
    dots[slideIndex-1].classList.remove('bg-white/30');
    dots[slideIndex-1].classList.add('bg-royalGold', 'ring-2', 'ring-offset-2', 'ring-offset-matteGreen', 'ring-royalGold');
    
    currentSlide = slideIndex;
}

function nextSlide() {
    currentSlide++;
    if (currentSlide > totalSlides) currentSlide = 1;
    showSlide(currentSlide);
}

// --- PRODUCT LOADER ---
function loadProducts() {
    const grid = document.getElementById('product-grid');
    
    BACKEND_DB.products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'glass-card p-8 rounded-lg relative overflow-hidden group';
        card.innerHTML = `
            <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition text-6xl text-royalGold">
                <i class="fa-solid ${product.image}"></i>
            </div>
            <div class="text-royalGold text-xs font-bold uppercase tracking-widest mb-3 border-b border-white/10 pb-2 inline-block">${product.category}</div>
            <h3 class="text-2xl font-serif text-white font-bold mb-4">${product.name}</h3>
            <p class="text-gray-300 mb-6 text-sm leading-relaxed">${product.desc}</p>
            <div class="flex gap-2 mb-6">
                ${product.tags.map(tag => `<span class="bg-matteGreen px-3 py-1 text-[10px] border border-royalGold/30 text-paleGold uppercase tracking-wider shadow-sm rounded-sm">${tag}</span>`).join('')}
            </div>
            <button class="w-full py-3 bg-transparent border border-royalGold/50 text-royalGold font-bold hover:bg-royalGold hover:text-matteGreen transition uppercase text-xs tracking-widest rounded-sm">
                Product Details
            </button>
        `;
        grid.appendChild(card);
    });
}

// --- CHATBOT LOGIC ---
let isChatOpen = false;

function toggleChat() {
    const bot = document.getElementById('veda-bot');
    const trigger = document.getElementById('chat-trigger');
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
        bot.classList.remove('hidden');
        setTimeout(() => bot.classList.remove('translate-y-10', 'opacity-0'), 10);
        trigger.classList.add('scale-0');
    } else {
        bot.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => bot.classList.add('hidden'), 500);
        trigger.classList.remove('scale-0');
    }
}

function handleEnter(e) {
    if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const msgText = input.value.trim();
    if (!msgText) return;

    const chatBox = document.getElementById('chat-messages');
    chatBox.innerHTML += `<div class="msg-user">${msgText}</div>`;
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    const typingId = 'typing-' + Date.now();
    chatBox.innerHTML += `<div id="${typingId}" class="msg-bot text-xs italic opacity-50">Checking Database...</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
        document.getElementById(typingId).remove();
        const response = getAIResponse(msgText);
        addBotMessage(response);
    }, 1000);
}

function getAIResponse(text) {
    text = text.toLowerCase();
    const db = BACKEND_DB.ai_logic.keywords;
    for (const key in db) {
        if (text.includes(key)) return db[key];
    }
    return BACKEND_DB.ai_logic.default;
}

function addBotMessage(html) {
    const chatBox = document.getElementById('chat-messages');
    chatBox.innerHTML += `<div class="msg-bot">${html}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}
