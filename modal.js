function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = "none";
  document.body.style.overflow = "";
}

function openModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function modal(triggerSelector, modalSelector) {
  const modal = document.querySelector(modalSelector),
        modalTrigger = document.querySelectorAll(triggerSelector);

  modalTrigger.forEach((item) => {
    item.addEventListener('click', () => openModal(modalSelector));
  });

  modal.addEventListener('click', (evt) => {
    if (evt.target == modal || evt.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.code === "Escape" && modal.style.display == "block") {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {closeModal};
export {openModal};