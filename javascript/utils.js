/*
 * Utility functions for using a littlebit of JavaScript.
 * Compatible with Internet Explorer 8.
 *
 * License: none, you can use it any way without warranties.
 * (C) Aleksandr Solovyov, 2022
 */

window.utils = (function () {
  // Object to return
  var utils = {};

  /*
   * Calculates runtime value of CSS 'display' property of given 'elem'.
   * @param elem - DOM element to check.
   * @return String value of CSS 'display' property
   */
  utils.getRealDisplay = function (elem) {
    if (elem.currentStyle) {
      return elem.currentStyle.display;
    } else if (window.getComputedStyle) {
      var computedStyle = window.getComputedStyle(elem, null);
      return computedStyle.getPropertyValue('display'); 
    }
  };
  /*
   * Function for adding event listeners.
   * (Works also on IE8)
   * NOTE: Better dont use it. It is only for reference as it can misuse
   * browser's addEventListener() function.
   * Better use window.onscroll, element.onclick etc.
   * @param elem - DOM element to listen.
   * @param type - String - name of an event without 'on' prefix.
   * @param listener - listener function, accepts no parameters for now.
   * @return undefined.
   */
  utils.addEventListener = function (elem, type, listener) {
    if (elem.addEventListener) {
      elem.addEventListener("click", listener, false);
    }
    else {
      type = 'on' + type;
      elem.attachEvent("onclick", listener);
    }
  };

  /*
   * Adds CSS class to given element with no, single or multiple classes.
   * @param elem - DOM element to change.
   * @param classNam - String - name of class to add.
   * @return true if class added, false if there already was such class.
   */
  utils.addClass = function (elem, classNam) {
    var ret = false;
    if (elem.className.length) {
      var classes = elem.className.split(' ');
      var found = false;
      for (var i in classes) {
        if (classes[i] === classNam) {
          found = true;
          break;
        }
      }
      if (! found) {
        elem.className += ' ' + classNam;
        ret = true;
      }
    }else {
      elem.className = classNam;
      ret = true;
    }
    return ret;
  };
  /*
   * Removes CSS class of given element with no, single or multiple classes.
   * @param elem - DOM element to change.
   * @param classNam - String - name of class to add.
   * @return true if class removed, false if there was no such class.
   */
  utils.removeClass = function (elem, classNam) {
    var ret = false;
    if (! elem.className.length) { // if empty
      return false;
    }
    var classes = elem.className.split(' ');
    new_class = '';
    for (var i in classes) {
      if (classes[i] !== classNam) {
        new_class = new_class + classes[i] + ' ';
      }else { // filtered
        ret = true;
      }
    }
    if (ret) { // if filtered = removed
      // trim last space
      if (new_class.length) {
        new_class = new_class.slice(0, (new_class.length - 1));
      }
      elem.className = new_class;
    }
    return ret;
  };
  /*
   * Toggles CSS class of given element with no, single or multiple classes.
   * @param elem - DOM element to change.
   * @param classNam - String - name of class to toggle.
   * @return true if class set, false if class removed.
   */
  utils.toggleClass = function (elem, classNam) {
    var ret = true;
    if (elem.className.length) {
      var classes = elem.className.split(' ');
      var new_class = '';
      var found = false;
      for (var i in classes) {
        if (classes[i] !== classNam) { // filter out
          new_class = new_class + classes[i] + ' ';
        }else { // found - removed
          found = true;
        }
      }
      if (! found) { // not found - need to add
        elem.className += ' ' + classNam;
      }else { // found = filtered, get filter result
        if (new_class.length) {
          // trim last space added in cycle
          new_class = new_class.slice(0, (new_class.length - 1));
        }
        elem.className = new_class;
        ret = false;
      }
    }else {
      elem.className = classNam;
    }
    return ret;
  };

  /*
   * Calculates position in pixels of given element in a document.
   * @param element - element for which to calculate.
   * @return object with two number elements: offsetLeft, offsetTop.
   */
  utils.getOffsetPosition = function (element) {
    var offsetLeft = 0, offsetTop = 0;
    do {
      offsetLeft += element.offsetLeft;
      offsetTop += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    return {'offsetLeft': offsetLeft, 'offsetTop': offsetTop};
  };
  /*
   * Calculates positions of top point of given elements on the page.
   * @param elementIds - An array of element IDs to calculate their positions.
   * @return object with element ID strings as keys and offset number
   * in px as values.
   */
  utils.getYOffsets  = function(elementIds) {
    var ret = {};
    var el;
    for (var el_id in elementIds) {
      el = document.getElementById(elementIds[el_id]);
      ret[elementIds[el_id]] = utils.getOffsetPosition(el).offsetTop;
    }
    return ret;
  };
  /*
   * Get current window scroll position.
   * @return object of two elements: 'top' and 'bottom', containing numbers -
   * positions of window top and bottom respectively.
   */
  utils.getWindowOffset = function () {
    var pos = {};
    pos.top = 0;
    pos.bottom = 0;
    if (window.pageYOffset !== undefined) {
      pos.top = window.pageYOffset;
    }else if (document.documentElement.scrollTop) {
      pos.top = document.documentElement.scrollTop;
    }else if (document.body.parentNode.scrollTop) {
      pos.top = document.body.parentNode.scrollTop;
    }else if (document.body.scrollTop) {
      pos.top = document.body.scrollTop;
    }
    if (window.innerHeight) {
      pos.bottom = pos.top + window.innerHeight;
    }else {
      pos.bottom = pos.top + document.documentElement.clientHeight;
    }
    return pos;
  };

  return utils;
}());
