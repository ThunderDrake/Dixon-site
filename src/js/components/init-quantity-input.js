function initQuantityInput() {
  const quantityButton = document.querySelectorAll('.quantity__button');

  if(!quantityButton.length) {
    return;
  }

  quantityButton.forEach(el => {
    let quantityNumber = el.closest('.quantity').querySelector('.quantity__value');
    let quantityInput = el.closest('.quantity').querySelector('.quantity__input');

    console.log(quantityInput.value = 5);
    el.addEventListener('click', (e) => {
      if(e.target.classList.contains('quantity__button--plus')) {

        quantityPlus(quantityNumber, quantityInput);
      } else if (e.target.classList.contains('quantity__button--minus')) {

        quantityMinus(quantityNumber, quantityInput);
      }
    });


  });

  const quantityPlus = (value, input) => {
    let quantity = value.textContent;
    quantity++;
    value.textContent = quantity;
    input.value = quantity;
  };

  const quantityMinus = (value, input) => {
    let quantity = value.textContent;
    quantity--;
    if (quantity<1) {
      quantity = 1;
      return quantity;
    }
    value.textContent = quantity;
    input.value = quantity;
  };
}

export {initQuantityInput};
