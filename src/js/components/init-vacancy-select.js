import Choices from 'choices.js';

function initVacancySelect() {
  const vacancySelects = document.querySelectorAll('.vacancy__select');

  if(!vacancySelects.length) {
    return
  }
  vacancySelects.forEach(el=>{
    const vacancySelect = new Choices(el, {
      searchEnabled: false,
      itemSelectText: '',
    });
  })
}

export {initVacancySelect};
