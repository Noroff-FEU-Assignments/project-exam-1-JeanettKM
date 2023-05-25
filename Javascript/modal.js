function openModal(event) {
    const modalContainer = document.getElementById('modalContainer');
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    const modalImage = document.createElement('img');
    modalImage.src = event.target.src;
    modalContent.appendChild(modalImage);
    modalContainer.appendChild(modalContent);
    modalContainer.style.display = 'flex';
  
    // Add event listener to hide modal when clicking outside the image
    modalContainer.addEventListener('click', closeModal);
  }
  
  function closeModal(event) {
    if (event.target === this) {
      this.style.display = 'none';
      this.innerHTML = ''; // Clear the modal content
    }
  }
  
  // Add event listeners to the images
  const images = document.querySelectorAll('.blogSpecific img');
  images.forEach(image => {
    image.addEventListener('click', openModal);
  });
  