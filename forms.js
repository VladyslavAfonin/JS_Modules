import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector) {
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо, скоро мы с Вами свяжемся!",
    failure: "Что-то пошло не так..."
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
    `;

      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(message.failure);
        }).finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const previousModalDialog = document.querySelector('.modal__dialog');

    previousModalDialog.style.display = "none";
    openModal('.modal');

    const thanksModal = document.createElement("div");
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class = "modal__content">
      <div class = "modal__close" data-close>×</div>
      <div class = "modal__title">${message}</div>
    </div>
  `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      previousModalDialog.style.display = "block";
      closeModal('.modal');
    }, 5000);
  }

}

export default forms;