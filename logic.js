// --- BACKEND DATABASE (SIMULATED) ---
const BACKEND_DB = {
    products: [
        {
            id: "P001",
            name: "Vedolact Gold",
            category: "Lactation",
            desc: "Herbal galactagogue for peak milk production.",
            image: "fa-cow",
            tags: ["High Yield", "Post-Calving"]
        },
        {
            id: "P002",
            name: "Hepa-Veda Pro",
            category: "Liver",
            desc: "Advanced hepatic stimulant for metabolism.",
            image: "fa-flask",
            tags: ["Digestion", "Appetite"]
        },
        {
            id: "P003",
            name: "Camel-Immune X",
            category: "Specialty",
            desc: "Specialized formulation for desert livestock.",
            image: "fa-shield-heart",
            tags: ["Camel", "Export Only"]
        }
    ],
    ai_logic: {
        keywords: {
            "milk": "I recommend <strong>Vedolact Gold</strong>. It is clinically proven to increase yield by 15% without hormonal side effects.",
            "liver": "Liver issues require immediate attention. <strong>Hepa-Veda Pro</strong> helps regenerate liver cells within 7 days.",
            "camel": "For Camels, our Middle East formulation <strong>Camel-Immune X</strong> is the standard. Are you interested in bulk export?",
            "price": "As a premium manufacturer, our pricing is volume-based. Please click 'Partner Access' for the distributor price list.",
            "hello": "Greetings. I am Veda. How can I assist your livestock today?",
        },
        default: "I am analyzing that request. Could you specify if this is for Cattle, Camel, or Poultry?"
    }
};

// --- SYSTEM INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initRegionDetector();
    loadProducts();
    
    // GSAP Animations
    gsap.from("nav", { y: -100, duration: 1, ease: "power4.out" });
    gsap.from("h1", { opacity: 0, y: 50, duration: 1.5, delay: 0.5 });
});

// --- 1. INTELLIGENT REGION DETECTOR ---
function initRegionDetector() {
    const badge = document.getElementById('region-badge');
    
    // Simulating Backend IP Detection
    setTimeout(() => {
        // In a real app, this would come from an API
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let regionName = "Global Hub";
        
        if(userTimeZone.includes("Asia")) regionName = "Asia / India";
        if(userTimeZone.includes("Dubai") || userTimeZone.includes("Riyadh")) regionName = "Middle East";
        if(userTimeZone.includes("America")) regionName = "Americas";

        badge.innerHTML = `<i class="fa-solid fa-location-dot"></i> Connected: ${regionName}`;
        
        // Show welcome message in chat based on region
        addBotMessage(`System connected to ${regionName} Node. Ready to assist.`);
    }, 1500);
}

// --- 2. DYNAMIC PRODUCT LOADER ---
function loadProducts() {
    const grid = document.getElementById('product-grid');
    
    BACKEND_DB.products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'glass-card p-8 rounded-2xl relative overflow-hidden group';
        card.innerHTML = `
            <div class="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition text-6xl">
                <i class="fa-solid ${product.image}"></i>
            </div>
            <div class="text-gold text-xs font-bold uppercase tracking-widest mb-2">${product.category}</div>
            <h3 class="text-2xl font-bold mb-4">${product.name}</h3>
            <p class="text-gray-400 mb-6 text-sm">${product.desc}</p>
            <div class="flex gap-2">
                ${product.tags.map(tag => `<span class="bg-white/5 px-3 py-1 rounded-full text-[10px] border border-white/10">${tag}</span>`).join('')}
            </div>
            <button class="mt-6 w-full py-3 bg-white/5 border border-gold/30 rounded-lg text-gold font-bold hover:bg-gold hover:text-black transition uppercase text-xs">
                View Tech Sheet
            </button>
        `;
        grid.appendChild(card);
    });
}

// --- 3. AI CHATBOT ENGINE ---
let isChatOpen = false;

function toggleChat() {
    const bot = document.getElementById('veda-bot');
    const trigger = document.getElementById('chat-trigger');
    
    isChatOpen = !isChatOpen;
    
    if (isChatOpen) {
        bot.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
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

    // 1. Add User Message
    const chatBox = document.getElementById('chat-messages');
    chatBox.innerHTML += `<div class="msg-user">${msgText}</div>`;
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // 2. Simulate AI Thinking
    const typingId = 'typing-' + Date.now();
    chatBox.innerHTML += `<div id="${typingId}" class="msg-bot text-xs animate-pulse">Analyzing...</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    // 3. Process Logic
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
