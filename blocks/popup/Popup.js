import {api} from "../../src/index"

export default class Popup {
    constructor(popupID) {
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.popupID = popupID;
        this.popupClose = popupID.querySelector('.popup__close');

        const popupName = this.popupID.id;
        this.popupNewForm = document.forms[popupName];
        this.firstInput = this.popupNewForm.elements[0];
        this.secondInput = this.popupNewForm.elements[1];
        this.submitButton = this.popupNewForm.querySelector('.popup__button');
    }
    open() {
        this.popupID.classList.add('popup_is-opened');
        this.popupClose.addEventListener('click', this.close);
        this.submitButton.addEventListener('click', this.submit);
        this.popupID.addEventListener('input', this.handleValidate);
    }
    close() {
        this.popupID.classList.remove('popup_is-opened');
        this.popupClose.removeEventListener('click', this.close);
    }
    submit(event) {

        if (this.popupID.id === 'new' && this.firstInput.value !== 0 && this.secondInput.value !== 0) {
            api.postCard(this.firstInput.value, this.secondInput.value);

        } else if (this.popupID.id === 'edit' && this.firstInput.value !== 0 && this.secondInput.value !== 0) {
            api.setProfile(this.firstInput.value, this.secondInput.value);
        }else if(this.popupID.id === 'avatar' && this.firstInput.value !== 0){
            api.setAvatar(this.firstInput.value);
        }
        this.popupNewForm.reset;
        this.popupID.classList.remove('popup_is-opened');
        event.returnValue = false;
    }
    handleValidate() {
        this.validate(this.firstInput);
        if (this.secondInput.classList.contains('popup__button')){
            return
        }else{
            this.validate(this.secondInput)};
    }
    validate(element) {
        const errorElement = document.querySelector(`#error-${element.name}`);
        let message;
        if (element.validity.valueMissing || element.value.length === 0) {
            message = 'Это обязательное поле';
            errorElement.textContent = message;
        } else if (element.validity.tooShort) {
            message = 'Должно быть от 2 до 30 символов';
            errorElement.textContent = message;
        } else if (element.validity.typeMismatch) {
            message = 'Здесь должна быть ссылка';
            errorElement.textContent = message;
        }
        if (message) {
            element.classList.add('popup__input-error');
            element.classList.remove('popup__input');
            errorElement.textContent = message;
            this.submitButton.setAttribute('disabled', true);
            this.submitButton.classList.add('popup__button_disabled');
        } else {
            errorElement.textContent = '';
            element.classList.add('popup__input');
            element.classList.remove('popup__input-error');
            this.submitButton.removeAttribute('disabled');
            this.submitButton.classList.remove('popup__button_disabled');
        }
    }
}

