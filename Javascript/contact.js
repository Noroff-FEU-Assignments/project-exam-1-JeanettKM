function validateForm(event) {
    event.preventDefault(); // Prevent form submission
  
    // Reset error messages
    const errorElements = document.getElementsByClassName('error');
    for (let i = 0; i < errorElements.length; i++) {
      errorElements[i].textContent = '';
    }
  
    // Get form inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const message
}