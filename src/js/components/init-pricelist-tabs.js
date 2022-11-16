import GraphTabs from 'graph-tabs';
import ShowMore from '../vendor/show-more.js';

function initPricelistTabs() {
  const pricelistEl = document.querySelector('[data-tabs=pricelist]');
  if(!pricelistEl) {
    return;
  }
  const pricelistTabs = new GraphTabs('pricelist');

  const work = document.querySelector(".pricelist__grid");
  const items = Array.from(work.querySelectorAll(".pricelist__item"));
  const loadMore = document.querySelector(".pricelist__show-more");

  let maxItems = 12;
  let loadItems = 12;
  let hiddenClass = "pricelist__item--hidden";
  let hiddenItems = Array.from(document.querySelectorAll(".pricelist__item--hidden"));

  items.forEach(function (item, index) {
    console.log(item.innerText, index);
    if (index > maxItems - 1) {
      item.classList.add(hiddenClass);
    }
  });

  loadMore.addEventListener("click", function () {
    [].forEach.call(document.querySelectorAll("." + hiddenClass), function (
      item,
      index
    ) {
      if (index < loadItems) {
        item.classList.remove(hiddenClass);
      }

      if (document.querySelectorAll("." + hiddenClass).length === 0) {
        loadMore.style.display = "none";
      }
    });
  });

  const pricelistItems = document.querySelectorAll('.pricelist__item');

  pricelistItems.forEach(el=>{
    el.addEventListener('click', (e)=>{
      pricelistItems.forEach(el=>{
        el.classList.remove('pricelist__item--active');
      });

      el.classList.add('pricelist__item--active')
    })
  })
}

export {initPricelistTabs};
