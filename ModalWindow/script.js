'use strict';
const btnsOpenModal = document.querySelectorAll('.show-modal');
const btnCloseModal = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

//removes hidden classes and shows the modal
function showModal() {
  modal.classList.remove(`hidden`);
  overlay.classList.remove(`hidden`);
}

//adds hidden classes and hides the modal
function hideModal() {
  modal.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
}

//event listener for the show modal buttons
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', showModal);
}

//event listener for the cross button
btnCloseModal.addEventListener('click', hideModal);

//event listener for the overlay
overlay.addEventListener('click', hideModal);

//event listener for escape key
//if pressed key is escape and the modal is not hidden  ==> hide
document.addEventListener('keydown', function (e) {
  if (e.code === 'Escape' && !modal.classList.contains('hidden')) hideModal();
});
