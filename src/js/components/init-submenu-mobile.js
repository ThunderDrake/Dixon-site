const initSubmenuMobile = () => {
  const submenuMobileContainer = document.querySelector('.submenu-mobile-container');
  const submenuMobile = document.querySelector('.submenu-mobile');
  const subscribeBlock = document.querySelector('.subscribe');
  const breakpoint = window.matchMedia('(min-width: 768px)');

  // если на странице нет подменю или вьюпорт больше 767, прерываем программу
  if (!submenuMobile || breakpoint.matches) {
    return;
  }

  // подменю появляется после блока-контейнера и скрывается перед блоком подписки
  window.addEventListener('scroll', function () {
    if (submenuMobileContainer.getBoundingClientRect().top > 0 || subscribeBlock.getBoundingClientRect().top < window.innerHeight) {
      submenuMobile.classList.remove('is-visible');
    } else {
      submenuMobile.classList.add('is-visible');
    }
  });

  // пункты переключаются в зависимости от блока
  window.addEventListener('scroll', function () {
    const linkElements = submenuMobile.querySelectorAll('[data-navigation-link]');
    const buttonTextBlock = submenuMobile.querySelector('.custom-select__text');

    linkElements.forEach((link) => {
      const currentBlockElement = document.querySelector(`${link.getAttribute('href')}`);
      const position = currentBlockElement.getBoundingClientRect();

      if (!currentBlockElement) {
        return;
      }

      if (position.top >= 0 && position.bottom <= window.innerHeight ||
          position.top < window.innerHeight && position.bottom >= 0) {
        buttonTextBlock.innerText = link.innerHTML;
      }
    });
  });
};

export {initSubmenuMobile};
