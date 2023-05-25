const form = document.querySelector("#contactForm");
const firstName = document.querySelector("#firstName");
const firstNameError = document.querySelector("#firstNameError");
const surName = document.querySelector("#surName");
const surNameError = document.querySelector("#surNameError");
const phone = document.querySelector("#phone");
const phoneError = document.querySelector("#phoneError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");


function validateForm (){
    event.preventDefault();

    if(checkLength(firstName.value, 1) === true) {
        firstNameError.style.display = "none";
    } else {
        firstNameError.style.display ="block";
    }

    if(checkLength(surName.value, 1) === true) {
        surNameError.style.display = "none";
    } else {
        surNameError.style.display ="block";
    }

    if(checkLength(phone.value, 7) === true) {
        phoneError.style.display = "none";
    } else {
        phoneError.style.display ="block";
    }

    if(validateEmail(email.value) === true) {
        emailError.style.display = "none";
    } else {
        emailError.style.display ="block";
    }
}

form.addEventListener("submit", validateForm)

function checkLength(value, len) {

    if(value.trim().length > len) {
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