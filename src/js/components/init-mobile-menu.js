const initMobileMenu = () => {
  const body = document.body;
  const header = body.querySelector('.header');
  const btnToggle = document.querySelector('[data-header-toggle]');


  if (btnToggle) {
    btnToggle.addEventListener('click', () => {
      if (!header.classList.contains('is-opened')) {
        opened();
      } else {
        closed();
      }
    });

    const opened = () => {
      if (header.classList.contains('is-search-opened')) {
        header.classList.remove('is-search-opened');
      }
      header.classList.add('is-opened');
      body.classList.add('scroll-lock');
    };

    const closed = () => {
      header.classList.remove('is-opened');
      body.classList.remove('scroll-lock');
    };


    const onPopupEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        header.classList.remove('is-opened');
        if (header.classList.contains('is-opened')) {
          body.style.position = 'fixed';
          body.style.top = '0';
          body.style.left = '0';
          body.style.width = '100%';
        } else {
          body.style.position = 'relative';
        }
      }
    };
    document.addEventListener('keydown', onPopupEscPress);

    window.addEventListener('resize', () => {
      if (document.documentElement.clientWidth > 1023) {
        closed();
      }
    });
  }
};

export {initMobileMenu};

