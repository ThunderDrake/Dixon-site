const filterForm = document.querySelector('[data-filter] form');
const arhiveListWrapper = document.getElementById('arhive-listing');
const btnMoreWrapper = document.querySelector('[data-name="more-wrapper"]');
let btnMore;
let btnReset;
let sortSelect;

const addButtonEvent = () => {
  btnMore = document.querySelector('[data-name="more"]');
  if (!btnMore) {
    return;
  }
  btnMore.addEventListener('click', handleMoreClick);
};

const removeButtonEvent = () => {
  if (!btnMore) {
    return;
  }
  btnMore.removeEventListener('click', handleMoreClick);
};

const addListItem = (page, reset = false) => {
  const newBtnMore = page.querySelector('[data-name="more"]');
  const newArhiveListWrapper = page.getElementById('arhive-listing');
  const newContent = newArhiveListWrapper ? newArhiveListWrapper.innerHTML : '';

  if (reset) {
    arhiveListWrapper.innerHTML = newContent;
  } else {
    arhiveListWrapper.innerHTML += newContent;
  }

  if (newBtnMore) {
    if (btnMore) {
      removeButtonEvent();
      btnMoreWrapper.replaceChild(newBtnMore, btnMore);
    } else {
      btnMoreWrapper.append(newBtnMore);
    }
    addButtonEvent();
  } else {
    removeButtonEvent();
    btnMore.remove();
    btnMore = null;
  }
};

const updateURL = (params) => {
  if (!history.pushState) {
    return;
  }
  const baseUrl = `${window.location.protocol}//${window.location.host + window.location.pathname}`;
  const newUrl = baseUrl + params;

  history.pushState(null, null, newUrl);
};

const getParams = (reset = false) => {
  const data = {};

  if (!reset) {
    [...filterForm.querySelectorAll(
        'input:not([type="checkbox"]), input[type="checkbox"]:checked, select')]
        .filter((item) => item.value)
        .forEach((item) => {
          if (item.name) {
            data[item.name] = item.type === 'checkbox' ? item.checked : item.value;
          }
        });
  }

  if (sortSelect && sortSelect.value) {
    data[sortSelect.name] = sortSelect.value;
  }

  return Object.keys(data).length > 0 ? `?${(new URLSearchParams(data)).toString()}` : '';
};

const handleMoreClick = (evt) => {
  evt.preventDefault();
  const target = evt.target;
  const isBntReset = target === btnReset;
  const isTargetForm = target === filterForm || target === sortSelect || isBntReset;
  const fields = [...filterForm.querySelectorAll(
      'input:not([type="checkbox"]), input[type="checkbox"]:checked, select')];
  const isFormEmpty = !fields.find((item) => item.value);
  const url = isTargetForm ? filterForm.action : target.dataset.url;

  if (isBntReset) {
    filterForm.reset();
    resetSortBtn();
  }

  const filterParams = getParams(isBntReset);

  updateURL(filterParams);

  if (url) {
    fetch(`${url}${filterParams}`, {method: 'get'})
        .then((response) => response.text())
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          addListItem(doc, isTargetForm);
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log('Ошибка загрузки данных новостей: ', err));
  }
};

const initShowMoreFetch = () => {
  if(!filterForm) {
    return;
  }

  if (filterForm) {
    filterForm.addEventListener('submit', handleMoreClick);
  }

  sortSelect = document.querySelector('[data-name="sort"] select');
  btnReset = filterForm.querySelector('[type="reset"]');

  if (sortSelect) {
    sortSelect.addEventListener('change', (evt) =>
      setTimeout(() => handleMoreClick(evt), 100));
  }

  addButtonEvent();
  btnReset.addEventListener('click', handleMoreClick);
};

const resetSortBtn = () => {
  if (sortSelect) {
    let sortBox = document.querySelector('[data-name="sort"]');
    let sortItemActive = sortBox.querySelector('[aria-selected="true"]');
    let sortSelectFirstOption = sortSelect.options[0];

    sortBox.classList.remove('not-empty');

    if (sortItemActive) {
      sortItemActive.setAttribute('aria-selected', 'false');
    }

    if (sortSelectFirstOption && !sortSelectFirstOption.value) {
      sortSelect.options[0].selected = 'selected';
    }
  }
};

export {initShowMoreFetch};
