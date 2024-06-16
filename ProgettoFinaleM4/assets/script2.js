let cart = [];
let cartCards = [];
let prezzoF = 0.0;

document.addEventListener("DOMContentLoaded", () => {
    getProd();
    initializeCart();
}); 

const params = new URLSearchParams(location.search);
let id = params.get("id");

function getProd() {
    fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
        method: "GET",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4MTcyZThmYzBmMzAwMTU1ZTU5MjciLCJpYXQiOjE3MTgxODA3NjcsImV4cCI6MTcxOTM5MDM2N30.JYPyrGgPtWFMEWZmTsBHQOZJxEtoggeyynfS4Y33X3g"
        }
    })
    .then(response => response.json())
    .then(data => {
        let productContainer = document.getElementById("productContainer");
        productContainer.innerHTML = `<img src="${data.imageUrl}" class="w-100" alt="${data.name}">`;

        let info = document.getElementById("informazioni");
        info.innerHTML = `
            <div><h1>${data.name}</h1></div>
            <div><h4>${data.brand}</h4></div>
            <div><p>${data.description}</p></div>
            <div class="d-flex justify-content-between mt-auto">
                <h6>${data.price}$</h6>
                <button class="btn btn-primary" onclick="addToCart('${data._id}', ${data.price}, '${data.name}', this)">Add to cart <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg></button>
            </div>
        `;
    })
    .catch(error => {
        console.log('Errore:', error);
    });
}
// funzione per inizializzare il carrello
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
// funzione per aggiungere un prodotto al carrello
function addToCart(id, price, title, card) {
    let localStorageCart = localStorage.getItem("cart");
    let cartObj = {
        id: id,
        title: title,
        price: price,
        quantita: 1
    };
    
    //controllo se il prodotto esiste nel carrello o no
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

        if (!found) {
            cart.push(cartObj);
        }
    }

    // Aggiorna il localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    prezzoF += price;
    card.classList.remove('border-danger', 'border');

    displayCart();
}

// funzione per visualizzare il carrello
function displayCart() {
    let cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${item.title} ${item.price}$ (${item.quantita})`;
        cartItemsContainer.appendChild(li);
    });

    let cartCounter = document.getElementById('cart-counter');
    cartCounter.textContent = `number of items: ${cart.length}`;

    let cartTot = document.getElementById('cart-total');
    cartTot.textContent = `Totale: ${prezzoF.toFixed(2)}$`;

    // Aggiungo il bottone "Svuota il carrello"
    let emptyButton = document.createElement('button');
    emptyButton.classList.add('btn', 'btn-danger', 'mt-2');
    emptyButton.textContent = 'Svuota il carrello';
    emptyButton.onclick = emptyCart;
    cartItemsContainer.appendChild(emptyButton);
}

function emptyCart() {
    cart = []; // Svuoto l'array del carrello
    prezzoF = 0.0;

    // Aggiorno il localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart(); // Aggiorno la visualizzazione del carrello

    // Aggiorno il totale del carrello
    let cartTot = document.getElementById('cart-total');
    cartTot.textContent = 'Totale: ' + prezzoF.toFixed(2) + "$";
}
