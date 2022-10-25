import {getParams, updateURL} from './init-show-more-fetch';
import {closePopup} from './init-popups';

const initFilters = () => {
  const filters = document.querySelector('.filters');

  if (!filters) {
    return;
  }

  const selectItems = filters.querySelectorAll('.custom-select-item');
  const list = filters.querySelector('.selected-filters-list');
  const counts = filters.querySelectorAll('[data-count]');
  const clearButtons = filters.querySelectorAll('[data-filter-clear]');

  const inputSearchInput = filters.querySelector('[data-input-search="input"]');
  const inputSearchClear = filters.querySelector('[data-input-search="clear"]');
  const inputSearchAdd = filters.querySelector('[data-input-search="search"]');
  const inputSearchPopup = filters.querySelector('[data-popup="search"]');

  const selectSearchInput = filters.querySelector('[data-select-search="input"]');
  const selectSearchSelect = filters.querySelector('[data-select-search="select"]');
  const selectSearchClear = filters.querySelector('[data-select-search="clear"]');
  const selectSearchButton = filters.querySelector('[data-select-search="search"]');
  const form = filters.querySelector('form');

  const clearFilter = () => {
    setTimeout(() => {
      const filterParams = getParams();

      updateURL(filterParams);
    }, 300);

    // if (selectSearchSelect) {
    //   // const selectSearchPrompt = selectSearchSelect.querySelector('[data-select-search="prompt"]');
    //   const selectSearchItems = selectSearchSelect.querySelectorAll('.custom-select-item');

    //   selectSearchItems.forEach((item) => {
    //     item.classList.remove('hidden');
    //     // selectSearchPrompt.classList.remove('active');
    //   });
    // }

    // // filters.dispatchEvent(new CustomEvent('change'));
    // // form.dispatchEvent(new CustomEvent('change'));
    // list.classList.remove('active');
  };

  const addSearchValue = () => {
    form.dispatchEvent(new CustomEvent('change'));
    const previousSearch = list.querySelector('.selected-filters__item--search');
    if (previousSearch) {
      previousSearch.remove();
    }
    list.append(renderElement(inputSearchInput.value, false, 'selected-filters__item--search'));
    closePopup(inputSearchPopup)
  }

  clearButtons.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
      evt.preventDefault();
      clearFilter();
    });
  });

  filters.addEventListener('change', ({target, detail}) => {
    setTimeout(() => {
      if (target.type === 'radio' || target.type === 'checkbox') {
        form.dispatchEvent(new CustomEvent('change'));
      }
      if (detail) {
        if (detail.element.getAttribute('aria-selected') === 'true') {
          list.append(renderElement(detail.element.querySelector('span').textContent, detail.value));
        } else {
          const item = list.querySelector(`.selected-filters__item[data-value="${detail.value}"]`);
          if (item) {
            item.remove();
          }
        }
      }
      const count = list.querySelectorAll('.selected-filters__item').length;
      counts.forEach((item) => {
        if (count) {
          item.classList.remove('hidden');
          item.innerHTML = count.toString();
        } else {
          item.classList.add('hidden');
        }
      });
      if (count) {
        list.classList.add('active');
      } else {
        list.classList.remove('active');
      }
    }, 100)
  });

  // Поиск по селекту
  if (selectSearchButton) {
    const selectSearchPrompt = selectSearchSelect.querySelector('[data-select-search="prompt"]');
    const selectSearchItems = selectSearchSelect.querySelectorAll('.custom-select-item');

    selectSearchButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      const searchItemsLength = [...selectSearchItems].filter((item) => item.querySelector('span').textContent.toLowerCase().indexOf(selectSearchInput.value.toLowerCase()) !== -1).length;
      selectSearchItems.forEach((item) => {
        const itemText = item.querySelector('span').textContent;
        if (itemText.toLowerCase().indexOf(selectSearchInput.value.toLowerCase()) === -1) {
          item.classList.add('hidden');
        } else {
          item.classList.remove('hidden');
        }
      });
      if (!searchItemsLength) {
        selectSearchPrompt.classList.add('active');
        selectSearchPrompt.textContent = `По запросу «${selectSearchInput.value}» ничего не найдено`;
      } else {
        selectSearchPrompt.classList.remove('active');
      }
    });

    if (selectSearchClear) {
      selectSearchClear.classList.add('hidden');

      selectSearchInput.addEventListener('input', () => {
        if (selectSearchInput.value === '') {
          selectSearchClear.classList.add('hidden');
        } else {
          selectSearchClear.classList.remove('hidden');
        }
      });

      selectSearchClear.addEventListener('click', (evt) => {
        evt.preventDefault();
        selectSearchInput.value = '';
        selectSearchClear.classList.add('hidden');
        selectSearchItems.forEach((item) => {
          item.classList.remove('hidden');
          selectSearchPrompt.classList.remove('active');
        });
        const innerSelectItems = selectSearchClear.closest('.filter-popup').querySelectorAll('.option-item');
        if (innerSelectItems.length > 0) {
          innerSelectItems.forEach((el) => {
            el.classList.remove('visually-hidden');
          });
        }
      });
    }
  }

  if (inputSearchInput) {
    inputSearchClear.addEventListener('click', (evt) => {
      inputSearchInput.value = '';
    })

    inputSearchAdd.addEventListener('click', (evt) => {
      if (inputSearchInput.value.length > 0) {
        addSearchValue()
      }
    })

    inputSearchInput.addEventListener('change', (evt) => {
      const target = evt.explicitOriginalTarget;
      if (target && target.tagName === 'INPUT' && inputSearchInput.value.length > 0) {
        addSearchValue()
      }
    })

    inputSearchInput.addEventListener('keypress', (evt) => {
      if (evt.key == 'enter' || evt.keyCode == 13) {
        addSearchValue()
      }
    })
  }

  const onPageLoad = () => {
    const url = window.location.href;
    if (url.indexOf('?') < 0) {
      return
    }
    const arrayOfFilters = window.location.href.substring(url.indexOf('?') + 1).split('&');
    arrayOfFilters.forEach((elem) => {
      const filterDataName = elem.substring(0, elem.indexOf('='));
      const filterValues = elem.substring(elem.indexOf('=') + 1).split(',');
      const filter = document.querySelector(`[data-name="${filterDataName}"]`);
      if (filter.type=== 'checkbox') {
        if (filterValues[0] === 'true') {
          filter.checked = true
        } else {
          filter.checked = false
        }
      } else if (filter.type === 'search')  {
        inputSearchInput.value = filterValues[0];
        list.append(renderElement(inputSearchInput.value, false, 'selected-filters__item--search'));
      } else {
        filterValues.forEach((el) => {
          const optionToCheck = filter.querySelector(`[data-select-value="${el}"]`);
          const hiddenOptionToCheck = filter.querySelector(`[value="${el}"]`);
          if (optionToCheck) {
            optionToCheck.setAttribute('aria-selected', 'true');
            list.append(renderElement(optionToCheck.querySelector('span').textContent, el));
          }
          if (hiddenOptionToCheck) {
            hiddenOptionToCheck.selected = true;
          }
        })
      }
    })
    filters.dispatchEvent(new CustomEvent('change'));
  }

  onPageLoad()
};


export {initFilters};
