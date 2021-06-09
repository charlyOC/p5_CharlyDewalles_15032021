//je crée juste différentes variables pour récupérer et afficher les infos du localStorage

const orderId = document.getElementById('id_number');
orderId.textContent = localStorage.getItem('orderId');

const firstName = document.getElementById('firstname');
firstName.textContent = localStorage.getItem('firstname', (firstName));

const totalPrice = document.getElementById('total_price');
totalPrice.textContent = localStorage.getItem('total-price') + '€';

localStorage.clear();
