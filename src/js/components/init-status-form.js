import Inputmask from "inputmask";

function initStatusForm() {
  const telInput = document.querySelector('.status-page__input--phone');

  if(!telInput) {
    return;
  }

  const inputMask = new Inputmask('+7 (999) 999-99-99');
  inputMask.mask(telInput);
}

export {initStatusForm}
