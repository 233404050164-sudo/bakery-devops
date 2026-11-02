function getdatatable() {
    // 1. Get the price from the table
    let giatext = document.querySelector('.price').innerText;

    // 2. Clean the text (The 'i' makes it ignore upper/lower case for Vnd)
    let gianumber = parseFloat(giatext.replace(/Vnd/i, ''));

    let amountElement = document.querySelector('.qty-input');
    let amount = amountElement ? parseFloat(amountElement.value) : 0;

    let totaltamtinh = gianumber * (amount ||0);


     

    // 3. Update the Tạm Tính in the table AND the bill summary
    // Use the same ID 'tam-tinh-val' for both if that's your target
    if(document.getElementById('tam-tinh-table')) {
            document.getElementById('tam-tinh-table').innerText = `${totaltamtinh.toFixed(3)}Vnd`;
        }    
    if(document.getElementById('tam-tinh')) {
            document.getElementById('tam-tinh').innerText = totaltamtinh.toFixed(3);
        }
   calculatebill();
}


function calculatebill() {
    let element = document.getElementById('tam-tinh');
    
    if (element) {
        let tamtinh = parseFloat(element.innerText);
        
        let vat = tamtinh * 0.10;
        let tong = tamtinh + vat;

        document.getElementById('vat-val').innerText = vat.toFixed(3);
        document.getElementById('tong-val').innerText = `${tong.toFixed(3)} VND`;
    }
}

window.onload = function() {
    getdatatable();
    calculatebill();
};


    // 1. Grab the data from the URL
    const params = new URLSearchParams(window.location.search);
    
    const name = params.get('name');
    const img = params.get('img');
    const price = params.get('price');

    // 2. Select the HTML elements we want to update
    const displayImg = document.querySelector('#shop-img');
    const displayName = document.querySelector('#shop-name');
    const displayPrice = document.querySelector('#shop-price');

    // 3. Update the page if the data exists
    if (name && img && price) {
        displayName.textContent = name;
        displayPrice.textContent = price;
        displayImg.src = img;
        displayImg.alt = name;
    } else {
        // Optional: what to show if the cart is empty
        displayName.textContent = "Bạn chưa có món nào";
    }