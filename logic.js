// --- BACKEND DATABASE ---
const BACKEND_DB = {
    products: [
        {
            id: "P001",
            name: "Vedolact Gold",
            category: "Lactation",
            desc: "The premium herbal galactagogue. Increases milk fat and yield safely.",
            image: "fa-cow",
            tags: ["High Yield", "Post-Calving"]
        },
        {
            id: "P002",
            name: "Hepa-Veda Pro",
            category: "Liver Health",
            desc: "Restores appetite and hepatic function in 5 days using Bhringraj & Kalmegh.",
            image: "fa-leaf",
            tags: ["Digestion", "Appetite"]
        },
        {
            id: "P003",
            name: "Camel-Shield X",
            category: "Export Special",
            desc: "Formulated for desert climates to boost immunity in Camels.",
            image: "fa-shield-heart",
            tags: ["Middle East", "Immunity"]
        }
    ],
    ai_logic: {
        keywords: {
            "milk": "For milk issues, <strong>Vedolact Gold</strong> is our gold-standard solution. It naturally boosts hormone levels.",
            "liver": "Liver issues cause production loss. <strong>Hepa-Veda Pro</strong> is designed to regenerate liver cells rapidly.",
            "camel": "For our Middle East partners, we recommend <strong>Camel-Shield X</strong>. Shall I open the export price list?",
            "price": "Please click the 'Partner Access' button in the menu for our wholesale/export price list.",
        },
        default: "I am Veda, your Ayurvedic Veterinary Consultant. I can assist with symptoms or formulations. What do you need?"
    }
};

// --- SYSTEM INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initRegionDetector();
    loadProducts();
    
    // Smooth Animations
    gsap.from("nav", { y: -100, duration: 1, ease: "power4.out" });
    gsap.from("h1", { opacity: 0, y: 30, duration: 1.5, delay: 0.3 });
});

// --- 1. INTELLIGENT REGION DETECTOR ---
function initRegionDetector() {
    const badge = document.getElementById('region-badge');
    
    setTimeout(() => {
        // Mock Detection
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let regionName = "Global HQ";
        
        if(userTimeZone.includes("Asia")) regionName = "India / Asia Node";
        if(userTimeZone.includes("Dubai")) regionName = "Middle East Node";
        if(userTimeZone.includes("America")) regionName = "Americas Node";

        badge.innerHTML = `<i class="fa-solid fa-location-dot"></i> Connected: ${regionName}`;
        addBotMessage(`System active. Connected to ${regionName}.`);
    }, 1500);
}

// --- 2. DYNAMIC PRODUCT LOADER ---
function loadProducts() {
    const grid = document.getElementById('product-grid');
    
    BACKEND_DB.products.forEach(product => {
        const card = document.createElement('div');
        // Note the updated classes for Green/Gold theme
        card.className = 'glass-card p-8 rounded-sm relative overflow-hidden group';
        card.innerHTML = `
            <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition text-6xl text-royalGold">
                <i class="fa-solid ${product.image}"></i>
            </div>
            <div class="text-royalGold text-xs font-bold uppercase tracking-widest mb-3 border-b border-royalGold/20 pb-2 inline-block">${product.category}</div>
            <h3 class="text-2xl font-serif text-white font-bold mb-4">${product.name}</h3>
            <p class="text-gray-400 mb-6 text-sm leading-relaxed">${product.desc}</p>
            <div class="flex gap-2 mb-6">
                ${product.tags.map(tag => `<span class="bg-matteGreen px-3 py-1 text-[10px] border border-royalGold/30 text-paleGold uppercase tracking-wider">${tag}</span>`).join('')}
            </div>
            <button class="w-full py-3 bg-transparent border border-royalGold text-royalGold font-bold hover:bg-royalGold hover:text-matteGreen transition uppercase text-xs tracking-widest">
                Technical Data
            </button>
        `;
        grid.appendChild(card);
    });
}

// --- 3. CHATBOT LOGIC ---
let isChatOpen = false;

function toggleChat() {
    const bot = document.getElementById('veda-bot');
    const trigger = document.getElementById('chat-trigger');
    
    isChatOpen = !isChatOpen;
    
    if (isChatOpen) {
        bot.classList.remove('hidden');
        setTimeout(() => {
            bot.classList.remove('translate-y-10', 'opacity-0');
        }, 10);
        trigger.classList.add('scale-0');
    } else {
        bot.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => {
            bot.classList.add('hidden');
        }, 500);
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

    // Add User Message
    const chatBox = document.getElementById('chat-messages');
    chatBox.innerHTML += `<div class="msg-user">${msgText}</div>`;
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulate Thinking
    const typingId = 'typing-' + Date.now();
    chatBox.innerHTML += `<div id="${typingId}" class="msg-bot text-xs italic opacity-50">Processing with Ayurvedic DB...</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    // Process Response
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
