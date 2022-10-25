import { initCustomSelect } from "./components/init-custom-select";
import { initSubmenu } from "./components/init-submenu";
import { getHeaderHeight } from './functions/header-height';
import { initHeroSlider } from './components/init-hero-slider';
import { initTabs } from './components/init-tabs';
import { initAccordions } from './components/accordion/init-accordion';
import { initMobileMenu } from './components/init-mobile-menu';
import { initSubmenuMobile } from './components/init-submenu-mobile';
import { initCertificatesSlider } from './components/init-certificates-slider';
import { initVacancySelect } from './components/init-vacancy-select';
import { initQuestionaryForm } from './components/init-questionary-form';
import { FetchMore, initShowMoreFetch, getParams, updateURL } from './components/init-show-more-fetch';
import { initPopups, closePopup } from './components/init-popups';
// import { initFilters } from './components/init-filters';
import { burger } from './functions/burger';

window.addEventListener('DOMContentLoaded', () => {
  initSubmenu();
  getHeaderHeight();
  initAccordions();
  initMobileMenu();
  initSubmenuMobile();
  initVacancySelect();
  initQuestionaryForm();
  const initFilters = () => {
    const filters = document.querySelector('.filter');

    if (!filters) {
      return;
    }

    const selectItems = filters.querySelectorAll('.custom-select-item');
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

        updateURL('');
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
        } else {
          filterValues.forEach((el) => {
            const optionToCheck = filter.querySelector(`[data-select-value="${el}"]`);
            const hiddenOptionToCheck = filter.querySelector(`[value="${el}"]`);
            if (optionToCheck) {
              optionToCheck.setAttribute('aria-selected', 'true');
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


  window.addEventListener('load', () => {
    const initFetchMore = () => {
      const data = {
        catalog: [
          '[data-name="catalog-content"]',
          '[data-name="catalog-content-item"]',
          '[data-name="courses-more"]',
          '[data-filter] form'
        ],
      };

      Object.values(data)
          .forEach((selectors) =>
            new FetchMore().init(...selectors));
    };
    initFetchMore();
    // initFilters();
    initCustomSelect();
    initHeroSlider();
    initTabs();
    initCertificatesSlider();
    initPopups();
    initFilters();
    initShowMoreFetch();
  });
});

