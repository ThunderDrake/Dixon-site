function initShippingActivity() {
  const shippingMethod = document.querySelectorAll('.checkout-form__shipping-wrapper input');
  const popups = document.querySelectorAll('.checkout-form__shipping-popup');

  if(!shippingMethod) {
    return;
  }

  shippingMethod.forEach((el)=>{
    el.addEventListener('click', (e)=>{
      if(e.target.checked) {
        popups.forEach(el=>{el.classList.remove('active')});
        console.log(el);
        el.closest('.checkout-form__shipping-wrapper').querySelector('.checkout-form__shipping-popup').classList.add('active');
      }
    })
  })
}

export {initShippingActivity};
