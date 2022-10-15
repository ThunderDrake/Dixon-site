import { initCustomSelect } from "./components/init-custom-select";
import { initSubmenu } from "./components/init-submenu";
import { getHeaderHeight } from './functions/header-height';
import { initHeroSlider } from './components/init-hero-slider';
import { initTabs } from './components/init-tabs';

window.addEventListener('DOMContentLoaded', () => {
  initSubmenu();
  getHeaderHeight();
  window.addEventListener('load', () => {
    initCustomSelect();
    initHeroSlider();
    initTabs();
  });
});
