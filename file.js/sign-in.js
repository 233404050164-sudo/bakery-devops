const signupForm = document.getElementById('king-cake-form');

// This "if" check stops the error!
if (signupForm) { 
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('username').value.trim();
        const email = document.getElementById('useremail').value.trim();
        const phone = document.getElementById('userphone').value.trim();

        if(name === "" || email === "" || phone === ""){
            alert("Bạn quên một số thông tin quan trọng Á!");
            return;
        }

        if(!email.includes("@")){
            alert("Email của bạn thiếu @ Á");
            return;
        }
        
        alert("Chúc mừng đăng ký thành công");
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('king-cake-form');
    const loginForm = document.getElementById('login-form');
    
    const btnToLogin = document.getElementById('Switch-to-login');
    const btnToSignup = document.getElementById('Switch-to-signup');

    // Switch to Login
    if (btnToLogin) {
        btnToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            signupForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        });
    }

    // Switch to Sign-up
    if (btnToSignup) {
        btnToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
        });
    }
});