

const url = window.location.search;
let params = new URLSearchParams (url);
let idProduct = params.get('id');
 


fetch('http://localhost:3000/api/furniture/' + idProduct)
.then((response) => response.json())
.then((response) => {

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


  let products = 
  {
    name: response.name,
    id: response._id,
    price: response.price/100, 
    image: response.imageUrl,
    quantité: 1,
  }



  response.varnish.forEach (function (varnish)
  {
    let option = document.createElement('option');
    option.value = varnish; 
    option.textContent = varnish;
    choice.appendChild(option);
  });



  let addCart = document.querySelector('.add-cart');

  addCart.addEventListener('click', () => {

    let basket = JSON.parse(localStorage.getItem("basket"));
    let produitExistant = 0; 

    if (basket === null) {
      basket = [];
    } else {
      basket.forEach(element => {
        if (element.id == response._id) {
          element.quantité ++;
          produitExistant ++;
          console.log(produitExistant);
        } 
      }); 
        
    }

    if (produitExistant == 0) {
      basket.push(products);
    }

    window.alert('le produit a été ajouté au panier :)')
    
    localStorage.setItem("basket", JSON.stringify(basket));
  
  })

  
})

.catch(error => alert("Erreur : " + error));


































