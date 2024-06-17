(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function initSliders() {
        if (document.querySelector(".swiper")) new Swiper(".swiper", {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            effect: "fade",
            pagination: {
                el: ".hero-pagination",
                clickable: true,
                renderBullet: function(index, className) {
                    return '<span class="' + className + '">' + "0" + (index + 1) + "</span>";
                }
            },
            on: {}
        });
    }
    window.addEventListener("load", (function(e) {
        initSliders();
    }));
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function bindModal(triggerSelector, modalSelector, closeSelector, allModals) {
        const trigger = document.querySelector(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        if (!trigger || !modal || !close) {
            console.error("One or more elements not found:", {
                triggerSelector,
                modalSelector,
                closeSelector
            });
            return;
        }
        const body = document.body;
        trigger.addEventListener("click", (e => {
            e.preventDefault();
            allModals.forEach((m => {
                const otherModal = document.querySelector(m.modal);
                if (otherModal) {
                    otherModal.style.visibility = "hidden";
                    otherModal.style.opacity = "0";
                }
                body.classList.remove("locked");
            }));
            modal.style.visibility = "visible";
            modal.style.opacity = "1";
            body.classList.add("locked");
        }));
        close.addEventListener("click", (() => {
            modal.style.visibility = "hidden";
            modal.style.opacity = "0";
            body.classList.remove("locked");
        }));
        modal.addEventListener("click", (e => {
            if (e.target === modal) {
                modal.style.visibility = "hidden";
                modal.style.opacity = "0";
                body.classList.remove("locked");
            }
        }));
    }
    const allModals = [ {
        trigger: ".btn-search-modal",
        modal: ".search-modal",
        close: ".search-modal-close"
    }, {
        trigger: ".btn-login-modal",
        modal: ".login-modal",
        close: ".login-modal-close"
    }, {
        trigger: ".btn-reset-modal",
        modal: ".reset-pass-modal",
        close: ".reset-pass__modal-close"
    } ];
    allModals.forEach((m => {
        bindModal(m.trigger, m.modal, m.close, allModals);
    }));
    function script_tabs(headerSelector, tabSelector, contentSelector, activeClass, display = "flex") {
        const header = document.querySelector(headerSelector), tab = document.querySelectorAll(tabSelector), content = document.querySelectorAll(contentSelector);
        function hideTabContent() {
            content.forEach((item => {
                item.style.display = "none";
            }));
            tab.forEach((item => {
                item.classList.remove(activeClass);
            }));
        }
        function showTabContent(i = 0) {
            content[i].style.display = display;
            tab[i].classList.add(activeClass);
        }
        hideTabContent();
        showTabContent();
        header.addEventListener("click", (e => {
            const target = e.target;
            if (target.classList.contains(tabSelector.replace(/\./, "")) || target.parentNode.classList.contains(tabSelector.replace(/\./, ""))) tab.forEach(((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            }));
        }));
    }
    script_tabs(".products__header", ".products__header-item", ".products__content-item", "active");
    script_tabs(".tabs__header", ".tabs__header-item", ".tabs__content-item", "active");
    window["FLS"] = false;
    isWebp();
    menuInit();
})();