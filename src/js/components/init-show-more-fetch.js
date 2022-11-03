let forms = [];
export class FetchMore {
  constructor() {
    this.listSelector = null;
    this.itemSelector = null;
    this.moreSelector = null;
    this.formSelector = null;
    this.list = null;
    this.btnMore = null;
    this.form = null;
    this.parentSubmit = null;

    this._handleMoreClick = this._handleMoreClick.bind(this);
  }

  init(initListSelector, initItemSelector, initMoreSelector, initFormSelector) {
    this.listSelector = initListSelector;
    this.itemSelector = initItemSelector;
    this.moreSelector = initMoreSelector;
    this.formSelector = initFormSelector;

    this._getCurrentList();

    if (!this.list) {
      return;
    }

    this._addButtonEvent();
    this._addSubmitEvent();
  }

  _getCurrentList() {
    this.list = document.querySelector(this.listSelector);
  }

  _getCurrentBtnMore() {
    this.btnMore = document.querySelector(this.moreSelector);
  }

  _getCurrentForm() {
    if (!forms.includes(document.querySelector(this.formSelector))) {
      this.form = document.querySelector(this.formSelector);
      forms.push(this.form)
    }
  }

  _addButtonEvent() {
    this._getCurrentBtnMore();

    if (!this.btnMore) {
      return;
    }

    this.btnMore.addEventListener('click', this._handleMoreClick);
  }

  _addSubmitEvent() {
    this._getCurrentForm();

    if (!this.form) {
      return;
    }

    this.form.addEventListener('change', (evt) => {
      if (evt.target === this.form) {
        setTimeout(() => {
          this._getFilteredData(evt)
        }, 300);
      }
    });
  }

  _removeButtonEvent() {
    if (!this.btnMore) {
      return;
    }

    this.btnMore.removeEventListener('click', this._handleMoreClick);
  }

  _addListItem(page, reset = false) {
    const items = [...page.querySelectorAll(this.itemSelector)];
    const newBtnMore = page.querySelector(this.moreSelector);

    if (!items) {
      return;
    }

    if (reset) {
      const newList = page.querySelector(this.listSelector);

      if (newList) {
        const parent = this.list.parentNode;
        parent.replaceChild(newList, this.list);
        this._getCurrentList();
        this._getCurrentBtnMore();
      }
    } else {
      items.forEach((item) => this.list.append(item));
    }

    if (newBtnMore) {
      if (this.btnMore) {
        this.parentSubmit = this.btnMore.parentNode;
        this._removeButtonEvent();
        this.parentSubmit.replaceChild(newBtnMore, this.btnMore);
      } else {
        if (this.parentSubmit) {
          this.parentSubmit.append(newBtnMore);
        }
      }
      this._addButtonEvent();
    } else {
      if(this.btnMore) {
        this._removeButtonEvent();
        this.btnMore.remove();
        this.btnMore = null;
      }
    }
  }

  _handleMoreClick(evt) {
    const target = evt.target;
    let url = target.dataset.url;
    if (this.form) {
      url = target.dataset.url + this._getParams(false);
    }

    if (!url) {
      return;
    }

    fetch(`${url}`, {method: 'GET'})
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        this._addListItem(doc, false);
      })
      .catch((err) => {
        throw err;
      });
  }

  _updateURL(params) {
    if (!history.pushState) {
      return;
    }
    const baseUrl = `${window.location.protocol}//${window.location.host + window.location.pathname}`;
    const newUrl = baseUrl + params;

    history.pushState(null, null, newUrl);
  }

  _getParams(reset) {
    const data = {};

    if (!reset) {
      [...this.form.querySelectorAll(
        'input:not([type="checkbox"]):not([type="radio"]), input[type="checkbox"][data-is-inverse="false"]:checked, input[type="checkbox"][data-is-inverse="true"]:not(:checked), input[type="radio"]:checked, select, .option-item[aria-selected="true"]')]
        .filter((item) => item.value ? item.value : item.dataset.selectValue)
        .forEach((item) => {
          if (item.tagName === 'SELECT') {
            let selectValue = [];
            for (let i = 0; i < item.options.length; i++) {
              if (item.options[i].selected) {
                selectValue.push(item.options[i].value || item.options[i].text);
              }
            }
            data[item.name] = selectValue.toString();
          } else if (item.name) {
            data[item.name] = item.type === 'checkbox' ? item.checked : item.value;
          }
        });
    }

    return Object.keys(data).length > 0 ? `?${(new URLSearchParams(data)).toString().replace(/%2C/g,",")}` : '';
  }

  _getFilteredData(evt) {
    evt.preventDefault();
    const target = evt.target;
    const isBntReset = target === btnReset;
    const isTargetForm = target === this.form || isBntReset;
    const fields = [...this.form.querySelectorAll(
      'input:not([type="checkbox"]), input[type="checkbox"]:checked, select')];
    const isFormEmpty = !fields.find((item) => item.value);
    const url = isTargetForm ? this.form.action : target.dataset.url;

    if (isBntReset) {
      this.form.reset();
      // resetSortBtn();
    }

    const filterParams = this._getParams(isBntReset);

    this._updateURL(filterParams);
    console.log(`${url}${filterParams}`);
    if (url) {
      fetch(`${url}${filterParams}`, {method: 'get'})
        .then((response) => response.text())
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          // const items = [...page.querySelectorAll(this.itemSelector)];
          // items.forEach((el) => el.remove())
          this._addListItem(doc, true);
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log('Ошибка загрузки данных новостей: ', err));
    }
  }
}


// ______________________________________________
// фильтрация

const filterForm = document.querySelector('[data-filter] form');
let list = document.querySelector('[data-name="catalog-content"]');
let btnReset;
let sortSelect;


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
      'input:not([type="checkbox"]):not([type="radio"]), input[type="checkbox"]:checked, input[type="radio"]:checked, select, .option-item[aria-selected="true"]')]
      .filter((item) => item.value ? item.value : item.dataset.selectValue)
      .forEach((item) => {
        if (item.tagName === 'SELECT') {
          let selectValue = [];
          for (let i = 0; i < item.options.length; i++) {
            if (item.options[i].selected) {
              selectValue.push(item.options[i].value || item.options[i].text);
            }
          }
          data[item.name] = selectValue.toString();
        } else if (item.name) {
          data[item.name] = item.type === 'checkbox' ? item.checked : item.value;
        }
      });
  }

  return Object.keys(data).length > 0 ? `?${(new URLSearchParams(data)).toString().replace(/%2C/g,",")}` : '';
};


const handleMoreClick = (evt) => {
  evt.preventDefault();

  const target = evt.target;
  const isBntReset = target === btnReset;
  const isTargetForm = target === filterForm || isBntReset;
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
        this._addListItem(doc, false);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log('Ошибка загрузки данных новостей: ', err));
  }
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
}

const initShowMoreFetch = () => {
  if (!list) {
    return;
  }

  if (filterForm) {
    // filterForm.addEventListener('submit', handleMoreClick);
    // filterForm.addEventListener('change', function (evt) {
    //   setTimeout(() => {
    //     handleMoreClick(evt);
    //   }, 300);
    // });
  }

  sortSelect = document.querySelector('[data-name="sort"] select');
  btnReset = document.querySelector('[data-filter-clear]');
  console.log(sortSelect);

  if (sortSelect) {
    sortSelect.addEventListener('change', (evt) =>{
      setTimeout(() => updateURL(`?${(new URLSearchParams({'sort': evt.detail.value})).toString().replace(/%2C/g,",")}`), 100)
    });
  }

  btnReset.addEventListener('click', handleMoreClick);
};

export {initShowMoreFetch, getParams, updateURL};
