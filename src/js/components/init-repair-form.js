function initRepairForm() {
  const form = document.querySelector('.repair__form');
  const nextBtns = document.querySelectorAll('.repair__form-next-step');
  const formSteps = document.querySelectorAll('.repair__form-step');
  const stepBar = document.querySelector('.repair__form-counter-bar--active');

  if(!form) {
    return
  }

  let formStepNum = 0;
  let maxSteps = formSteps.length;

  nextBtns.forEach((btn) => {
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      window.scrollTo(top);
      formStepNum++;
      updateFormStep();
    });
  });

  function updateFormStep() {
    formSteps.forEach(formStep => {
      formStep.classList.contains('repair__form-step--active') &&
      formStep.classList.remove('repair__form-step--active');
    });
    formSteps[formStepNum].classList.add('repair__form-step--active');
    stepBar.style.width = ((formStepNum + 1) / maxSteps * 100) + '%';
  }
}

export {initRepairForm}
