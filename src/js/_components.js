import { initCustomSelect } from "./components/init-custom-select";
import { initSubmenu } from "./components/init-submenu";
import { getHeaderHeight } from './functions/header-height';
import { initHeroSlider } from './components/init-hero-slider';
import { initTabs } from './components/init-tabs';
import { initAccordions } from './components/accordion/init-accordion';
import { initMobileMenu } from './components/init-mobile-menu';
import { initSubmenuMobile } from './components/init-submenu-mobile';
import { burger } from './functions/burger';

window.addEventListener('DOMContentLoaded', () => {
  initSubmenu();
  getHeaderHeight();
  initAccordions();
  initMobileMenu();
  initSubmenuMobile();
  window.addEventListener('load', () => {
    initCustomSelect();
    initHeroSlider();
    initTabs();
  });
});
