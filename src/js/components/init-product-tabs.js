import GraphTabs from 'graph-tabs';

function initProductTabs() {
  const prodTabEl = document.querySelector('[data-tabs=productTabs]');
  if(!prodTabEl) {
    return;
  }
  const productTabs = new GraphTabs('productTabs');
}

export {initProductTabs};
