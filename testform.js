const form = document.querySelector("#contactForm");
const userName = document.querySelector("#userName");
const userNameError = document.querySelector("#userNameError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");

function validateForm() {
    event.preventDefault();

if (checkLength(userName.value, 5) === true) {
    userNameError.style.display = "none";
} else {
    userNameError.style.display = "block";
}


if (checkLength(subject.value, 15) === true) {
    subjectError.style.display = "none";
} else {
    subjectError.style.display = "block";
}

if (checkLength(message.value, 25) === true) {
    messageError.style.display = "none";
} else {
    messageError.style.display = "block";
}

if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
} else {
    emailError.style.display = "block";
}


    console.log("hello");
}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}


function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
  }
  