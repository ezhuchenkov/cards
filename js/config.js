export let url;
export const authorization = 'aaa4dd3c-2466-4899-868d-28594a970f06'
// 'localhost:8080' - лучше вынести отдельно в константу
if (window.location.host === 'localhost:8080') {
    url = 'http://praktikum.tk/cohort1';
} else {
    url = 'https://praktikum.tk/cohort1';
}