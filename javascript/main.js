/*
 * Главный скрипт сайта
 */

if (typeof window.site !== 'object') {
  window.site = {};
}

(function () {
  // Вычисляет текущее значение CSS-свойства display элемента DOM
  var getRealDisplay = function (elem) {
    if (elem.currentStyle) {
      return elem.currentStyle.display;
    } else if (window.getComputedStyle) {
      var computedStyle = window.getComputedStyle(elem, null);
      return computedStyle.getPropertyValue('display'); 
    }
  };
  // Универсальная функция добавления обработки события
  // type - тип события без on
  var addEventListener = function (elem, type, listener) {
    if (elem.addEventListener) {
      elem.addEventListener("click", listener, false);
    }
    else {
      type = 'on' + type;
      elem.attachEvent("onclick", listener);
    }
  };
  // Устанавливает-убирает класс для элемента
  var toggleClass = function (elem, classNam) {
    var i;
    var classes = elem.className.split(' ');
    var ret = '';
    if (elem.className.indexOf(classNam) < 0) { // добавить класс
      ret = elem.className;
      ret = ret + ' ' + classNam;
    }else { // убрать класс
      for (i in classes) {
        if (classes[i] !== classNam) {
          ret = ret + classes[i] + ' ';
        }
      }
    }
    elem.className = ret;
  };
  site.main = function () {
    // Кнопка главного меню:
    var menuBtn = document.getElementById('nav-menu__button');
    var menu = document.getElementById('nav-menu');
    var navList = document.getElementById('nav-menu__list');
    menu.className = menu.className.replace('is-nav-menu-hover', '');
    // При клике на кнопке - показывать-прятать меню
    addEventListener(menuBtn, 'click', function () {
      toggleClass(navList, 'is-nav-menu__list-visible');
    });
    // При клике на списке: если список виден (is-nav-menu__list-visible) -
    // прячем его.
    addEventListener(navList, 'click', function () {
      navList.className = navList.className.replace('is-nav-menu__list-visible', '');
    });
  };
    
}());
