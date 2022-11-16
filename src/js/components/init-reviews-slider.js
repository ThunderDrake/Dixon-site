import Swiper, { Pagination } from 'swiper';

function initReviewsSlider() {
  const reviewSlider = document.querySelector('.reviews__slider')
  if (!reviewSlider) {
    return;
  }
  Swiper.use([Pagination]);
  const swiper = new Swiper(reviewSlider, {
    slidesPerView: 3,
    loop: true,
    spaceBetween: 40,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      // when window width is >= 640px
      800: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    }
  });
}

export {initReviewsSlider};
