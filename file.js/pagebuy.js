
function calculatebill() {
    let element = document.getElementById('tam-tinh');
    
    if (element) {
        // 1. Remove "VND" and any extra characters so parseFloat works correctly
        let rawText = element.innerText.replace(/[^\d.]/g, ''); 
        let tamtinh = parseFloat(rawText);
        
        if (isNaN(tamtinh)) tamtinh = 0; // Safety check

        let vat = tamtinh * 0.10;
        let tong = tamtinh + vat;

        // 2. Update the display
        document.getElementById('vat-val').innerText = `${vat.toFixed(3)} VND`;
        document.getElementById('tong-val').innerText = `${tong.toFixed(3)} VND`;
    }
}

// 3. Call the function ONCE (outside the function definition)

window.addEventListener('DOMContentLoaded', calculatebill);

const paybutton = document.getElementById('paid');
    if(paybutton){
         paybutton.addEventListener('click', function(){
    console.log ("Thanh toán button clicked at:"+ new Date().toLocaleTimeString())

    alert("Chúng tôi sẽ gọi xác nhận và bạn sẽ thanh toán khi nhận hàng! Chúc một ngày tốt lành");

    });
}