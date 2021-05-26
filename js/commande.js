let orderId = document.getElementById('id_number');
orderId.textContent = localStorage.getItem('orderId');

let firstName = document.getElementById('firstname');
firstName.textContent = localStorage.getItem('firstname', JSON.stringify(firstName));


let totalPrice = document.getElementById('total_price');
totalPrice.textContent = localStorage.getItem('finalPrice') + '€';
