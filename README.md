# GuitarMakers - тренировочный сайт

Сайт создан с целью повышения навыков создания сайтов. Результат можно
посмотреть по
[этой ссылке](https://raw.githack.com/alexandersolovyov/WebSiteDemo--GuitarMakers/dist_2/dist/index.html).

Это полностью завершённый сайт-визитка, но есть несколько нюансов:

- Адреса и телефоны на сайте не настоящие.
- Кнопка отправки сообщения ничего никуда не отправляет.
- Демонстрационный видео ролик на самом деле не имеет отношения к организации,
  которой принадлежит сайт, ведь такой организации не существует. Поэтому
  текст комментария изменён так, что он больше похож на обещание чем на
  комментарий к демонстрации.

## Легенда технического задания

По легенде сайт заказан небольшой мастерской по изготовлению гитар. Нужно было
сделать сайт-визитку "под ключ", то есть дизайн и вёрстку. (Так как это не
настоящий сайт, установка на сервер упущена.) Сайт должен хорошо отображаться на
самом широком диапазоне устройств и браузеров: в том числе iPhone начиная с
версии 4 (браузер Safari 7.1) и браузер Internet Explorer начиная с версии 8.

## О процессе разработки

Было решено делать "дизайн в браузере". То есть сначала делается макет страниц
(в текущем проекте GIT он отсутствует), согласуется с заказчиком, после чего
сразу начинается вёрстка. Цвета и шрифты подбираются в процессе вёрстки. Также
делаются некоторые небольшие правки в расположении элементов, особенно в
зависимости от размеров экрана целевых устройств.

Так как сайт должен работать в браузере Internet Explorer 8, который не
поддерживает правило `@media`, вёрстка была сделана сначала для него,
подразумевая разрешение экрана от 800x600 до 1320x742 точек. После
этого с помощью правил `@media` страница адаптировалась под экраны
больших и меньших размеров.

Учтено, что пользователи иногда отключают выполнение JavaScript в браузере.
Сначала страница сделана полностью работоспособной с использованием только HTML
и CSS, после чего добавлен JavaScript. Так как используется стандарт HTML5,
*только в Internet Explorer 8* страница не отображается правильно если отключено
выполнение скриптов.

## Использованные технологии и инструменты

Сайт создан на *HTML5*, *CSS3* и "чистом" *JavaScript* без использования внешних
библиотек. Для отображения частей страниц в виде слайдов использованы CSS
элементы Flex. Вообще на сайте преобладают более старые способы расположения
элементов, совместимые с Internet Explorer 8.

Для отображения иконок использован специальный шрифт.

Использованы два варианта загрузки шрифтов:

- Основные шрифты загружаются с помощью сервиса *Google Fonts*.
- Шрифт иконок создан с помощью сервиса *Fontello* и загружается с сервера,
  на котором расположен сайт.

Изображение, используемое на сайте, предоставлено в двух размерах - для разных
размеров экранов устройств, - и сжато с помощью утилиты *imagemin*.

Для облегчения создания стилей использован препроцессор *SCSS*. Сборка сайта
автоматизирована с помощью *Gulp* с различными плагинами.

К изображению гитары на главном изображении ("hero image") применены градиенты с
помощью программы *Inkscape*.

## Выводы и польза для изучения

- Был сделан вывод, что дизайн в браузере - не самая лучшая идея. Если
  использовать графические редакторы, как Photoshop или Inkscape, или ещё лучше
  онлайн-редактор Figma, процесс разработки будет быстрее.
- Изучены основы использования Gulp для автоматизации веб-разработки.
- Улучшены навыки работы с GIT.
- Улучшены общие навыки создания сайтов.
