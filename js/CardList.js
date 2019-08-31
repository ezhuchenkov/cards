import Card from "./Card";
import {api} from "../src/index"

export default class CardList {
    constructor(container) {
        this.container = container;
        this.cards = [];
        this.render();
    }
    // В комментариях надо описать какие параметры которые принимает функция и за что они отвечают
    // особенно "id"
    addCard(cardName, cardLink,id,ownerId,likesCount,isLike) {
        const { cardElement } = new Card(cardName, cardLink,id,ownerId,likesCount,isLike);
        this.cards.push(cardElement);
    }
    render() {
        /* Отлично:
        * Здесь все супер, все дом операции находятся внутри метода Api
        * */
        api.getInitialCards()
    }
}
