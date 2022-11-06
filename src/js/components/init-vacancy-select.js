import Choices from 'choices.js';

function initVacancySelect() {
  const vacancySelects = document.querySelectorAll('.vacancy__select');
  const vacancyInfo = document.querySelectorAll('.vacancy__info');

  if(!vacancySelects.length) {
    return
  }
  vacancySelects.forEach(el=>{
    const vacancySelect = new Choices(el, {
      searchEnabled: false,
      itemSelectText: '',
    });

    el.addEventListener('choice', function(event){
      vacancyInfo.forEach(el=>{el.classList.remove('active')});
      [...vacancyInfo].find(item=>item.dataset.value === event.detail.choice.value).classList.add('active');
    },
    false)
  })
}

export {initVacancySelect};
