const breakpoint = window.matchMedia('(max-width: 800px)');
let activePopup = null;

const documentClickHandler = (evt) => {
  if (!evt.target.closest('[data-popup].active')) {
    if (activePopup) {
      closePopup(activePopup);
    }
  }
};

const closePopup = (popup) => {
  popup.classList.remove('active');
  const inPopup = popup.closest('[data-popup].active');
  if (!inPopup) {
    activePopup = null;
    document.removeEventListener('click', documentClickHandler);
  }
  if (breakpoint.matches && !inPopup) {
    window.scrollLock.enableScrolling();
  }
};

const initPopups = () => {
  const popups = document.querySelectorAll('[data-popup]');

  if (!popups.length) {
    return;
  }

  popups.forEach((popup) => {
    const innerElement = popup.querySelector('.filter-popup');

    popup.addEventListener('closepopup', () => {
      closePopup(popup);
    });

    popup.addEventListener('click', (evt) => {
      if (!evt.target.closest('[data-popup-close]')) {
        return;
      }

      evt.preventDefault();
      evt.stopPropagation();
      closePopup(popup);
    });

    if (innerElement) {
      const innerSelectValues = [...innerElement.querySelectorAll('.filter-popup [data-select] .option-item')];
      const innerInput = innerElement.querySelector('.filter-popup [type="search"]');

      if (innerInput && innerSelectValues.length > 0) {
        innerInput.addEventListener('input', (e) => {
          innerSelectValues.forEach((el) => {
            if (!el.querySelector('span').textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
              el.classList.add('visually-hidden')
            } else {
              el.classList.remove('visually-hidden')
            }
          })
        })
      }
    }

    popup.addEventListener('input', (e) => {

    })
  });

  document.addEventListener('click', (evt) => {
    const btn = evt.target.closest('[data-popup-target]');
    if (!btn) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    const popup = document.querySelector(`[data-popup="${btn.dataset.popupTarget}"]`);
    const inPopup = popup.closest('[data-popup].active');

    if (breakpoint.matches && !inPopup) {
      window.scrollLock.disableScrolling();
    }

    popup.classList.add('active');
    if (!inPopup) {
      setTimeout(() => {
        document.addEventListener('click', documentClickHandler);
        activePopup = popup;
      }, 0);
    }
  });
};

export {initPopups, closePopup};
