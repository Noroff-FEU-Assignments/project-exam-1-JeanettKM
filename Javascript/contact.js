const form = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subjectInput = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const messageInput = document.querySelector("#message");
const messageError = document.querySelector("#messageError");

form.addEventListener("submit", validateForm);

function validateForm(event) {
  event.preventDefault();

  let isValid = true;

  if (!checkLength(nameInput.value, 5)) {
    nameError.style.display = "block";
    isValid = false;
  } else {
    nameError.style.display = "none";
  }

  if (!validateEmail(emailInput.value)) {
    emailError.style.display = "block";
    isValid = false;
  } else {
    emailError.style.display = "none";
  }

  if (!checkLength(subjectInput.value, 15)) {
    subjectError.style.display = "block";
    isValid = false;
  } else {
    subjectError.style.display = "none";
  }

  if (!checkLength(messageInput.value, 25)) {
    messageError.style.display = "block";
    isValid = false;
  } else {
    messageError.style.display = "none";
  }

  if (isValid) {
    form.submit();
  }
}

function checkLength(value, len) {
  return value.trim().length >= len;
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
}

nameInput.addEventListener("input", () => {
  if (checkLength(nameInput.value, 5)) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }
});

emailInput.addEventListener("input", () => {
  if (validateEmail(emailInput.value)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }
});

subjectInput.addEventListener("input", () => {
  if (checkLength(subjectInput.value, 15)) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }
});

messageInput.addEventListener("input", () => {
  if (checkLength(messageInput.value, 25)) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }
});
