const initSubmenu = () => {
  const breakpoint = window.matchMedia('(min-width: 1024px)');
  const submenuList = document.querySelectorAll('[data-submenu]');
  const menuItemsWithSubmenus = document.querySelectorAll('[data-has-submenu]');
  const menuItemsWithoutSubmenus = document.querySelectorAll('[data-no-submenu]');
  const header = document.querySelector('.header');

  if (submenuList.length === 0) {
    return;
  }

  if (header === null) {
    return;
  }

  const showSubmenu = (item, itemMenu) => {
    item.classList.add('is-show');
    itemMenu.classList.add('is-hover');
  };

  const hideSubmenu = (item, itemMenu) => {
    item.classList.remove('is-show');
    itemMenu.classList.remove('is-hover');
  };

  const onLeaveBlockHideSubmenu = () => {
    const submenuShowList = document.querySelectorAll('[data-submenu]');
    submenuShowList.forEach((elem, i) => {
      if (elem.classList.contains('is-show')) {
        hideSubmenu(submenuList[i], menuItemsWithSubmenus[i]);
      }
    });
  };

  if (breakpoint.matches) {
    let headerHeight = header.offsetHeight;
    submenuList.forEach((item) => {
      item.style.top = `${headerHeight}px`;
    });

    document.addEventListener('mouseleave', onLeaveBlockHideSubmenu);

    submenuList.forEach((item) => {
      item.addEventListener('mouseleave', (evt) => {
        if (evt.relatedTarget !== document.querySelector('.main-nav')) {
          submenuList.forEach((elem, i) => {
            if (elem.classList.contains('is-show')) {
              hideSubmenu(submenuList[i], menuItemsWithSubmenus[i]);
            }
          });
        }
      });
    });

    menuItemsWithSubmenus.forEach((item, index) => {
      const itemSubmenu = submenuList[index];
      item.addEventListener('mouseenter', () => {
        const submenuShowList = document.querySelectorAll('[data-submenu]');
        submenuShowList.forEach((elem, i) => {
          if (elem.classList.contains('is-show') & i !== index) {
            hideSubmenu(submenuList[i], menuItemsWithSubmenus[i]);
          }
        });
        itemSubmenu.style.left = `${menuItemsWithSubmenus[index].offsetLeft - 25}px`
        showSubmenu(itemSubmenu, menuItemsWithSubmenus[index]);
      });
    });

    menuItemsWithoutSubmenus.forEach((item) => {
      item.addEventListener('mouseenter', onLeaveBlockHideSubmenu);
    });
  }

  window.addEventListener('resize', (evt) => {
    if (evt.currentTarget.innerWidth < 1024) {
      submenuList.forEach((item) => {
        item.style.top = 0;
      });
    } else {
      let headerHeight = header.offsetHeight;
      submenuList.forEach((item) => {
        item.style.top = `${headerHeight}px`;
      });
    }
  });
};

export {initSubmenu};
