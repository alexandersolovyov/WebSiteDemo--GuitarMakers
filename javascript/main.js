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
  // Устанавливает-убирает класс для элемента,
  // возвращает true если класс установлен.
  var toggleClass = function (elem, classNam) {
    var i;
    var classes = elem.className.split(' ');
    var new_class = '';
    ret = false;
    if (elem.className.indexOf(classNam) < 0) { // добавить класс
      new_class = elem.className;
      new_class = new_class + ' ' + classNam;
      ret = true;
    }else { // убрать класс
      for (i in classes) {
        if (classes[i] !== classNam) {
          new_class = new_class + classes[i] + ' ';
        }
      }
    }
    elem.className = new_class;
    return ret;
  };
  site.main = function () {
    // Кнопка главного меню:
    var menuBtn = document.getElementById('nav-menu__button');
    var menu = document.getElementById('nav-menu');
    var navList = document.getElementById('nav-menu__list');
    var navIcon = document.getElementById('nav-menu__icon');
    menu.className = menu.className.replace('is-nav-menu-hover', '');
    // При клике на кнопке - показывать-прятать меню
    // и менять иконку кнопки
    addEventListener(menuBtn, 'click', function () {
      var is_set = toggleClass(navList, 'is-nav-menu__list-visible');
      if (is_set) {
        navIcon.className = navIcon.className.replace('icon-menu', 'icon-cancel');
      }else {
        navIcon.className = navIcon.className.replace('icon-cancel', 'icon-menu');
      }
    });
    // При клике на списке:
    // -если список виден (is-nav-menu__list-visible) - прячем его;
    // -меняем иконку обратно на "меню"
    addEventListener(navList, 'click', function () {
      navList.className = navList.className.replace('is-nav-menu__list-visible', '');
      if (getRealDisplay(menuBtn) !== 'none') { // если кнопка видна
        navIcon.className = navIcon.className.replace('icon-cancel', 'icon-menu');
      }
    });
  };
    
}());
