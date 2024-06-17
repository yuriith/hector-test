// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


// Модальное окно
function bindModal(triggerSelector, modalSelector, closeSelector, allModals) {
    const trigger = document.querySelector(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);

    if (!trigger || !modal || !close) {
        console.error('One or more elements not found:', { triggerSelector, modalSelector, closeSelector });
        return;
    }

    const body = document.body;

    trigger.addEventListener('click', e => {
        e.preventDefault();
        // Close all other modals
        allModals.forEach(m => {
            const otherModal = document.querySelector(m.modal);
            if (otherModal) {
                otherModal.style.visibility = 'hidden';
                otherModal.style.opacity = '0';
            }
            body.classList.remove('locked');
        });
        // Open the current modal
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
        body.classList.add('locked');
    });

    close.addEventListener('click', () => {
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0';
        body.classList.remove('locked');
    });

    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.style.visibility = 'hidden';
            modal.style.opacity = '0';
            body.classList.remove('locked');
        }
    });
}
const allModals = [
    // ПЕРВЫЙ аргумент - класс кнопки, при клике на которую будет открываться модальное окно.
    // ВТОРОЙ аргумент - класс самого модального окна.
    // ТРЕТИЙ аргумент - класс кнопки, при клике на которую будет закрываться модальное окно.
    { trigger: '.btn-search-modal', modal: '.search-modal', close: '.search-modal-close' },
    { trigger: '.btn-login-modal', modal: '.login-modal', close: '.login-modal-close' },
    { trigger: '.btn-reset-modal', modal: '.reset-pass-modal', close: '.reset-pass__modal-close' }
];
allModals.forEach(m => {
    bindModal(m.trigger, m.modal, m.close, allModals);
});



function tabs(headerSelector, tabSelector, contentSelector, activeClass, display='flex') {
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector)
    function hideTabContent() {
        content.forEach(item => {
            item.style.display = 'none'
        });
        tab.forEach(item => {
            item.classList.remove(activeClass)
        });
    }
    function showTabContent(i = 0) {
       content[i].style.display = display
       tab[i].classList.add(activeClass)
    }
    hideTabContent()
    showTabContent()
    header.addEventListener('click', e => {
        const target = e.target
        if (target.classList.contains(tabSelector.replace(/\./, '')) || 
        target.parentNode.classList.contains(tabSelector.replace(/\./, ''))) {
            tab.forEach((item, i) => {
                if ( target == item || target.parentNode == item ) {
                    hideTabContent()
                    showTabContent(i)
                }
            });
        }
    })
}

// ПЕРВЫЙ аргумент - класс всего нашего хедера табов.
// ВТОРОЙ аргумент - класс конкретного элемента, при клике на который будет переключатся таб.
// ТРЕТИЙ аргумент - класс того блока, который будет переключаться.
// ЧЕТВЕРТЫЙ аргумент - класс активности, который будет добавлятся для таба, который сейчас активен.
tabs( '.products__header' ,'.products__header-item', '.products__content-item', 'active')
tabs( '.tabs__header' ,'.tabs__header-item', '.tabs__content-item', 'active')