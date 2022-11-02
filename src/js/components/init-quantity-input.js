function initQuantityInput() {
  const quantityButton = document.querySelectorAll('.quantity__button');

  if(!quantityButton.length) {
    return;
  }

  quantityButton.forEach(el => {
    let quantityNumber = el.closest('.quantity').querySelector('.quantity__value');

    el.addEventListener('click', (e) => {
      if(e.target.classList.contains('quantity__button--plus')) {
        let quantity = quantityNumber.textContent;
        quantityPlus(quantityNumber);
      } else if (e.target.classList.contains('quantity__button--minus')) {
        let quantity = quantityNumber.textContent;
        quantityMinus(quantityNumber);
      }
    });


  });

  const quantityPlus = (value) => {
    let quantity = value.textContent;
    quantity++;
    value.textContent = quantity;
  };

  const quantityMinus = (value) => {
    let quantity = value.textContent;
    quantity--;
    if (quantity<1) {
      quantity = 1;
      return quantity;
    }
    value.textContent = quantity;
  };
}

export {initQuantityInput};
