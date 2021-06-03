
// je déclare un constante pour récupérer l'url du produit 
const url = window.location.search;
let params = new URLSearchParams (url);
let idProduct = params.get('id');

// je fetch l'api + l'id pour afficher les infos du produit cliqué
fetch('http://localhost:3000/api/furniture/' + idProduct)
.then((response) => response.json())
.then((response) => {

  // je déclare une fonction dans le fetch pour récupérer les réponse et les afficher
  function displayProduct(){

    const customProduct = document.getElementById('custom_product');
  
    document.title = response.name + '-' + response.price/100 + '€';
  
    let image = document.createElement('img');
    image.setAttribute('class', 'image_product');
    image.setAttribute('src',  response.imageUrl);
    customProduct.appendChild(image);
    
    let name = document.createElement('h2');
    name.setAttribute('class', 'name_product');
    name.textContent =  response.name;
    customProduct.appendChild(name);
    
    let prix = document.createElement('h3');
    prix.setAttribute('class', 'price_product');
    prix.textContent = response.price/100 + '€';
    customProduct.appendChild(prix);
    
    let idProduct = document.createElement('p');
    idProduct.setAttribute('class', 'id_product');
    idProduct.textContent = response._id;
    customProduct.appendChild(idProduct);
    
    let description = document.createElement('p');
    description.setAttribute('class', 'description');
    description.textContent = response.description;
    customProduct.appendChild(description);
  

    let varnish = document.createElement('select');
    varnish.setAttribute('class', 'select_varnish');
    customProduct.appendChild(varnish);
  
    let choice = document.querySelector('.select_varnish');

    // j'affiche les vernis en les loopant, pour avoir le même nombre d'options que de vernis  

    response.varnish.forEach (function (varnish)
    {
      let option = document.createElement('option');
      option.value = varnish; 
      option.textContent = varnish;
      choice.appendChild(option);
    });
  
  };
  
  // je crée un objet products avec les réponses de l'api 

  let products = 
  {
    name: response.name,
    id: response._id,
    price: response.price/100, 
    image: response.imageUrl,
    quantité: 1,
  }

  

  // je déclare basket qui va être un array par la suite, et je parse les infos envoyer dedans 
  let basket = JSON.parse(localStorage.getItem("basket"));
    
  // je déclare une variable de produit existant que je mets à 0 
  let existingProduct = 0; 


  // si j'ajoute un produit et qu'il n'y a pas d'array pour l'acceuillir, je crée l'array basket
  if (basket === null) {
    basket = [];
    // si un produit existe dans le panier je loop son contenu  
  } else {
    basket.forEach(element => {
      // si deux Id correspondent, je rajoute 1 à ce produit, et 1 à la quantité générale
      if (element.id == response._id) {
        element.quantité ++;
        existingProduct ++;
      } 
    }); 
  }

  // si il n'y a aucun produit, je push l'objet produit dans le panier
  if (existingProduct == 0) {
    basket.push(products);
  }
    
  

  
  function addToCart(){
    
    let addCart = document.querySelector('.add-cart');
  
    addCart.addEventListener('click', () => {
  
      window.alert('le produit a été ajouté au panier :)')
      
      localStorage.setItem("basket", JSON.stringify(basket));
    })
  };

  displayProduct();
  addToCart();
  
}).catch(error => alert("Erreur : " + error));



 









  



































