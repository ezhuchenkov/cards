import { cardList } from "../src/index"
import { profileName } from "../src/index"
import { profileAbout } from "../src/index"
import { avatar } from "../src/index"
import { container } from "../src/index"
import { url, authorization } from "./config"

export default class Api {


    getInitialCards() {
        fetch(`${url}/cards`, {
            headers: {
                authorization: authorization
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                const check = function (element) {
                    return element._id === 'd222ddcaf61e8c17e842a42c';
                };
                for (let i = 0; i < result.length; i++) {
                    const isLike = result[i].likes.some(check);
                    cardList.addCard(result[i].name, result[i].link, result[i]._id,
                        result[i].owner._id, result[i].likes.length, isLike)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getProfile() {
        fetch(`${url}/users/me`, {
            headers: {
                authorization: authorization
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                profileName.textContent = result.name;
                profileAbout.textContent = result.about;
                avatar.style = 'background-image: url(' + result.avatar + ')'
            })
            .catch((err) => {
                console.log(err);
            });
    }

    setProfile(firstInput, secondInput) {
        return fetch(`${url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: firstInput,
                about: secondInput
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                profileName.textContent = result.name;
                profileAbout.textContent = result.about;
            }
            )
            .catch((err) => {
                console.log(err);
            });
    }

    setAvatar(firstInput) {
        return fetch(`${url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: firstInput
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                avatar.style = 'background-image: url(' + result.avatar + ')'
            }
            )
            .catch((err) => {
                console.log(err);
            });
    }

    postCard(firstInput, secondInput) {
        fetch(`${url}/cards`, {
            method: 'POST',
            headers: {
                authorization: authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: firstInput,
                link: secondInput
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                cardList.addCard(result.name, result.link, result._id,
                    result.owner._id, result.likes.length)
            }
            )
            .catch((err) => {
                console.log(err);
            });
    }

    removeCard(event) {

        return fetch(`${url}/cards/${event.currentTarget.closest('.place-card').id}`, {
            method: 'DELETE',
            headers: {
                authorization: authorization,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(container.removeChild(event.target.closest('.place-card')))
            .catch((err) => {
                console.log(err);
            });
    }

    like(event) {

        return fetch(`${url}/cards/like/${event.currentTarget.closest('.place-card').id}`, {
            method: 'PUT',
            headers: {
                authorization: authorization,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                event.target.nextSibling.textContent = result.likes.length;
                event.target.classList.add('place-card__like-icon_liked');
            }
            )
            .catch((err) => {
                console.log(err);
            });
    }

    unlike(event) {

        return fetch(`${url}/cards/like/${event.currentTarget.closest('.place-card').id}`, {
            method: 'DELETE',
            headers: {
                authorization: authorization,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                event.target.nextSibling.textContent = result.likes.length;
                event.target.classList.remove('place-card__like-icon_liked');
            })
            .catch((err) => {
                console.log(err);
            });
    }

}

/**
 * Хорошо оршанизован код
 *
 * Необходимо вынести адресса  praktikum.tk в отдельную переменную. В больших проектах таких адресов может быть тысяча и лучше их менять в одном месте
  ИСПРАВЛЕНО, спасибо. Сделана проверка на хост.

 * Необходимо доработать README.md Нет описания того как необходимо собрать проект, какие библиотеки используеются, какие действия необходимы
 ИСПРАВЛЕНО, спасибо

 * Поэтаптно расписать каждое действие по пунктам(Не для чего а как сделать).
ИСПРАВЛЕНО, спасибо

 * Большие проекты на серверах поддерживают люди которые не знают что такое babel, webpack и так далее
 ИСПРАВЛЕНО, спасибо

 * Необходимо добавить комментарии, где это необходимо. Представьте, что вы вернётесь к вашему проекту через 5 лет.
 ИСПРАВЛЕНО, спасибо

 * Ключи авторизации необходимо вынести в отдельный конфиг
 * ИСПРАВЛЕНО, спасибо
 *
 * Рекомендую почитать кодстайл https://learn.javascript.ru/coding-style
 * В ветке master ничего не программируют, обычно делают отдельную ветку и её вливают в мастер.
 * У вас я заметил несколько коммитов в мастере.
 *
 *
 */


