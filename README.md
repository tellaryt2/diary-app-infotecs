# DiaryApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.10.

## Запуск приложения

+ Для запуска приложения необходимо иметь nodeJs, а так же установленные пакеты angular, если нету: `npm install -g @angular/cli`.
+ Склонировать репозиторий на локальную машину
+ установить пакеты npm в папку репозитория `npm install`
+ Запустить приложение: `ng serve`, перейти по адресу: `http://localhost:4200/`

## Реализованные цели

+ Отображение списка всех записок дневника
+ Форматирование текста
+ Добавление, удаление и редактирование записок
+ Сортировка заметок
+ Машрутизация по приложению
+ Прикрепление изображений к запискам с помощью библиотеки primeNg

## О приложении

Веб-приложение "личный дневник". Позволяет создавать личные записки. Изначально в приложении есть только кнопка "создать", при нажатии происходит
переход на страницу добавления записки. У самой записки есть: данные о времени создания, текст записки, возможность удалить или редактировать ее,
возможность прикрепить изображение к ней. При редактировании происходит переход на страницу редактирования, где можно изменить текст записки. При
добавлении картинки, открывается проводник операционной системы для выбора изображения. Данные сохраняются при перезаходе, так как они хранятся
в localstorage браузера.
