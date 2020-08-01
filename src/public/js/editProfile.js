/* Regex separation for dynamic validation. */
const totalLength = /.{8,30}/g;
const minimumNumbers = /[0-9]/g;
const minimunLowerANDUpperCaseCharacters = /(?=.*[a-z])(?=.*[A-Z])/g;
const minimumSymbols = /(?=.*?[#?!@$€%&*\-+.,])/g;

/* Button for sending the data. */
const submitButton = document.querySelector('.form__submitButton--middle');

/* Original regex separated. */
/* Function for checking the final passwords in both password inputs. */
function checkPassword() {
	//Pattern creation. Minimum 8 characters, 1 UpperCase, 1 lowercase, 1 number and 1 of the indicated symbols.
	const fullPasswordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.{1,}?[0-9])(?=.*?[#?!@$€%&*\-+.,]).{8,30}$/g;

	//Store the password in a private const and remove the whitespaces.
	const superSecretPassword = document.querySelector('#inputCurrentPassword').value.replace(/\s/g, '');

	/* If the user password matchs the regex and both passwords are the same it returns true. */
	if (superSecretPassword.match(fullPasswordPattern) && comparePasswords()) {
		console.log('Both passwords are valid and identical.');
		return true;
	} else {
		/* If the user entered nothing at the password input the web doesn't ask him to enter data since he doesn't want to change his password. */
		if (superSecretPassword === '') {
			return false;
		}
		/* In case the passwords aren't valid or identical */
		console.error('Check the passwords introduced in both inputs.');
		clearInput();
		return false;
	}
}

/* Function called every time the user introduces an invalid password, it clears the validation buttons and password inputs */
function clearInput() {
	const firstValidation = document.querySelector('.form__validation--first');
	const secondValidation = document.querySelector('.form__validation--second');
	const thirdValidation = document.querySelector('.form__validation--third');
	const fourthValidation = document.querySelector('.form__validation--fourth');
	const fifthValidation = document.querySelector('.form__validation--fifth');

	firstValidation.classList.remove('form__validation--greenCircle--first');
	secondValidation.classList.remove('form__validation--greenCircle--second');
	thirdValidation.classList.remove('form__validation--greenCircle--third');
	fourthValidation.classList.remove('form__validation--greenCircle--fourth');
	fifthValidation.classList.remove('form__validation--greenCircle--fifth');

	document.getElementById('inputCurrentPassword').value = '';
	document.getElementById('inputNewPassword').value = '';
	document.getElementById('inputCurrentPassword').focus();
}

/* Selectors for both password inputs */
const dynamicValidation = document.querySelector('#inputCurrentPassword');
const dynamicValidationNewPassword = document.querySelector('#inputNewPassword');

/* Password dynamic validation. Explanation of each functionality inside: */
function validatePassword() {
	const firstValidationButton = document.querySelector('.form__validation--first');
	const secondValidationButton = document.querySelector('.form__validation--second');
	const thirdValidationButton = document.querySelector('.form__validation--third');
	const fourthValidationButton = document.querySelector('.form__validation--fourth');

	/* Highlight (OR unhighlight) the FIRST button if the password has 8 characters (OR less than 8 characters). */
	if (dynamicValidation.value.replace(/\s/g, '').match(totalLength)) {
		firstValidationButton.classList.add('form__validation--greenCircle--first');
	} else if (!dynamicValidation.value.replace(/\s/g, '').match(totalLength)) {
		firstValidationButton.classList.remove('form__validation--greenCircle--first');
	}

	/* Highlight (OR unhighlight) the SECOND button if the password has 1 number (OR less than 1 number). */
	if (dynamicValidation.value.replace(/\s/g, '').match(minimumNumbers)) {
		secondValidationButton.classList.add('form__validation--greenCircle--second');
	} else if (!dynamicValidation.value.replace(/\s/g, '').match(minimumNumbers)) {
		secondValidationButton.classList.remove('form__validation--greenCircle--second');
	}

	/* Highlight (OR unhighlight) the THIRD button if the password has 1 uppercase and 1 lowercase character (OR less than 1 uppercase and 1 lowercase character). */
	if (dynamicValidation.value.replace(/\s/g, '').match(minimunLowerANDUpperCaseCharacters)) {
		thirdValidationButton.classList.add('form__validation--greenCircle--third');
	} else if (!dynamicValidation.value.replace(/\s/g, '').match(minimunLowerANDUpperCaseCharacters)) {
		thirdValidationButton.classList.remove('form__validation--greenCircle--third');
	}

	/* Highlight (OR unhighlight) the FOURTH button if the password has 1 symbol (OR less than 1 symbol). */
	if (dynamicValidation.value.replace(/\s/g, '').match(minimumSymbols)) {
		fourthValidationButton.classList.add('form__validation--greenCircle--fourth');
	} else if (!dynamicValidation.value.replace(/\s/g, '').match(minimumSymbols)) {
		fourthValidationButton.classList.remove('form__validation--greenCircle--fourth');
	}
}

/* Compare the passwords typed in both password inputs */
function comparePasswords() {
	const fifthValidationButton = document.querySelector('.form__validation--fifth');
	deleteWhitespacesPasswords();

	/* Highlight (OR unhighlight) the FIFTH button if the password is the same in both inputs (OR not). */
	if (dynamicValidationNewPassword.value.replace(/\s/g, '') === dynamicValidation.value.replace(/\s/g, '') && dynamicValidation !== '') {
		fifthValidationButton.classList.add('form__validation--greenCircle--fifth');
		return true;
	} else if (!(dynamicValidationNewPassword.value.replace(/\s/g, '') === dynamicValidation.value.replace(/\s/g, '')) && dynamicValidation !== '') {
		fifthValidationButton.classList.remove('form__validation--greenCircle--fifth');
		return false;
	}
}

/* If the user types a whitespace in the password field it automatically removes it. */
function deleteWhitespacesPasswords() {
	dynamicValidationNewPassword.value = dynamicValidationNewPassword.value.replace(/\s/g, '');
	dynamicValidation.value = dynamicValidation.value.replace(/\s/g, '');
}

/* Event listener for dynamic password typing validation. */
dynamicValidation.addEventListener('keydown', validatePassword);
dynamicValidation.addEventListener('keyup', validatePassword);

/* Event listener for checking if the 2 passwords are the exact same. */
dynamicValidationNewPassword.addEventListener('keydown', comparePasswords);
dynamicValidation.addEventListener('keydown', comparePasswords);
dynamicValidationNewPassword.addEventListener('keyup', comparePasswords);
dynamicValidation.addEventListener('keyup', comparePasswords);

/* Fullname validation. */
function checkFullname() {
	const fullnamePattern = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/i;

	const userFullname = document.querySelector('#inputFullname');
	const correctedFullname = userFullname.value.toLowerCase();

	/* If the fullname input match the regex it returns true. */
	if (correctedFullname.match(fullnamePattern)) {
		console.log(`The fullname you introduced is valid.`);
		userFullname.value = correctedFullname;
		return true;
	} else {
		/* If the user entered nothing at the fullname input the web doesn't ask him to enter data since he doesn't want to change his fullname. */
		if (userFullname.value === '') {
			return false;
		}
		/* If the fullname is not valid this clears the input and tells the user that it isn't valid. */
		userFullname.value = '';
		userFullname.focus();
		console.error(`The fullname you introduced is invalid.`);
		return false;
	}
}

/* Function called every time the user press the 'CHANGE PROFILE INFORMATION' button. */
function submitData() {
	if (checkPassword()) {
		submitButton.setAttribute('type', 'submit');
		return true;
	} else if (checkFullname()) {
		submitButton.setAttribute('type', 'submit');
		return true;
	} else {
		submitButton.setAttribute('type', 'button');
		return false;
	}
}

/* Interactive buttons. */
/* Displays and hides the clear button depending on the focus */
const inputFullname = document.querySelector('#inputFullname');

inputFullname.addEventListener('focus', () => {
	document.querySelector('#clear').style.display = 'block';
});

inputFullname.addEventListener('focusout', () => {
	setTimeout(() => {
		document.querySelector('#clear').style.display = 'none';
	}, 500);
});

// Clear the fullname input when you press the button.
function clearButton() {
	inputFullname.value = '';
}

/* Password dynamic hide/show button. */
var defaultState = true;

function eyeButton() {
	if (defaultState) {
		document.getElementById('inputCurrentPassword').setAttribute('type', 'text');
		document.getElementById('inputNewPassword').setAttribute('type', 'text');
		defaultState = false;
		document.querySelector('#eye-show').style.display = 'none';
		document.querySelector('#eye-hide').style.display = 'block';
	} else {
		document.getElementById('inputCurrentPassword').setAttribute('type', 'password');
		document.getElementById('inputNewPassword').setAttribute('type', 'password');
		defaultState = true;
		document.querySelector('#eye-hide').style.display = 'none';
		document.querySelector('#eye-show').style.display = 'block';
	}
}

/* Dynamic display of fullname and password inputs when the user press the left button. */
let defaultStateData = true;

function showData() {
	const formFullnameContainer = document.querySelector('.form__input--fullnameContainer');
	const formPasswordContainer = document.querySelector('.form__input--passwordContainer');
	const formValidationContainer = document.querySelector('.form__validation--wrapper');
	const hideORShowButton = document.querySelector('.form__submitButton--left');
	const sendDataButton = document.querySelector('.form__submitButton--middle');

	/* If the data is ACTUALLY HIDDEN it executes this piece of code. */
	if (defaultStateData) {
		formFullnameContainer.style.display = 'block';
		formPasswordContainer.style.display = 'block';
		formValidationContainer.style.display = 'flex';
		sendDataButton.style.display = 'flex';
		defaultStateData = false;
		hideORShowButton.innerHTML = 'Hide inputs';
		/* If the data is BEING DISPLAYED it executes this piece of code. */
	} else {
		formFullnameContainer.style.display = 'none';
		formPasswordContainer.style.display = 'none';
		formValidationContainer.style.display = 'none';
		sendDataButton.style.display = 'none';
		defaultStateData = true;
		hideORShowButton.innerHTML = 'Show inputs';
	}
}