const form = document.querySelector("form");
const username = document.getElementById("username");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPass = document.getElementById("confirm-password");
const confirm = document.querySelector(".form-message");
const showPass = document.querySelector(".fa");

// Checking erorr in form
function showError(input, message) {
  const formValidate = input.parentElement;
  formValidate.className = "form-row error";
  const span = formValidate.querySelector("span");
  span.innerText = message;
}

function showSuccess(input) {
  const formValidate = input.parentElement;
  formValidate.className = "form-row success";
}

function reset(e) {
  const formreset = e.target.parentElement;
  formreset.className = "form-row";
}

//Check if email is valid
function checkValid(input) {
  const re = /\S+@\S+\.\S+/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, "Email is not valid");
    return false;
  }
}

// Get input lenght
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getUpper(input)} must be at least ${min} characters`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `${getUpper(input)} must be less than ${max} characters`);
    return false;
  } else {
    if (input === password) {
      showSuccess(input);
      return true;
    } else {
      if (!/(^[a-z]{3,})|(^[a-z]{3,}[a-z]+)/i.test(input.value)) {
        showError(input, `${getUpper(input)} must not contain whitespace`);
      } else {
        showSuccess(input);
        return true;
      }
    }
  }
}

// Get upper case
function getUpper(input) {
  let first, second, position;
  if (input.id.includes("first") || input.id.includes("last")) {
    position = input.id.indexOf("name");
    first = input.id.slice(0, position);
    second = input.id.substring(position);
    return (
      first.charAt(0).toUpperCase() +
      first.slice(1) +
      " " +
      second.charAt(0).toUpperCase() +
      second.slice(1)
    );
  } else {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }
}

// Check password match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== "") {
    if (input1.value !== input2.value) {
      showError(input2, "Passwords do not match");
      return false;
    } else {
      showSuccess(input2);
      return true;
    }
  }
}

function resetAll(block) {
  block.forEach((item) => {
    const formreset = item.parentElement;
    formreset.className = "form-row";
  });
}
// Blur calls
username.addEventListener("blur", () => {
  checkLength(username, 3, 15);
});
firstname.addEventListener("blur", () => {
  checkLength(firstname, 3, 10);
});
lastname.addEventListener("blur", () => {
  checkLength(lastname, 3, 12);
});
email.addEventListener("blur", () => {
  checkValid(email);
});
password.addEventListener("blur", () => {
  checkLength(password, 6, 20);
});
confirmPass.addEventListener("blur", () => {
  checkPasswordsMatch(password, confirmPass);
});

//Focus calls
username.addEventListener("focus", (e) => {
  reset(e);
});
firstname.addEventListener("focus", (e) => {
  reset(e);
});
lastname.addEventListener("focus", (e) => {
  reset(e);
});
password.addEventListener("focus", (e) => {
  reset(e);
});
confirmPass.addEventListener("focus", (e) => {
  reset(e);
});

showPass.addEventListener("click", (e) => {
  let el, elNext;
  el = e.target;
  elNext = el.nextSibling;
  elNext2 = elNext.nextSibling;
  elNext3 = elNext2.nextSibling;
  elNext4 = elNext3.nextSibling;
  if (elNext2.type === "password") {
    elNext2.type = "text";
  } else {
    elNext2.type = "password";
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let items = [username, firstname, lastname, email, password, confirmPass];
  if (
    checkLength(username, 3, 15) &&
    checkLength(firstname, 3, 10) &&
    checkLength(lastname, 3, 12) &&
    checkValid(email) &&
    checkLength(password, 6, 20) &&
    checkPasswordsMatch(password, confirmPass)
  ) {
    confirm.textContent = "Your registration was successful";
    form.reset();
    resetAll(items);
  } else {
    confirm.textContent = "There was an error in your registration";
    form.reset();
    resetAll(items);
  }
});
