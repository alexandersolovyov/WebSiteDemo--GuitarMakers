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
   * Reliable function for adding event listeners.
   * (Works also on IE8)
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
   * Toggles class of given element with multiple classes.
   * @param elem - DOM element to change.
   * @param classNam - String - name of class to toggle.
   * @return true if class set, false if class removed.
   */
    utils.toggleClass = function (elem, classNam) {
    var i;
    var classes = elem.className.split(' ');
    var new_class = '';
    ret = false;
    if (elem.className.indexOf(classNam) < 0) { // add class
      new_class = elem.className;
      new_class = new_class + ' ' + classNam;
      ret = true;
    }else { // remove class
      for (i in classes) {
        if (classes[i] !== classNam) {
          new_class = new_class + classes[i] + ' ';
        }
      }
    }
    elem.className = new_class;
    return ret;
  };

  return utils;
}());
