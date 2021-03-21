(function () {
  const form = document.querySelector(".form");
  const send = document.querySelector(".form__submit");

  console.log(form);
  console.log(send);

  send.addEventListener("click", e => {
    e.preventDefault();
    if (validateForm(form)) {
      console.log("sending to server");
    } else {
      console.log("not sending")
    }
  });

  function validateForm(form) {
    console.log(form);
    let valid = true;

    if (!validateForm(form.element.name)){
      valid = false;
    }
  }

  function validate(element){
    if (!element.checkValidity()){
      element.nextElementSibling.textContent = element.validationMessage;
      element.style.border = "1px solid red";
      return false;
    } else {
      element.nextElementSibling.textContent = "";
      element.style.border = none;
    }

  }

})();