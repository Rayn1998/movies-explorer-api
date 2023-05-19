const modelLinkPattern = /^(ftp|http|https):\/\/[^ "]+$/;
// const linkPattern = /^(ftp|http|https):\/\/[^"]+\.\w{2,}/;
const linkPattern = /[a-zA-A0-9_]+\.\w{2,}/;
const modelEmailPatter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// MESSAGES
const serverErrorMsg = 'На сервере произошла ошибка';
const unauthorizedUserMsg = 'Пользователь не авторизован';
const emailPasswordIncorrectMsg = 'Неправильные почта или пароль';
const sameEmailMsg = 'Пользователь с таким email уже зарегистрирован';
const incorrectDataMsg = 'Введены некорректные данные';
const pageNotFoundMsg = 'Страница не найдена';
const sameMovieMsg = 'Такой фильм уже есть';
const filmNotFoundMsg = 'Фильм не найден';
const cantDeleteOtherUserMovieMsg = 'Вы не можете удалить фильм другого пользователя';
const movieDeletedMsg = 'Фильм удалён';
const incorrectMovieIdMsg = 'Введён некорректный id фильма';

// SCHEMA MESSAGES
const linkIncorrectMsg = 'link is incorrect';
const emailIncorrectMsg = 'email is incorrect';

// =================
module.exports = {
  modelLinkPattern,
  linkPattern,
  modelEmailPatter,
  serverErrorMsg,
  unauthorizedUserMsg,
  emailPasswordIncorrectMsg,
  sameEmailMsg,
  pageNotFoundMsg,
  incorrectDataMsg,
  linkIncorrectMsg,
  emailIncorrectMsg,
  sameMovieMsg,
  filmNotFoundMsg,
  cantDeleteOtherUserMovieMsg,
  movieDeletedMsg,
  incorrectMovieIdMsg,
};
