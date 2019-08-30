import {cardList} from "../src/index"
import {profileName} from "../src/index"
import {profileAbout} from "../src/index"
import {avatar} from "../src/index"
import {container} from "../src/index"

export default class Api {
   buildChecker(){
    let url;

    if (NODE_ENV === 'production') {
        url = 'https://95.216.175.5/cohort1';
    } else {
        url = 'http://95.216.175.5/cohort1';
    }
    return url;
   }

    

    getInitialCards() {
        buildChecker();
        console.log(url)
        fetch('https://praktikum.tk/cohort1/cards', {
            headers: {
                authorization: 'aaa4dd3c-2466-4899-868d-28594a970f06'
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
        fetch('https://praktikum.tk/cohort1/users/me', {
            headers: {
                authorization: 'aaa4dd3c-2466-4899-868d-28594a970f06'
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
        return fetch('https://praktikum.tk/cohort1/users/me', {
            method: 'PATCH',
            headers: {
                authorization: 'aaa4dd3c-2466-4899-868d-28594a970f06',
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
        return fetch('https://praktikum.tk/cohort1/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: 'aaa4dd3c-2466-4899-868d-28594a970f06',
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
        fetch('https://praktikum.tk/cohort1/cards', {
            method: 'POST',
            headers: {
                authorization: 'aaa4dd3c-2466-4899-868d-28594a970f06',
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

        return fetch(`https://praktikum.tk/cohort1/cards/${event.currentTarget.closest('.place-card').id}`, {
            method: 'DELETE',
            headers: {
                authorization: 'aaa4dd3c-2466-4899-868d-28594a970f06',
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

        return fetch(`https://praktikum.tk/cohort1/cards/like/${event.currentTarget.closest('.place-card').id}`, {
            method: 'PUT',
            headers: {
                authorization: 'aaa4dd3c-2466-4899-868d-28594a970f06',
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

        return fetch(`https://praktikum.tk/cohort1/cards/like/${event.currentTarget.closest('.place-card').id}`, {
            method: 'DELETE',
            headers: {
                authorization: 'aaa4dd3c-2466-4899-868d-28594a970f06',
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



