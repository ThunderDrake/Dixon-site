import Swiper, { Pagination, Autoplay } from 'swiper';

function initHeroSlider() {
  const heroSlider = document.querySelector('.hero-slider')
  Swiper.use([Pagination, Autoplay]);
  const swiper = new Swiper(heroSlider, {
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    autoplay: {
      delay: 5000
    }
  });
}

export {initHeroSlider};
