import { initEmailJS, setupFormHandler,  } from './email.js';

// Используем функции напрямую
initEmailJS();
setupFormHandler();

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
    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault()
            
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

