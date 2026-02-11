

import '../scss/style.scss';

/* =========================
   BURGER MENU
========================= */

const burgerButtons = document.querySelectorAll('.button-js');
const menu = document.querySelector('.modal__navigation');
const overlay = document.querySelector('.overlay');

burgerButtons.forEach(button => {
  button.addEventListener('click', () => {
    menu.classList.toggle('modal__navigation--open');
    overlay.classList.toggle('overlay--active');
  });
});

if (overlay) {
  overlay.addEventListener('click', () => {
    menu.classList.remove('modal__navigation--open');
    overlay.classList.remove('overlay--active');
  });
}

/* =========================
   SWIPERS
========================= */

const swipers = {};

function initSwiper(id) {
  const container = document.getElementById(id);
  if (!container || swipers[id]) return;

  swipers[id] = new Swiper(`#${id}`, {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 16,
    pagination: {
      el: `#${id} ~ .swiper-pagination`,
      clickable: true,
    },
  });
}

function destroySwiper(id) {
  if (swipers[id] && typeof swipers[id].destroy === 'function') {
    swipers[id].destroy(true, true);
    swipers[id] = null;
  }
}

function handleSwipers() {
  const screenMobile = window.innerWidth < 768;

  ['brands', 'equipment'].forEach(id => {
    const wrapper = document.getElementById(id);
    if (!wrapper) return;

    if (screenMobile) {
      initSwiper(id);
      const btn = document.querySelector(`.toggle--btn[data-target="${id}"]`);
      if (btn) btn.style.display = 'none';
      wrapper.classList.remove('is-open');
    } else {
      destroySwiper(id);
      const btn = document.querySelector(`.toggle--btn[data-target="${id}"]`);
      if (btn) btn.style.display = wrapper.scrollHeight > wrapper.clientHeight ? 'flex' : 'none';
    }
  });
}

// Инициализация при загрузке страницы
handleSwipers();

// Пересчёт при ресайзе
window.addEventListener('resize', handleSwipers);

/* =========================
   TOGGLE BUTTON
========================= */
const toggleButtons = document.querySelectorAll('.toggle--btn');

toggleButtons.forEach(button => {
  const targetId = button.dataset.target; // ID блока
  const wrapper = document.getElementById(targetId); 
  const span = button.querySelector('span'); // текст кнопки
  const textShow = button.dataset.textShow;   // текст при закрытом состоянии
  const textHide = button.dataset.textHide;   // текст при открытом состоянии

  if (!wrapper) return; // защита от ошибки

  button.addEventListener('click', () => {
    wrapper.classList.toggle('is-open');

    if (wrapper.classList.contains('is-open')) {
      span.textContent = textHide;
    } else {
      span.textContent = textShow;
    }

  });
});

document.addEventListener('DOMContentLoaded', () => {
  const toggleButtons = document.querySelectorAll('.toggle--btn');

  toggleButtons.forEach(button => {
    const targetId = button.dataset.target;
    if (!targetId) return;

    const wrapper = document.getElementById(targetId);
    if (!wrapper) return;

    const fullText = wrapper.querySelector('.services__text-full');
    const span = button.querySelector('span');
    if (!fullText || !span) return;

    button.addEventListener('click', () => {
      fullText.classList.toggle('is-open');

      span.textContent = fullText.classList.contains('is-open')
        ? button.dataset.textHide
        : button.dataset.textShow;
    });
  });
});


