/*  const products = [
    {
        name: "Smartphone XYZ",
        description: "Latest model with advanced features",
        brand: "TechBrand",
        imageUrl: "https://static.comet.it/b2c/public/e-cat/SAM07594W/SAM07594W-908d7d1640-0.jpg",
        price: 699.99
    },
    {
        name: "Laptop Pro",
        description: "High performance laptop for professionals",
        brand: "CompTech",
        imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2023/01/businesslaptops-2048px-0032.jpg",
        price: 1299.99
    },
    {
        name: "Wireless Earbuds",
        description: "Noise-cancelling wireless earbuds",
        brand: "SoundBrand",
        imageUrl: "https://m.media-amazon.com/images/I/61y8GReSvzL.jpg",
        price: 149.99
    },
    {
        name: "Smartwatch 2.0",
        description: "Feature-rich smartwatch with fitness tracking",
        brand: "WearableInc",
        imageUrl: "https://m.media-amazon.com/images/I/41lQOCmkXqS._SL500_.jpg",
        price: 199.99
    },
    {
        name: "Gaming Console",
        description: "Next-gen gaming console with stunning graphics",
        brand: "GameStation",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnIwY2c_pLXybmoSDikwCF6hehjs0xb6UzQ&s",
        price: 499.99
    },
    {
        name: "4K TV",
        description: "Ultra HD television with vibrant colors",
        brand: "VisionElectronics",
        imageUrl: "https://imgrapido.com/fornitori/trx/0000060282.jpg",
        price: 799.99
    },
    {
        name: "Bluetooth Speaker",
        description: "Portable speaker with high-quality sound",
        brand: "AudioMax",
        imageUrl: "https://i.ebayimg.com/images/g/gmoAAOSwh8pitq4U/s-l1600.jpg",
        price: 89.99
    },
    {
        name: "Digital Camera",
        description: "High resolution camera for photography enthusiasts",
        brand: "PhotoGear",
        imageUrl: "https://i.pcmag.com/imagery/reviews/01Pi4jPqCxFW1lzIgsR1uLV-1..v1676407822.jpg",
        price: 599.99
    },
    {
        name: "E-Reader",
        description: "Lightweight e-reader with a glare-free screen",
        brand: "ReadTech",
        imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2023/07/ebook-reader-2048px-0085.jpg?auto=webp&quality=75&crop=1.91:1&width=1200",
        price: 129.99
    },
    {
        name: "Fitness Tracker",
        description: "Monitor your health and fitness levels",
        brand: "HealthPlus",
        imageUrl: "https://www.cnet.com/a/img/resize/1e3f34d0b0e78bd2da8c5ec0a628f277b20f45c7/hub/2023/10/10/a47f8317-6b57-4739-bca6-30f44ad593a6/fitbitcharge6-2.jpg?auto=webp&fit=crop&height=675&width=1200",
        price: 79.99
    }
];

products.forEach((product) => {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4MTcyZThmYzBmMzAwMTU1ZTU5MjciLCJpYXQiOjE3MTgxODA3NjcsImV4cCI6MTcxOTM5MDM2N30.JYPyrGgPtWFMEWZmTsBHQOZJxEtoggeyynfS4Y33X3g",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Prodotto aggiunto con successo:", data);
    })
    .catch(error => {
        console.error("Errore nell'aggiunta del prodotto:", error);
    });
}); */
let cart = []; // Array che conterrà i prodotti nel carrello
let prezzoF = 0.0; // Variabile per tenere traccia del prezzo totale

document.addEventListener("DOMContentLoaded", () => {
  getProd(); // Chiamo la funzione per ottenere i prodotti dalla API
  initializeCart(); // Inizializzo il carrello al caricamento della pagina
}); 

// Funzione per inizializzare il carrello dalla localStorage
function initializeCart() {
  let localStorageCart = localStorage.getItem("cart");
  if (localStorageCart) {
    cart = JSON.parse(localStorageCart);
    cart.forEach(item => {
      prezzoF += item.price * item.quantita;
    });
    displayCart();
  }
}

// Funzione per ottenere i prodotti dalla API
function getProd() {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "GET",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4MTcyZThmYzBmMzAwMTU1ZTU5MjciLCJpYXQiOjE3MTgxODA3NjcsImV4cCI6MTcxOTM5MDM2N30.JYPyrGgPtWFMEWZmTsBHQOZJxEtoggeyynfS4Y33X3g"
      }
    })
    .then((response) => {
      return response.json();  // Converto la risposta in JSON
    })
    .then((data) => {
      //console.log(data);  // Mostra i dati ricevuti dalla risposta
      let productContainer = document.getElementById("container");
      productContainer.innerHTML = ""; // Pulisco il contenitore

      data.forEach(product => {
        // Creo la card Bootstrap
        let containerCard = document.createElement('div');
        containerCard.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4');

        let card = document.createElement('div');
        card.classList.add('card', 'h-100', 'mt-4', 'bg-warning-subtle', 'bg-opacity-75');

        let img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = product.imageUrl;
        img.alt = product.name;

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'd-flex', 'flex-column');

        let cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.innerText = product.name;

        let cardPrice = document.createElement('p');
        cardPrice.classList.add('card-text', 'flex-grow-1');
        cardPrice.textContent = product.price + '$';

        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('mt-auto', 'd-flex', 'justify-content-between');

        // Creo il pulsante per aggiungere al carrello
        let cartButton = document.createElement('button');
        cartButton.classList.add('btn', 'btn-primary');
        cartButton.innerHTML = `Add to Cart <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
      </svg>`;
        cartButton.onclick = () => addToCart(product._id, product.price, product.name, card);

        let linkInfo = document.createElement('a');
        linkInfo.href = './dettagli.html?id=' + product._id;
        linkInfo.target = '_blank';
        linkInfo.textContent = 'Info';

        buttonContainer.appendChild(cartButton);
        buttonContainer.appendChild(linkInfo);

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardPrice);
        cardBody.appendChild(buttonContainer);
        card.appendChild(img);
        card.appendChild(cardBody);

        containerCard.appendChild(card);
        productContainer.appendChild(containerCard);
      });
    })
    .catch((error) => {
      console.error('Errore:', error);  // Gestisco eventuali errori
    });
}

// Funzione per aggiungere un prodotto al carrello
function addToCart(id, price, title, card) {
  let localStorageCart = localStorage.getItem("cart");
  let cartObj = {
    id: id,
    title: title,
    price: price,
    quantita: 1
  };

  // Se il carrello non esiste, lo crea, altrimenti lo carica
  if (localStorageCart == null) {
    cart.push(cartObj);
  } else {
    cart = JSON.parse(localStorageCart);
    let found = false;
    cart.forEach(element => {
      if (element.id === id) {
        element.quantita += 1;
        found = true;
      }
    });

    // Se l'elemento non è stato trovato, lo aggiunge
    if (!found) {
      cart.push(cartObj);
    }
  }

  // Salva il carrello nel localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  prezzoF += price;

  displayCart();
  // Mostra l'alert per confermare l'aggiunta al carrello
  alert(`${title} was added to cart!`);
}

// Funzione per visualizzare il carrello
function displayCart() {
  let cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  cart.forEach(item => {
    let li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    
    // Contenuto testuale dell'elemento del carrello
    let cartItemText = document.createElement('span');
    cartItemText.textContent = `${item.title} ${item.price}$ (${item.quantita})`;
    
    // Bottone per rimuovere l'elemento dal carrello
    let removeButton = document.createElement('button');
    removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'btn-remove');
    removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
  </svg>`;
    removeButton.onclick = () => removeFromCart(item.id);

    // Aggiungo il testo e il pulsante all'elemento <li>
    li.appendChild(cartItemText);
    li.appendChild(removeButton);

    // Aggiungo l'elemento <li> al contenitore del carrello
    cartItemsContainer.appendChild(li);
  });

  let cartCounter = document.getElementById('cart-counter');
  cartCounter.textContent = `Number of items: ${cart.length}`;

  let cartTot = document.getElementById('cart-total');
  cartTot.textContent = `Total: ${prezzoF.toFixed(2)}$`;

  // Aggiungo il bottone "Svuota il carrello" solo se ci sono elementi nel carrello
  if (cart.length > 0) {
    let emptyButton = document.createElement('button');
    emptyButton.classList.add('btn', 'btn-danger', 'mt-2');
    emptyButton.textContent = 'Empty Cart';
    emptyButton.onclick = emptyCart;
    cartItemsContainer.appendChild(emptyButton);
  }
}


// Funzione per svuotare il carrello
function emptyCart() {
  cart = []; // Svuoto l'array del carrello
  prezzoF = 0.0; // Reimposto il prezzo totale a zero

  // Aggiorno il localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart(); // Aggiorno la visualizzazione del carrello

  // Aggiorno il totale del carrello
  let cartTot = document.getElementById('cart-total');
  cartTot.textContent = 'Totale: ' + prezzoF.toFixed(2) + "$";

  // Visualizzo un messaggio di conferma
  alert('The cart has been emptied!');
}

function removeFromCart(id) {
  // Filtro l'array del carrello rimuovendo l'elemento con l'id specificato
  cart = cart.filter(item => item.id !== id);

  // Aggiorno il localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Ricalcolo il prezzo totale
  prezzoF = 0.0;
  cart.forEach(item => {
    prezzoF += item.price * item.quantita;
  });

  // Aggiorna la visualizzazione del carrello
  displayCart();
}







































