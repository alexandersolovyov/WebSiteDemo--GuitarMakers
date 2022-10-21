/*
 * Главный скрипт сайта
 */

window.site = (function () {
  // Переменная для возврата
  var site = {};

  site.main = function () {
    /*====================================
     * Элементы и действия при старте
     *====================================
     */
    // Захватываем элементы меню
    var menuBtn = document.getElementById('nav-menu__button');
    var menu = document.getElementById('nav-menu');
    var navList = document.getElementById('nav-menu__list');
    var navIcon = document.getElementById('nav-menu__icon');
    // Убрать появление меню по Hover
    menu.className = menu.className.replace('is-nav-menu-hover', '');

    /*====================================
     * Слушаем события
     *====================================
     */
    // При клике на кнопке - показывать-прятать меню
    // и менять иконку кнопки
    window.utils.addEventListener(menuBtn, 'click', function () {
      var is_set = window.utils.toggleClass(navList, 'is-nav-menu__list-visible');
      if (is_set) {
        navIcon.className = navIcon.className.replace('icon-menu', 'icon-cancel');
      }else {
        navIcon.className = navIcon.className.replace('icon-cancel', 'icon-menu');
      }
    });
    // При клике на списке:
    // -если список виден (is-nav-menu__list-visible) - прячем его;
    // -меняем иконку обратно на "меню"
    window.utils.addEventListener(navList, 'click', function () {
      navList.className = navList.className.replace('is-nav-menu__list-visible', '');
      if (window.utils.getRealDisplay(menuBtn) !== 'none') { // если кнопка видна
        navIcon.className = navIcon.className.replace('icon-cancel', 'icon-menu');
      }
    });
    // При скролле подсвечиваем пункт меню
  };
    
  return site;
}());
