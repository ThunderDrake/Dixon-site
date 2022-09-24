import Swiper, { Pagination } from 'swiper';

function initHeroSlider() {
  const heroSlider = document.querySelector('.hero-slider')
  Swiper.use([Pagination]);
  const swiper = new Swiper(heroSlider, {
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
  });
}

export {initHeroSlider};
