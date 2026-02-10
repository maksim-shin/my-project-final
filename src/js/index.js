
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
   SWIPER
========================= */
const toggleBtn = document.getElementById('toggleBtn');
const wrapper = document.querySelector('.swiper-wrapper');
let swiperInstance = null;

function initSwiper() {
  if (!swiperInstance && window.Swiper) {
    swiperInstance = new window.Swiper('.swiper', {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 16,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
}

function destroySwiper() {
  if (swiperInstance && typeof swiperInstance.destroy === 'function') {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
}

if (window.innerWidth < 768) {
  initSwiper();
  toggleBtn.style.display = 'none';
  wrapper.classList.remove('is-open');
} else {
  destroySwiper();
  toggleBtn.style.display = wrapper.scrollHeight > wrapper.clientHeight ? 'flex' : 'none';
}

window.addEventListener('resize', () => {
  if (window.innerWidth < 768) {
    initSwiper();
    toggleBtn.style.display = 'none';
    wrapper.classList.remove('is-open');
  } else {
    destroySwiper();
    toggleBtn.style.display = wrapper.scrollHeight > wrapper.clientHeight ? 'flex' : 'none';
  }
});

toggleBtn.addEventListener('click', () => {
  const label = toggleBtn.querySelector('span');

  if (!label) {
    // Если span нет, обернём текст
    toggleBtn.innerHTML = '<img src="./brands_logo/expand.svg" alt=""><span>Показать все</span>';
  }

  const span = toggleBtn.querySelector('span');

  if (wrapper.classList.contains('is-open')) {
    wrapper.classList.remove('is-open');
    span.textContent = 'Показать все';
  } else {
    wrapper.classList.add('is-open');
    span.textContent = 'Скрыть';
  }
});