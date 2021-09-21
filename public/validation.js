// elements and variables
let form1 = document.getElementById("login");
let form2 = document.getElementById("register");

// form1.addEventListener('submit', e => {
//     let statusLog = validateLog();

//     if (statusLog) {
//         alert('Welcome');
//     } else {
//         e.preventDefault();
//     }
// }) 

// form2.addEventListener('submit', e => {
//     let statusReg = validateReg();

//     if(statusReg) {
//         alert('Your account has been registered successfully');
//     } else {
//         e.preventDefault();
//     }
// })

// Validation for login

function validateLog() {
    var status = false;
    var flag = 0
    let username = document.getElementById('username');
    let passwordLogin = document.getElementById('password0');
    let usernameError = document.getElementById('log-email-err');
    let passwordError = document.getElementById('log-pass-err');

    usernameValue = username.value.trim();
    passwordLoginValue = passwordLogin.value.trim();

    // Validation for username
    if (usernameValue == "" || usernameValue == null) {
        usernameError.innerText = "Please enter your Valid email ID";
        usernameError.className = "form-message error";
        flag +=1;
    } else if (!(validateEmail(usernameValue))) {
        usernameError.innerText = "The username entered is invalid";
        usernameError.className = "form-message error";
        flag += 1;
    } else {
        usernameError.innerText = "";
        usernameError.className = "form-message";
        flag = 0;
    }

    if (status == false && flag > 0) {
        return false;
    } else {
        return true;
    }

    // validation for password
}

// function for email validation 

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateReg() {
    let a = checkName();
    let b = checkEmail();
    let c = checkMobile();
    let d = checkPassword();
    let e = checkRePassword();

    let sum = a + b + c + d + e;
    let status = false;

    if(sum > 0){
        return status;
    } else {
        return true;
    }
}

function checkName() {
    let name = document.getElementById('name');
    let nameError = document.getElementById('reg-name-err');

    if ((name.value == "" || name.value == null)) {
        nameError.innerText = "Name is required, Please enter valid full name";
        nameError.className = "form-message error";
        return 1;
    } else if (name.value.length < 2) {
        nameError.innerText = "Please enter valid full name";
        nameError.className = "form-message error";
        return 1;
    } 
    else {
        nameError.innerText = "";
        nameError.className = "form-message";
        return 0;
    }
}

function checkEmail() {
    let email = document.getElementById('email');
    let emailError = document.getElementById('reg-email-err');

    if (!(validateEmail(email.value.trim()))) {
        emailError.innerText = "Please enter your valid email ID";
        emailError.className = "form-message error";
        return 1;
    } else {
        emailError.innerText = "";
        emailError.className = "form-message";
        return 0;
    }
}

function checkMobile() {
    var phone = /^\d{10}$/;
    let mobile = document.getElementById('mobile');
    let mobileError = document.getElementById('reg-mobile-err');

    if (!(mobile.value.trim().match(phone))) {
        mobileError.innerText = "Please enter your valid Mobile number";
        mobileError.className = "form-message error";
        return 1;
    } else if (mobile.value.trim() == "" || mobile.value.trim() == null) {
        mobileError.innerText = "Please enter your valid Mobile number";
        mobileError.className = "form-message error";
        return 1;
    } else {
        mobileError.innerText = "";
        mobileError.className = "form-message";
        return 0;
    }
}

function checkPassword () {
    let password1 = document.getElementById('password1');
    let password1Error = document.getElementById('reg-pass-err');
    let password1Value = password1.value.trim();    
    if (password1Value == "" || password1Value == null) {
        password1Error.innerText = "Password is required. Please create one!";
        password1Error.className = "form-message error";
        return 1;
    } else if (password1Value.length < 8){
        password1Error.innerText = "Password must contain more than 8 characters";
        password1Error.className = "form-message error";
        return 1;
    } else {
        password1Error.innerText = "";
        password1Error.className = "form-message";
        return 0;
    }
}

function checkRePassword() {
    let password1 = document.getElementById('password1');
    let password2 = document.getElementById('password2');
    let password2Error = document.getElementById('reg-repass-err'); 

    // if ((password2.value.trim().match(password1.value.trim()))) {
        if (password2.value.trim() === password1.value.trim()) {
        password2Error.innerText = "";
        password2Error.className = "form-message";
        return 0;
    } else {
        password2Error.innerText = "Please re-enter Password";
        password2Error.className = "form-message error";
        return 1;
    }
}