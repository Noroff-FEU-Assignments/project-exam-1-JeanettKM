function openModal(event) {
  const modalContainer = document.getElementById('modalContainer');
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  const modalImage = document.createElement('img');
  modalImage.src = event.target.src;
  modalContent.appendChild(modalImage);
  modalContainer.appendChild(modalContent);
  modalContainer.style.display = 'flex';

  modalContainer.addEventListener('click', closeModal);
}

function closeModal(event) {
  if (event.target === this) {
    this.style.display = 'none';
    this.innerHTML = '';
  }
}

const images = document.querySelectorAll('.blogSpecific img');
images.forEach(function(image) {
  image.addEventListener('click', openModal);
});
