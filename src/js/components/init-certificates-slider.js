import Swiper, { Pagination, Navigation } from 'swiper';

function initCertificatesSlider() {
  const certificatesSlider = document.querySelector('.certificates__slider')
  if (!certificatesSlider) {
    return;
  }
  Swiper.use([Pagination, Navigation]);
  const swiper = new Swiper(certificatesSlider, {
    slidesPerView: 4,
    loop: true,
    spaceBetween: 14,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.certificates__button-next',
      prevEl: '.certificates__button-prev',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 14
      },
      // when window width is >= 640px
      800: {
        slidesPerView: 4,
        spaceBetween: 14
      }
    }
  });
}

export {initCertificatesSlider};
