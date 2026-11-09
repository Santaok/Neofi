import { initEmailJS, setupFormHandler,  } from './email.js';
import { 
    getCryptoPrice, 
    getTopCryptos, 
    connectWallet,
    formatPrice,
    formatPriceChange
} from './api.js';


initEmailJS();
setupFormHandler();



document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Инициализация NeoFI с API');


    const topCryptos = await getTopCryptos(5);
    console.log('🏆 Топ криптовалют:', topCryptos);

    const container = document.getElementById('cryptoPrices');
    if (container) {
        container.innerHTML = topCryptos.map(coin => `
            <div class="crypto-card">
                <img src="${coin.image}" alt="${coin.name}" width="32" />
                <span class="crypto-name">${coin.name}</span>
                <span class="crypto-price">${formatPrice(coin.price)}</span>
                <span class="crypto-change ${coin.change24h >= 0 ? 'green' : 'red'}">
                    ${formatPriceChange(coin.change24h)}
                </span>
            </div>
        `).join('');
    }

    const walletBtn = document.getElementById('connectWallet');
    if (walletBtn) {
        walletBtn.addEventListener('click', async function() {
            const wallet = await connectWallet();
            if (wallet) {
                console.log('✅ Кошелёк подключён:', wallet.address);
                this.textContent = `Подключён: ${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`;
                const balance = await getWalletBalance(wallet.address);
                if (balance !== null) {
                    console.log(`💰 Баланс: ${balance.toFixed(4)} BNB`);
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
const items = document.querySelectorAll('.faq_cards_item')

items.forEach(item => {
 item.addEventListener('click', function () {
 const parent = this.parentElement
 const allItems = parent.querySelectorAll('.faq_cards_item')


 allItems.forEach(otherItem => {
  if (otherItem !== this) {
  otherItem.classList.remove('active')
       const answer = otherItem.nextElementSibling
           if (answer && answer.classList.contains('faq_cards_answer')) {
                 answer.style.maxHeight = '0'
}
}
})


 this.classList.toggle('active')
 const answer = this.nextElementSibling
    if (answer && answer.classList.contains('faq_cards_answer')) {
    if (this.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px'
       } else {
            answer.style.maxHeight = '0'
        }
    }
  })
 })
})


document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.header_link_nav_items')
    const burgerBtn = document.querySelector('.burger_btn')
    const headerNav = document.querySelector('.header_nav')

    // Burger menu toggle
    if (burgerBtn && headerNav) {
        burgerBtn.addEventListener('click', function() {
            const isOpen = headerNav.classList.toggle('menu-open')
            burgerBtn.classList.toggle('active', isOpen)
            burgerBtn.setAttribute('aria-expanded', isOpen)
        })
    }

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault()

            // Close mobile menu after clicking a link
            if (headerNav && headerNav.classList.contains('menu-open')) {
                headerNav.classList.remove('menu-open')
                if (burgerBtn) {
                    burgerBtn.classList.remove('active')
                    burgerBtn.setAttribute('aria-expanded', 'false')
                }
            }

            const targetId = this.getAttribute('href')
            const targetSection = document.querySelector(targetId)

            if (targetSection) {
                const offset = 5
                const rect = targetSection.getBoundingClientRect()
                const targetPosition = window.pageYOffset + rect.top - offset

                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                })
            }
        })
    })

    // Close menu when clicking Contact Us / Try For Free in mobile menu
    document.querySelectorAll('.header_btn_nav_contact, .header_btn_nav_try').forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (headerNav && headerNav.classList.contains('menu-open')) {
                headerNav.classList.remove('menu-open')
                if (burgerBtn) {
                    burgerBtn.classList.remove('active')
                    burgerBtn.setAttribute('aria-expanded', 'false')
                }
            }
        })
    })

    // Close menu on outside click
    document.addEventListener('click', function(event) {
        if (!headerNav || !headerNav.classList.contains('menu-open')) return
        if (!headerNav.contains(event.target)) {
            headerNav.classList.remove('menu-open')
            if (burgerBtn) {
                burgerBtn.classList.remove('active')
                burgerBtn.setAttribute('aria-expanded', 'false')
            }
        }
    })

    // Close menu on Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && headerNav && headerNav.classList.contains('menu-open')) {
            headerNav.classList.remove('menu-open')
            if (burgerBtn) {
                burgerBtn.classList.remove('active')
                burgerBtn.setAttribute('aria-expanded', 'false')
            }
        }
    })
})




document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('.testimonial-row-top, .testimonial-row-bottom');
    
    rows.forEach(row => {
        const cards = row.querySelectorAll('.testimonial-card');
        const totalWidth = cards.length * (320 + 24); // ширина карточки + gap
        
        // Дублируем карточки для создания эффекта бесконечности
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            row.appendChild(clone);
        });
    });
});

