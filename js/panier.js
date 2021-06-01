

function checkInputUser(){

    let regexText = /^([A-Za-z]+)$/;
    let regexAddress = /^\d+\s[A-z]+\s[A-z]+/;
    let regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    
    let firstName = document.getElementById('firstname').value;
    let lastName = document.getElementById('lastname').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;

    if (firstName.match(regexText) && lastName.match(regexText) && address.match(regexAddress) && city.match(regexText) && email.match(regexMail)) {
        console.log(1)
        return (true)
        
    } else {
        console.log(0)
        return (false)
    }

};



let cartItems = localStorage.getItem('basket');
cartItems = JSON.parse(cartItems)


const allProducts = document.getElementById('all_products');


if (cartItems === null){

    let emptyBasket = document.createElement('h2');
    emptyBasket.setAttribute('id', 'empty_basket');
    emptyBasket.textContent = 'Le panier est vide :(';
    allProducts.appendChild(emptyBasket);



    } else {
        cartItems.forEach(element => {


            let productContainer = document.createElement("div");
            productContainer.setAttribute('class', 'product_container')
            allProducts.appendChild(productContainer);
             
            let nameOfProduct = document.createElement('h2');
            nameOfProduct.setAttribute('class', 'name_of_product');
            nameOfProduct.textContent = element.name;
            productContainer.appendChild(nameOfProduct);
        
            let imageOfProduct = document.createElement('img');
            imageOfProduct.setAttribute('class', 'image_of_product');
            imageOfProduct.setAttribute('src', element.image);
            productContainer.appendChild(imageOfProduct);

            let priceOfProduct = document.createElement('h2');
            priceOfProduct.setAttribute('class', 'price_of_product');
            priceOfProduct.textContent = element.price + ' €';
            productContainer.appendChild(priceOfProduct);

            let quantities = document.createElement('div');
            quantities.setAttribute('class', 'quantities');
            productContainer.appendChild(quantities);

            let btnLess = document.createElement('button');
            btnLess.setAttribute('class', 'btn_less');
            quantities.appendChild(btnLess);

            let quantity = document.createElement('p');
            quantity.setAttribute('class', 'quantity');
            quantity.textContent = element.quantité;
            quantities.appendChild(quantity);

            let btnPlus = document.createElement('button');
            btnPlus.setAttribute('class', 'btn_plus');
            quantities.appendChild(btnPlus);

            let lessIcon = document.createElement('i');
            lessIcon.setAttribute('class', 'icon_less');
            lessIcon.setAttribute('class', 'far fa-minus-square');
            btnLess.appendChild(lessIcon);

            let plusIcon = document.createElement('i');
            plusIcon.setAttribute('class', 'icon_plus');
            plusIcon.setAttribute('class', 'far fa-plus-square');
            btnPlus.appendChild(plusIcon);

            btnLess.addEventListener('click', () => {

                if (element.quantité >= 2) {
                    element.quantité --;
                    localStorage.setItem("basket", JSON.stringify(cartItems));
                        
                }  else {

                    let index = cartItems.indexOf(element);
                    cartItems.splice(index, 1)
                    localStorage.setItem('basket', JSON.stringify(cartItems));
                        
                } if(cartItems == 0){
                    localStorage.clear();
                }
                location.reload()
                
            });

            btnPlus.addEventListener('click', () => {
            element.quantité ++; 
            localStorage.setItem("basket", JSON.stringify(cartItems));

            location.reload()
        }) 
        

    });
}


let submit = document.getElementById('confirm');
let totalCost = 0; 

let inputs = document.getElementsByTagName('input');

if (cartItems === null){
    submit.disabled = true;
} else{
    cartItems.forEach (item => {
        totalCost += item.quantité * item.price;
    })
}




let priceDiv = document.getElementById('total');


let totalPrice = document.createElement('h2');
totalPrice.setAttribute('id', 'total_price');
totalPrice.textContent = 'Total : ' + totalCost + ' €';
priceDiv.appendChild(totalPrice); 
    
 
submit.addEventListener('click', () => {


    let validation = checkInputUser(); 

    if (validation === true){
        
        let dataToSend = {

            contact : {
                    
                firstName: document.getElementById('firstname').value,
                lastName: document.getElementById('lastname').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                email: document.getElementById('email').value,
            },
                
            products : []
            
        };
        
        let productId = JSON.parse(localStorage.getItem('basket'));
            productId.forEach( element => {
            dataToSend.products.push(element.id);
        });

        fetch("http://localhost:3000/api/furniture/order", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        mode:'cors',
        body: JSON.stringify(dataToSend),
        }).then((response) => response.json()) 
        .then((response) => {
            localStorage.setItem('firstname', JSON.stringify(document.getElementById('firstname').value))
            localStorage.setItem('contact', JSON.stringify(response.contact));
            localStorage.setItem('orderId', JSON.stringify(response.orderId));
            localStorage.setItem('finalPrice', JSON.stringify(totalCost));
            window.location.href="commande.html";
        });
        console.log('11');
        

    } else {

        alert('les informations saisies ne sont pas valides')

    }
    
 
});

























 



    

 






