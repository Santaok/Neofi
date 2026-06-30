// ════════════════════════════════════════════
// 1. НАСТРОЙКИ EMAILJS
// ════════════════════════════════════════════

export const EMAILJS_PUBLIC_KEY = "3jM-CfJ-1bBwNGKR6"
export const EMAILJS_SERVICE_ID = "service_4ibahzi"
export const EMAILJS_TEMPLATE_ID = "template_8xpe6u1"



export function scrollToInput() {
    const input = document.getElementById('userEmail')
    const block = document.getElementById('footerBlock')

    if (!input || !block) {
        console.warn('❌ Элемент не найден')
        return
    }

    input.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
    })

    block.classList.add('pulse');
    block.classList.add('highlight')

    setTimeout(() => {
        block.classList.remove('pulse')
        block.classList.remove('highlight')
    }, 2000);

    setTimeout(() => {
        input.focus()
        input.select()
    }, 600)
}

export function initEmailJS() {
    try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('✅ EmailJS инициализирован из модуля')
        return true
    } catch (error) {
        console.error('❌ Ошибка инициализации EmailJS:', error)
        return false
    }
}

export async function sendSubscriptionEmail(email) {
    console.log('📧 Отправка email:', email);
    console.log('📤 Данные:', {
        title: "Новая подписка на новости",
        name: "Подписчик",
        message: "Пользователь подписался на обновления",
        email: email
    })

    const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID, {
            title: "Инфа",
            name: "Подписчик",
            message: "Пользователь подписался на обновления",
            email: email
        }
    )

    return response
}


export function setupFormHandler() {
    const form = document.getElementById('subscribeForm')
    const emailInput = document.getElementById('userEmail')
    const submitBtn = document.getElementById('submitBtn')
    const statusMsg = document.getElementById('statusMessage')

    if (!form || !emailInput || !submitBtn || !statusMsg) {
        console.error('❌ Не найдены элементы формы!')
        return false
    }

    console.log('✅ Форма найдена, обработчик добавлен')

    form.addEventListener('submit', async function(e) {
        e.preventDefault()
        e.stopPropagation()

        const email = emailInput.value.trim()

        if (!email || !email.includes('@')) {
            showStatus('❌ Введите корректный email', 'error', statusMsg)
            return
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Отправка... <i class="fas fa-spinner fa-spin"></i>'
        showStatus('', '', statusMsg)

        try {
            const response = await sendSubscriptionEmail(email)
            console.log('✅ Письмо отправлено:', response)
            showStatus('✅ Спасибо за подписку! Проверьте вашу почту.', 'success', statusMsg)
            emailInput.value = ''

        } catch (error) {
            console.error('❌ Ошибка отправки:', error)
            console.error('❌ Статус:', error.status)
            console.error('❌ Текст ошибки:', error.text)
            
            let errorMessage = '❌ Не удалось отправить. Попробуйте позже.'
            if (error.text) {
                try {
                    const errorData = JSON.parse(error.text)
                    if (errorData.message) {
                        errorMessage = '❌ ' + errorData.message
                    }
                } catch (e) {
                    errorMessage = '❌ ' + error.text
                }
            }
            showStatus(errorMessage, 'error', statusMsg)
        } finally {
            submitBtn.disabled = false
            submitBtn.innerHTML = 'Subscribe <i class="fas fa-arrow-right"></i>'
        }
    })

    return true
}

function showStatus(message, type, statusMsg) {
    statusMsg.textContent = message
    statusMsg.className = type || ''
}

export default {
    EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    scrollToInput,
    initEmailJS,
    sendSubscriptionEmail,
    setupFormHandler
}