const signUp = document.getElementById('signUp');
const imgLogIn = document.getElementById('imgLogIn');

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