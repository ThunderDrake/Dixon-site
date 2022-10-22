import Choices from 'choices.js';

function initQuestionaryForm() {
  const questionarySelects = document.querySelectorAll('.questionary__select');
  const questionaryInputs = document.querySelectorAll('.questionary__item');

  if(!questionarySelects.length && !questionaryInputs.length) {
    return
  }
  questionarySelects.forEach(el=>{
    const questionarySelect = new Choices(el, {
      searchEnabled: false,
      itemSelectText: '',
    });
  });

  questionaryInputs.forEach(input => {
    const currentPlaceholder = input?.querySelector('.questionary__item-placeholder');
    const currentInput = input?.querySelector('.questionary__input');

    currentInput.addEventListener('focus', () => {
      currentPlaceholder.classList.add('hide');
    });
    currentInput.addEventListener('blur', () => {
      if(currentInput.value == '') {
        currentPlaceholder.classList.remove('hide');
      }
    })
  });
}

export {initQuestionaryForm};
