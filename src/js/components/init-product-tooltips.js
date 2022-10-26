import { createPopper, right} from '@popperjs/core';

function initTooltips() {
  const tooltips = document.querySelectorAll('.tooltip');

  if(!tooltips.length) {
    return
  }

  tooltips.forEach(el=>{
    let btn = el.querySelector('.tooltip__btn');
    let content = el.querySelector('.tooltip__txt');
    console.log(el);
    createPopper(btn, content, {
      placement: 'right-end',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [-20, 5],
          },
        },
      ],
    });
  })
}

export {initTooltips}
