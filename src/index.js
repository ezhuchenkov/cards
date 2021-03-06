import '../images/logo.svg'
import '../images/close.svg'
import "./style.css";
import Api from "../js/Api";
import CardList from "../js/CardList";
import Popup from "../blocks/popup/Popup";



export const container = document.querySelector('.places-list');
export const popupImageContent = document.querySelector('#image');
export const popupImage = popupImageContent.querySelector('.popup__image');
export const profileName = document.querySelector('.user-info__name');
export const profileAbout = document.querySelector('.user-info__job');
export const avatar = document.querySelector('.user-info__photo');

export const api = new Api();
export const cardList = new CardList(container);
const popupNew = new Popup(document.querySelector('#new'));
const popupEdit = new Popup(document.querySelector('#edit'));
const popupAvatar = new Popup(document.querySelector('#avatar'));

api.getProfile();
/* Отлично:
* Здесь все происходит корректно.
* */


//обработчик на кнопке открывания формы добавления карточки
document.querySelector('.user-info__button').addEventListener('click', function (event) {
    popupNew.open(event);
});
//обработчик на кнопке открывания формы редактирования профиля
document.querySelector('.user-info__edit-button').addEventListener('click', function (event) {
    popupEdit.open(event);
});
//обработчик на кнопке открывания формы редактирования аватара
avatar.addEventListener('click', function (event) {
    popupAvatar.open(event);
});
//обработчик на кнопке закрывания popupImage
popupImageContent.querySelector('.popup__close').addEventListener('click', function (event) {
    popupImageContent.classList.remove('popup_is-opened')
});


/* Резюме по работе:
* Функционал работает корректно.
* Хочется похвалить вас за полностью выполненную работу - это очень круто, вы большой молодец.
* Все ошибки были исправлены, теперь функционал работает без багов и сюрпризов.
*
* То, что можно порефакторить и выделить - выделено в нижележащем резюме.
*
* Я желаю вам удачи на следующих спринтах, у вас все получится! :)
* Что можно почитать:
* По промисам: https://medium.com/web-standards/%D0%BE%D0%B1%D0%B5%D1%89%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B1%D1%83%D1%80%D0%B3%D0%B5%D1%80%D0%BD%D0%BE%D0%B9-%D0%B2%D0%B5%D1%87%D0%B5%D1%80%D0%B8%D0%BD%D0%BA%D0%B8-b0ed209809ab
*  https://davidwalsh.name/fetch
*  https://habr.com/ru/company/mailru/blog/269465/
*
* */

/* Резюме по работе:
* У вас просто отличная работа. Код корректно разбит по методам классов и изолирован внутри самих классов, инициализая скрипта - очень чистая.
* Запросы к серверу проводятся корректно, для запросов создан класс Api. Фетчи не содержат недостежимых участков кода, содержат необходимо условия и обработки.
*
* Работа очень хорошая.
*
* На что обратить внимание:
* В коде присутствуют обязательные к выполнению комментарии, все они касаются единственного момента - часть операций над DOM производится
* не в цепочке промисов, а выполняются отдельно. Что является не совсем корректным. Данные исправления необходимо выполнить впервую очередь.  ------------------------  ИСПРАВЛЕНО, спасибо

* Из-за такого добавления карточки происходит следующая проблема: при удалении свежедобавленной карточки - консоль падает с ошибкой, т.к карточка добавляется
* не в цепочке промисов, то теряется id'шник карточки, который возвращается в ответе сервера при ее отправке. Данный момент также необходимо исправить.------------------------  ИСПРАВЛЕНО, спасибо
*
* Что можно улучшить: ------------------------  Спасибо, сначала надо сдать работу, потом дорисую
*
*   Выделить пути до сервера в константы (Можно выделить одну общую константу, добавляя к ней обходимые пути)
*
*   Поработать над UI - блокировать кнопку во время отправки и разблокировать при добавлении, сигнализировать в кнопке о том, что запрос пользователя отправляется на сервер.
*
* Для успешной защиты необходимо выполнить исправления к 3 обязательным элементам
* */

/* Резюме по работе:
* Отлично, вы хорошо отрефакторили код - получилось супер.
* Работа принята, все работает корректно.
* На что стоит обратить внимание:
* На неиспользуемые параметры, передаваемые в функции:
* event в слушателе на .popup__close
* event в open/close popup.js
*
* В остальном - получилось супер
* */

/* Резюме по работе:
* В целом - хорошо.
* В коде даны комментарии к тем элементам, которые необходимо исправить.
* Для того, чтобы удалять обработчики событий при удалении карточки - воспользуйтесь .bind
* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
*
* Классы желательно выделить в отдельные файлы.
* */

/*

    Отлично! Теперь все работает как нужно

	На будущее при валидации можно ещё учесть пробелы в начале и конце
    вводимых данных. Сейчас в качестве данных можно ввести просто пробелы

*/
