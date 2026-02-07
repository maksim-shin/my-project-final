import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

import '../scss/style.scss';
import 'swiper/css';
import 'swiper/css/pagination';

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
   SWIPER
========================= */

const toggleBtn = document.getElementById('toggleBtn');
const wrapper = document.querySelector('.swiper-wrapper');

let swiperInstance = null;

function initSwiper() {
  const swiperEl = document.querySelector('.swiper');

  if (!swiperEl || swiperInstance) return;

  swiperInstance = new Swiper(swiperEl, {
    modules: [Pagination],
    slidesPerView: 'auto',
    spaceBetween: 16,
    centeredSlides: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  console.log('Swiper INIT');
}

function destroySwiper() {
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
    console.log('Swiper DESTROY');
  }
}

function updateLayout() {
  if (window.innerWidth < 768) {
    initSwiper();
  } else {
    destroySwiper();
  }
}

/* =========================
   TOGGLE BUTTON
========================= */

if (toggleBtn && wrapper) {
  toggleBtn.addEventListener('click', () => {
    wrapper.classList.toggle('is-open');

    toggleBtn.innerHTML = wrapper.classList.contains('is-open')
      ? '<img src="./brands_logo/expand.svg" alt="">Скрыть'
      : '<img src="./brands_logo/expand.svg" alt="">Показать все';
  });
}