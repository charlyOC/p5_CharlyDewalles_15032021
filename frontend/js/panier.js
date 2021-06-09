
// je déclare la variable pour récupérer les articles dans le panier

let cartItems = localStorage.getItem('basket');
cartItems = JSON.parse(cartItems)

// ensuite, j'affiche les différents produits du panier 
// et les boutons pour gérer la quantité de celui-ci

function displayProductAndQuantity(){
    // div principale pour l'affichage
    const allProducts = document.getElementById('all_products');

    //si le panier est vide, j'affiche un message et j'envoie un fonction qui désactive le bouton d'envoie du formulaire
    if (cartItems === null){

        const emptyBasket = document.createElement('h2');
        emptyBasket.setAttribute('id', 'empty_basket');
        emptyBasket.textContent = 'Le panier est vide :(';
        allProducts.appendChild(emptyBasket);
        submitAndInputDisabled();

        // si le panier a 1 produit ou plus, je loop pour récupérer ces produits et je les affiche
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

            const btnLess = document.createElement('button');
            btnLess.setAttribute('class', 'btn_less');
            quantities.appendChild(btnLess);

            let quantity = document.createElement('p');
            quantity.setAttribute('class', 'quantity');
            quantity.textContent = element.quantité;
            quantities.appendChild(quantity);

            const btnPlus = document.createElement('button');
            btnPlus.setAttribute('class', 'btn_plus');
            quantities.appendChild(btnPlus);

            const lessIcon = document.createElement('i');
            lessIcon.setAttribute('class', 'icon_less');
            lessIcon.setAttribute('class', 'far fa-minus-square');
            btnLess.appendChild(lessIcon);

            const plusIcon = document.createElement('i');
            plusIcon.setAttribute('class', 'icon_plus');
            plusIcon.setAttribute('class', 'far fa-plus-square');
            btnPlus.appendChild(plusIcon);
                
            //une fois le bouton créé j'écoute le clique pour gérer la quantité, et je recharge la page à chaque changement

            btnLess.addEventListener('click', () => {

                if (element.quantité >= 2) {
                    element.quantité --;
                    localStorage.setItem("basket", JSON.stringify(cartItems));
                        
                }  else {

                // si la quantité d'un produit est à zéro, je splice pour l'enlever du localStorage  
                    let index = cartItems.indexOf(element);
                    cartItems.splice(index, 1)
                    localStorage.setItem('basket', JSON.stringify(cartItems));

                // si il n'y a plus aucun produit je clear le localStorage          
                } if(cartItems == 0){
                    localStorage.clear();
                }
                location.reload()
                
            });

            btnPlus.addEventListener('click', () => {
                element.quantité ++; 
                localStorage.setItem("basket", JSON.stringify(cartItems));

                location.reload()
            }) ;

        });
    }
};

// je crée une fonction pour définir la quantité des produits

function quantityOfProduct(){

    let numberOfProduct = 0

    cartItems.forEach(number => {
        numberOfProduct = number.quantité
    });

    return numberOfProduct
};
// fonction pour désactiver le bouton en cas de panier vide 


function submitAndInputDisabled(){
    document.getElementById('firstname').disabled = true;
    document.getElementById('lastname').disabled = true;
    document.getElementById('address').disabled = true;
    document.getElementById('city').disabled = true;
    document.getElementById('email').disabled = true;
    let submit = document.getElementById('confirm');
    submit.disabled = true;
}

// fonction pour le prix total du panier

function priceOfBasket(){


    let totalCost = 0; 

    cartItems.forEach (item => {
        totalCost += item.quantité * item.price;
    });

    return totalCost

};

// affichage du prix total

function displayPrice(){

    let priceDiv = document.getElementById('total');

    let totalPrice = document.createElement('h2');

    totalPrice.setAttribute('id', 'total_price');
    totalPrice.textContent = 'Total : ' + priceOfBasket() + ' €';
    priceDiv.appendChild(totalPrice);

};

// foonction pour vérifier les valeurs rentrées par l'utilisateur

function checkInputUser(){

    //création des regex nécessaire pour la validation
    const regexText = /^([A-Za-z]+)$/;
    const regexAddress = /^\d+\s[A-z]+\s[A-z]+/;
    const regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // je récupère les valeurs rentrées par l'utilisateur
    const firstName = document.getElementById('firstname').value;
    if (firstName.match(regexText)){
        console.log('ok')
    } else {
        alert("'" + firstName + "'" + " n'est pas un prénom valide")
    }
    const lastName = document.getElementById('lastname').value;
    if (lastName.match(regexText)){
        console.log('ok')
    } else {
        alert("'" + lastName + "'" + " n'est pas un nom valide")
    }
    const address = document.getElementById('address').value;
    if (address.match(regexAddress)){
        console.log('ok')
    } else {
        alert("'" + address + "'" + " n'est pas une adresse valide")
    }
    const city = document.getElementById('city').value;
    if (city.match(regexText)){
        console.log('ok')
    } else {
        alert("'" + city + "'" + " n'est pas une ville valide")
    }
    const email = document.getElementById('email').value;
    if (email.match(regexMail)){
        console.log('ok')
    } else {
        alert("'" + email + "'" + " n'est pas un email valide")
    }

    // si ça match aux regex je renvoie (true) à la fonction
    if (firstName.match(regexText) && lastName.match(regexText) && address.match(regexAddress) && city.match(regexText) && email.match(regexMail)) {
        console.log(1)
        return (true)
    // sinon je renvoie (false)   
    } else {
        console.log(0)
        return (false)
    }

};




    
// une fois les valeurs vérifiées, j'envoie une requête POST à l'api
function validFormAndSend(){

    let submit = document.getElementById('confirm');

    submit.addEventListener('click', () => {

        let validation = checkInputUser(); 
    
        if (validation){
            
            //je regroupe les données à envoyer dans une seule et même variable

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
            
            // je récupère l'id du ou des produits a envoyer 
            let productId = JSON.parse(localStorage.getItem('basket'));
                productId.forEach( element => {
                dataToSend.products.push(element.id);
            });
    
            // je fetch  l'api, et je fais une requête POST
            fetch("http://localhost:3000/api/furniture/order", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            mode:'cors',
            body: JSON.stringify(dataToSend),
            }).then((response) => response.json()) 
            .then((response) => {
                // je récupère les éléments envoyés par l'api, ainsi que le prénom et le prix final, que je stringify pour les exploiter
                localStorage.setItem('firstname', JSON.stringify(document.getElementById('firstname').value))
                localStorage.setItem('contact', JSON.stringify(response.contact));
                localStorage.setItem('orderId', JSON.stringify(response.orderId));
                localStorage.setItem('total-price', JSON.stringify(priceOfBasket()))
                // après avoir récupérer les infos, je charge la page "commmande.html" pour afficher les infos
                window.location.href="commande.html";
            }).catch(error => alert("Erreur : " + error));
            
    
        }


    });
    
};



// j'appelle les fonctions nécessaires 

displayProductAndQuantity();
displayPrice();
validFormAndSend();


























 



    

 






