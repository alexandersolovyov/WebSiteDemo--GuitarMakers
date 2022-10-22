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
    // Идентификаторы элементов для навигации.
    // -Порядок в этом списке важен! Он повторяет порядок якорей на странице.
    // -Если это ID блока - в конце есть '-section'
    // -Если нужно ID ссылки в меню - окончание нужно заменить на '-ref'
    // (в названиях переменных anchor = цель ссылки, ref = ссылка в меню)
    var anchorIds = [
      'services-section',
      'demo-section',
      'features-section',
      'prices-section',
      'form-section',
      'contacts-section',
    ];

    // Рассчитать расположение элементов для навигации
    var anchorPositions = window.utils.getYOffsets(anchorIds);

    // Захватываем элементы меню
    var menuBtn = document.getElementById('nav-menu__button');
    var menu = document.getElementById('nav-menu');
    var navList = document.getElementById('nav-menu__list');
    var navIcon = document.getElementById('nav-menu__icon');
    // Убрать появление меню по Hover
    menu.className = menu.className.replace('is-nav-menu-hover', '');

    /*========================================
     * Функции для вставки в обработку событий
     *========================================
     */
    // Для события onscroll, выполняет функцию только если прошло указанное
    // время. Возвращает функцию, которая должна выполняться при обработке
    // события.
    var throttle = function (func, time_ms) {
      var locked = false; // глобальная переменная
      return function() {
        if (locked) { return; } // если функция func ещё не запускалась
        locked = true;
        setTimeout(function() { // через определённое время
          func();               // запускаем полезную функцию
          locked = false;       // и разблокируем 
        }, time_ms);
      };
    };
    // Подсветка пунктов главного меню при прокрутке страницы
    var highlightMainRef = function() {
      // Функция для выбора ссылки по ИД целевого раздела
      var get_ref = function (section_id) {
        return document.getElementById(section_id.replace('-section', '-ref'));
      };
      // Класс которым помечаем пункт меню
      var marker_class = 'is-nav-menu__link-active';
      // Берём позицию окна
      var win_pos = window.utils.getWindowOffset();
      // Начинаем с нижнего раздела-цели.
      // Если низ экрана ниже его верха - подсвечиваем пункт меню.
      var is_marked = false; // станет true если один элемент помечен
      var i = anchorIds.length - 1; // итератор списка якорей
      var ref_el = get_ref(anchorIds[i]); // нижний элемент страницы
      if (win_pos.bottom > anchorPositions[anchorIds[i]]) {
        window.utils.addClass(ref_el, marker_class);
        is_marked = true; // помечен, остальные якоря только очищаем от метки
      }else {
        window.utils.removeClass(ref_el, marker_class);
      }
      // Проход по остальным элементам.
      i -= 1;
      while (i >= 0) {
        ref_el = get_ref(anchorIds[i]);
        if (is_marked) { // уже помечено, дальше только убираем
          window.utils.removeClass(ref_el, marker_class);
        // Если верх элемента выше верха окна - подсвечиваем пункт меню.
        }else if (win_pos.top > (anchorPositions[anchorIds[i]] - 15)) {
          window.utils.addClass(ref_el, marker_class);
          is_marked = true;
        }else { // если ещё не дошли до совпадения
          window.utils.removeClass(ref_el, marker_class);
        }
        i -= 1;
      }
      console.log('Highlight end');
    };
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
    navList.onclick = function () {
      window.utils.removeClass(navList, 'is-nav-menu__list-visible');
      if (window.utils.getRealDisplay(menuBtn) !== 'none') { // если кнопка видна
        navIcon.className = navIcon.className.replace('icon-cancel', 'icon-menu');
      }
    };
    // При изменении размеров окна рассчитать расположение элементов-целей для
    // навигации
    window.onresize = function () {
      anchorPositions = window.utils.getYOffsets(anchorIds);
    };
    // При скролле подсвечиваем пункт меню
    window.onscroll = throttle(highlightMainRef, 100);
  };
    
  return site;
}());
