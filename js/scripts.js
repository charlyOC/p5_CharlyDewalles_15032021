fetch('http://localhost:3000/api/furniture')
.then((response) => response.json())
.then((response) => {


for (let i = 0; i < response.length; i++) {
  
  const cardFurniture = document.getElementById('meubles');
  
  const etiquette = document.createElement('a');
  etiquette.setAttribute('class', 'etiquette_product');
  etiquette.setAttribute('href', 'produit.html?id=' + (response[i]._id));

  let image = document.createElement('img');
  image.setAttribute('class', 'image_product');
  image.setAttribute('src', (response[i].imageUrl));
  etiquette.appendChild(image);

  let name = document.createElement('h2');
  name.setAttribute('class', 'name_product');
  name.textContent = (response[i].name);
  etiquette.appendChild(name);

  let prix = document.createElement('h3');
  prix.setAttribute('class', 'price_product');
  prix.textContent = (response[i].price/100) + '€';
  etiquette.appendChild(prix);

  let id = document.createElement('p');
  id.setAttribute('class', 'id_product');
  id.textContent = (response[i]._id);
  etiquette.appendChild(id);

  let description = document.createElement('p');
  description.setAttribute('class', 'description');
  description.textContent = (response[i].description)
  etiquette.appendChild(description);

  cardFurniture.appendChild(etiquette);
}
}).catch(error => alert("Erreur : " + error));






