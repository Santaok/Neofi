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