import {api} from "../src/index"
import {container} from "../src/index"
import {popupImageContent} from "../src/index"
import {popupImage} from "../src/index"
// Рекомендую описывать что делает класс, это поможет разобраться в коде в будущем
export default class Card {
    constructor(cardName, cardLink, id, ownerId, likesCount, isLike) {
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.open = this.open.bind(this);
        this.cardItem = this.create(cardName, cardLink, id, ownerId, likesCount, isLike);

    }


    like(event) {
        if (event.target.classList.contains('place-card__like-icon_liked')) {
            api.unlike(event)
        } else {
            api.like(event)
        }
    }



    remove(event) {
        if (event.target.classList.contains('place-card__delete-icon')) {
            if (confirm("Вы уверены, что хотите удалить эту карточку?")) {
                api.removeCard(event);
                this.removeListeners();
                /* Надо исправить:
                * Карточка удаляется не совсем корректным способом. Операция над ее удалением из DOM никаким образом не связана с запросом, который мы отправляем на сервер.
                * Необходимо манипуляции такого рода производить внутри цепочки промисов. Данные функции можно передать в class Api как коллбэки,
                * либо просто объявить в цепочке промисов.
                *
                * ИСПРАВЛЕНО, спасибо
                *
                * Операции надо DOM должны быть "вплетены" в цепочку промисов.
                * */
                // } else {
                //   return
                // }
                /* Можно лучше:
                * Данный return является лишним.

                 ИСПРАВЛЕНО, спасибо
                * */
            }
        }
    }
    removeListeners() {
        this.cardItem.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
        this.cardItem.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
        this.cardItem.querySelector('.place-card__image').removeEventListener('click', this.open);
    }
    // что создаёт этот метод? Название метода ни о чём мне не говорит, я рекомендую добавить комментарий, для понимая
    create(cardNameValue, cardLinkValue, id, ownerId, likesCount, isLike) {
        const cardItem = document.createElement('div');
        const cardImage = document.createElement('div');
        const deleteButton = document.createElement('button');
        const cardDescription = document.createElement('div');
        const name = document.createElement('h3');
        const likeArea = document.createElement('div');
        const likeButton = document.createElement('button');
        const likeCounter = document.createElement('h4')
        const popupNewCard = document.querySelector('#new');
        const addCardButton = popupNewCard.querySelector('.popup__button');

        cardItem.classList.add('place-card');
        cardItem.id = id;
        container.appendChild(cardItem);
        cardImage.classList.add('place-card__image');
        cardImage.style = 'background-image: url(' + cardLinkValue + ')';
        cardItem.appendChild(cardImage);
        // 'd222ddcaf61e8c17e842a42c' надо вынести отдельно в константу
        if (ownerId === 'd222ddcaf61e8c17e842a42c') {
            deleteButton.classList.add('place-card__delete-icon');
            cardImage.appendChild(deleteButton);
        }
        cardDescription.classList.add('place-card__description');
        cardItem.appendChild(cardDescription);
        name.classList.add('place-card__name');
        name.textContent = cardNameValue;
        cardDescription.appendChild(name);
        likeArea.classList.add('place-card__like-area');
        cardDescription.appendChild(likeArea);
        likeButton.classList.add('place-card__like-icon');
        if (isLike) {
            likeButton.classList.add('place-card__like-icon_liked');
        }
        likeArea.appendChild(likeButton);
        likeCounter.classList.add('place-card__like-counter');
        likeCounter.textContent = likesCount;
        likeArea.appendChild(likeCounter);
        addCardButton.setAttribute('disabled', true);
        addCardButton.classList.add('popup__button_disabled');

        likeButton.addEventListener('click', this.like)
        deleteButton.addEventListener('click', this.remove)
        cardImage.addEventListener('click', this.open)
        /*
        * Отлично! Тело функции логично организовано и легко читается
        */
        return cardItem;
    }
    // За что отвечает этот метод, нет понимания. 
    open(event) {
        if (event.target.classList.contains('place-card__image')) {
            popupImageContent.classList.add('popup_is-opened');
            popupImage.src = event.target.style.backgroundImage.slice(5, -2);
        }
    }
}
