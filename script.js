// Assignment Code
const inputValue = document.getElementById("lengthInput");
const errMessageType = document.getElementById("errorMsgType");
const lowerChars = document.getElementById("lowercaseChars");
const upperChars = document.getElementById("uppercaseChars");
const specialChars = document.getElementById("specialChars");
const numericChars = document.getElementById("numericChars");
const form = document.getElementById("form");

// Get the modal by the element ID, in the HTML
const modal = document.getElementById("promptModal");

// Get the <span> element by ID that closes the modal (x) icon
const span = document.getElementById("close");

function promptUser() {
  form.reset();
  inputValue.value = 0;

  // We override the style for the Modal to display it
  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
    errMessageType.innerHTML = "";
    form.reset();
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      errMessageType.innerHTML = "";
      form.reset();
    }
  };

  // Listens to the button click
  // Passes the Event object which contains
  // all the necessary data that is in the form
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
  form.addEventListener("submit", submitBtnFunc);
}

function submitBtnFunc(event) {
  // We override the default form submission button behaviour; preventing
  event.preventDefault();

  // Jquery, we validate on button click
  // validation for the checkboxes
  $(document).ready(function () {
    $("#submit").click(function () {
      // we check the length here for how many boxes are checked
      checked = $("input[type=checkbox]:checked").length;
      if (!checked) {
        errMessageType.innerHTML = "Please check one of the boxes";
      } else {
        errMessageType.innerHTML = "";
        writePassword();
      }
    });
  });
}

// Write password to the #password input
function writePassword() {
  var password = "";
  var passwordText = document.querySelector("#password");

  var upperCase, lowerCase, numeric, specialChar;

  var allowed = {};

  // We check the checkboxes here to see which ones are checked
  // we then send it off as a Object because of how the package expects it
  // Math.Random is not a true random generator so we used a package

  if (upperChars.checked == true) {
    upperCase = rando((allowed.upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
  }
  if (lowerChars.checked == true) {
    lowerCase = rando((allowed.lowerCase = "abcdefghijklmnopqrstuvwxyz"));
  }
  if (numericChars.checked == true) {
    numeric = rando((allowed.numeric = "0123456789"));
  }
  if (specialChars.checked == true) {
    specialChar = rando((allowed.specialChars = "<>,;.:-_+#*!,$%&()"));
  }

  // We get the randomly generated password here from the package
  // as a string and assign it to the variable declared in the beginning

  for (i = 1; i <= inputValue.value; i++) {
    password += rando(rando(allowed).value);
  }

  // Remove any spaces in the password
  password = randoSequence(password).join("");
  passwordText.value = password;
  modal.style.display = "none";
}
