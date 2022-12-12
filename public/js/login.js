const signUp = document.getElementById('signUp');
const imgLogIn = document.getElementById('imgLogIn');
const signUpBtn = document.getElementById('signUpBtn');

function showSignUp(){
    imgLogIn.classList.remove("signin");
    signUp.classList.remove("h-0");
    signUp.classList.add("h-75");
    imgLogIn.classList.add("signup");
}

function showSignIn(){
    imgLogIn.classList.remove("signup");
    signUp.classList.remove("h-75");
    signUp.classList.add("h-0");
    imgLogIn.classList.add("signin");
}

function checkEmail(id, idMsg){
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]/;
    const email = document.getElementById(id);
    const emailMsg = document.getElementById(idMsg);
    if(email.value.trim().match(validRegex)){
        emailMsg.classList.add('d-none');
        return true;
    }else{
        emailMsg.classList.remove('d-none');
        return false;
    }
}

function validPassword(id, idMsg){
    const validRegex = ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]);
    const password = document.getElementById(id);
    const passwordMsg = document.getElementById(idMsg);
    if(password.value.trim().match(validRegex)){
        passwordMsg.classList.add('d-none');
        return true;
    }else{
        passwordMsg.classList.remove('d-none');
        return false;
    }
}

function validLong(id, long={}, idMsg){
    let validMin = true;
    let validMax = true;
    const element = document.getElementById(id);
    const elementMsg = document.getElementById(idMsg);
    if(long.min){
        if(password.value.trim().length < long.min){
            validMin = false;
        }
    }
    if(long.max){
        if(password.value.trim().length > long.max){
            validMax = false;
        }
    }
    const valid = validMin && validMax;
    if(valid){
        elementMsg.classList.add('d-none');
        return true;
    }else{
        elementMsg.classList.remove('d-none');
        return false;
    }
}

function validateSignUp(){
    if(checkEmail('emailSignUp', 'validEmail') && validPassword('password1SignUp', 'passwordCharacter') && validLong('password1SignUp', {min: 8, max: 20}, 'passwordLong')){
        signUpBtn.classList.remove('disabled');
    }else{
        signUpBtn.classList.add('disabled');
    }
}