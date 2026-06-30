//   ════════════════════════════════════════════
        // 1. НАСТРОЙКИ EMAILJS
        // ════════════════════════════════════════════

        
        const EMAILJS_PUBLIC_KEY = "3jM-CfJ-1bBwNGKR6"
        const EMAILJS_SERVICE_ID = "service_4ibahzi"
        const EMAILJS_TEMPLATE_ID = "template_8xpe6u1"

        console.log('🔑 Используется Public Key:', EMAILJS_PUBLIC_KEY)
        console.log('📡 Service ID:', EMAILJS_SERVICE_ID)
        console.log('📄 Template ID:', EMAILJS_TEMPLATE_ID)

        // Инициализация EmailJS
        try {
            emailjs.init(EMAILJS_PUBLIC_KEY)
            console.log('✅ EmailJS инициализирован')
        } catch (error) {
            console.error('❌ Ошибка инициализации:', error)
        }

        // ════════════════════════════════════════════
        // 2. ОБРАБОТЧИК ФОРМЫ
        // ════════════════════════════════════════════

        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('subscribeForm')
            const emailInput = document.getElementById('userEmail')
            const submitBtn = document.getElementById('submitBtn')
            const statusMsg = document.getElementById('statusMessage')

            if (!form || !emailInput || !submitBtn || !statusMsg) {
                console.error('❌ Не найдены элементы формы!')
                return
            }

            console.log('✅ Форма найдена')

            form.addEventListener('submit', async function(e) {
                e.preventDefault()
                e.stopPropagation()

                const email = emailInput.value.trim()
                console.log('📧 Email для отправки:', email)

                if (!email || !email.includes('@')) {
                    showStatus('❌ Введите корректный email', 'error')
                    return
                }

                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Отправка... <i class="fas fa-spinner fa-spin"></i>'
                showStatus('', '')

                try {
                    console.log('🔄 Отправка данных в EmailJS...')
                    console.log('📤 Данные:', {
                        title: "Новая подписка на новости",
                        name: "Подписчик",
                        message: "Пользователь подписался на обновления",
                        email: email
                    });
                    
                    const response = await emailjs.send(
                        EMAILJS_SERVICE_ID,
                        EMAILJS_TEMPLATE_ID, {
                            title: "Инфа",
                            name: "Подписчик",
                            message: "Пользователь подписался на обновления",
                            email: email
                        }
                    );

                    console.log('✅ Письмо отправлено:', response);
                    showStatus('✅ Спасибо за подписку! Проверьте вашу почту.', 'success')
                    emailInput.value = ''

                } catch (error) {
                    console.error('❌ Ошибка отправки:', error)
                    console.error('❌ Статус:', error.status)
                    console.error('❌ Текст ошибки:', error.text)
                    
                    let errorMessage = '❌ Не удалось отправить. Попробуйте позже.';
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
                    showStatus(errorMessage, 'error')
                } finally {
                    submitBtn.disabled = false
                    submitBtn.innerHTML = 'Subscribe <i class="fas fa-arrow-right"></i>'
                }
            })

            function showStatus(message, type) {
                statusMsg.textContent = message;
                statusMsg.className = type || ''
            }
        })