import GraphTabs from 'graph-tabs';

function initTabs() {
  const tabsEl = document.querySelectorAll('[data-tabs=products]');
  if(!tabsEl.length) {
    return
  }
  const tabs = new GraphTabs('products');
}

export {initTabs}
