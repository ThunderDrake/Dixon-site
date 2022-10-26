import Swiper, { Navigation, Thumbs } from 'swiper';

function initProductSlider() {
  const bigSliderEl = document.querySelector('.product__slider-big');
  const thumbSliderEl = document.querySelector('.product__slider-nav');
  Swiper.use([Navigation, Thumbs]);
  const thumbSlider = new Swiper(thumbSliderEl, {
    slidesPerView: 4,
    watchSlidesProgress: true,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 3,
      },
      800: {
        slidesPerView: 4,
      }
    }
  });
  const mainSlider = new Swiper(bigSliderEl, {
    slidesPerView: 1,
    thumbs: {
      swiper: thumbSlider
    }
  });
}

export {initProductSlider};
