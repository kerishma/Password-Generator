// Assignment Code
const generateBtn = document.querySelector("#generate");
const nextBtn = document.getElementById("continueProcess");
const continueBtn = document.getElementById("continueBtn");
const inputValue = document.getElementById("lengthInput");
const errMessageLength = document.getElementById("errorMsgLength");
const errMessageType = document.getElementById("errorMsgType");
const lowerChars = document.getElementById("lowercaseChars");
const upperChars = document.getElementById("uppercaseChars");
const specialChars = document.getElementById("specialChars");
const numericChars = document.getElementById("numericChars");
const passwordLength =
  "Please choose or enter the length of the password (8 to 128 characters)";
const passwordCharacter =
  "Please choose from the following characters to include in the password";

// Get the modal by the element ID, in the HTML
const modal = document.getElementById("promptModal");

// Get the character types prompt by ID, in the HTML
const charTypes = document.getElementById("charTypePrompt");

// Get the <span> element by ID that closes the modal (x) icon
const span = document.getElementById("close");

// Write password to the #password input
function writePassword() {
  var password = "";
  var passwordText = document.querySelector("#password");

  var upperCase, lowerCase, numeric, specialChar;

  var allowed = {};

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

  for (i = 1; i <= inputValue.value; i++) {
    password += rando(rando(allowed).value);
  }

  password = randoSequence(password).join("");
  passwordText.value = password;
  modal.style.display = "none";
}

function cancelProcess() {
  resetFields();
  continueBtn.disabled = true;
  charTypes.style.display = "none";
  continueBtn.innerHTML = "Next";
  modal.style.display = "none";
}

function resetFields() {
  charTypes.style.display = "none";
  continueBtn.innerHTML = "Next";
  errMessageLength.innerHTML = "";
  inputValue.value = "";
  errMessageType.innerHTML = "";
}

function continueProcess(e) {
  charTypes.style.display = "block";
  continueBtn.disabled = true;
  continueBtn.innerHTML = "Generate Password!";
  if (
    document.querySelectorAll('input[type="checkbox"]:checked').length === 0
  ) {
    errMessageType.innerHTML = "Please check one of the boxes";
  } else {
    errMessageType.innerHTML = "";
    continueBtn.disabled = false;
    continueBtn.onclick = function () {
      writePassword();
    };
  }
}

function validateLength(e) {
  const val = e.target.value;
  if (val < 8 || val > 128) {
    continueBtn.disabled = true;
    errMessageLength.innerHTML = "Please correct the amount";
  } else {
    errMessageLength.innerHTML = "";
    continueBtn.disabled = false;
  }
}

function promptUser() {
  // We override the style for the Modal to display it
  modal.style.display = "block";
  document.getElementById("passwordPrompt").innerHTML = passwordLength;

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      cancelProcess();
      resetFields();
      modal.style.display = "none";
    }
  };

  inputValue.addEventListener("input", validateLength);

  document.querySelector("#charTypePrompt").onclick = function (event) {
    continueProcess(event);
  };
}
