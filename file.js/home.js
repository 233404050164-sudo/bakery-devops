const scrollcontainer = document.getElementById("scroll-container");
const nextbtn = document.getElementById("next-btn");
const backbtn = document.getElementById("back-btn");

nextbtn.addEventListener("click",() =>{
    scrollcontainer.style.scrollBehavior ="smooth";
    scrollcontainer.scrollLeft +=300;
});

backbtn.addEventListener("click",()=>{
    scrollcontainer.style.scrollBehavior ="smooth";
    scrollcontainer.scrollLeft -=300;
});

scrollcontainer.addEventListener("wheel",(evt) =>{
    evt.preventDefault();
    scrollcontainer.scrollLeft +=evt.deltaY;
});



const cards = document.querySelectorAll('.card-cake'); 


cards.forEach(card => {
    const minusBtn = card.querySelector('.minus-btn');
    const plusBtn = card.querySelector('.plus-btn');
    const countInput = card.querySelector('.count-input');

    plusBtn.addEventListener("click", () => {
        let value = parseInt(countInput.value) || 0; 
        countInput.value = value + 1;
    });

    minusBtn.addEventListener("click", () => {
        let value = parseInt(countInput.value) || 0;
        if (value > 0) {
            countInput.value = value - 1;
        }
    });
});

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

let x= ;