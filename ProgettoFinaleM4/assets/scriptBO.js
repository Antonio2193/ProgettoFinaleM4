let container = document.getElementById("container")

document.addEventListener("DOMContentLoaded", () => {
    mostraProdotti();
});
// Funzione per ottenere i prodotti e creare la tabella
function mostraProdotti() {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: "GET",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4MTcyZThmYzBmMzAwMTU1ZTU5MjciLCJpYXQiOjE3MTgxODA3NjcsImV4cCI6MTcxOTM5MDM2N30.JYPyrGgPtWFMEWZmTsBHQOZJxEtoggeyynfS4Y33X3g"
        }
    })
    .then(res => res.json())
    .then(data => {
        container.innerHTML = ""; // Pulisco il container prima di aggiungere la tabella

        // Creazione della tabella
        let table = document.createElement('table');
        table.classList.add('table', 'table-bordered');

        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');
        ['ID','Nome Prodotto', 'Descrizione Prodotto', 'Brand', 'Prezzo', 'Modifica', 'Elimina'].forEach(headerText => {
            let th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        let tbody = document.createElement('tbody');
        data.forEach(product => {
            let row = document.createElement('tr');
            ['_id','name', 'description', 'brand', 'price'].forEach(key => {
                let cell = document.createElement('td');
                cell.textContent = product[key];
                row.appendChild(cell);
            });

            // Creazione dei pulsanti Modifica ed Elimina
            let modifyButtonCell = document.createElement('td');
            let modifyButton = document.createElement('button');
            modifyButton.textContent = 'Modifica';
            modifyButton.classList.add('btn', 'btn-primary');
            modifyButton.onclick = function() {
                modify(product._id);
            }
            modifyButtonCell.appendChild(modifyButton);
            row.appendChild(modifyButtonCell);

            let deleteButtonCell = document.createElement('td');
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Elimina';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.onclick = function() {
                eliminaProdotto(product._id);
            }; 
            deleteButtonCell.appendChild(deleteButton);
            row.appendChild(deleteButtonCell);

            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        container.appendChild(table);
    })
    .catch((error) => {
        console.error('Errore:', error);
    });
}


// Funzione per aggiungere un nuovo prodotto
function aggiungi() {
    let getName = document.getElementById("name").value;
    let getDescription = document.getElementById("description").value;
    let getBrand = document.getElementById("brand").value;
    let getImgUrl = document.getElementById("imgUrl").value;
    let getPrice = document.getElementById("price").value;

    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: "POST",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4MTcyZThmYzBmMzAwMTU1ZTU5MjciLCJpYXQiOjE3MTgxODA3NjcsImV4cCI6MTcxOTM5MDM2N30.JYPyrGgPtWFMEWZmTsBHQOZJxEtoggeyynfS4Y33X3g",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: getName,
            description: getDescription,
            brand: getBrand,
            imageUrl: getImgUrl,
            price: getPrice
        })
    })
    .then((response) => {
        if (response.ok) {
            alert("Prodotto creato con successo");
            mostraProdotti();
            pulisciForm();
             // Aggiorno la lista prodotti dopo l'aggiunta
        } else {
            alert("Errore nella creazione del prodotto");
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Errore:', error);
    });
}
function eliminaProdotto(id) {
    let modalFooter = document.getElementById('modal-footer');
    modalFooter.innerHTML = ''
    modalFooter.innerHTML += `<button type="button" class="btn btn-danger" onclick="confermaEliminazione('${id}')">Permanently Delete</button>`
    let modal = document.getElementById('delete-modal');
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');
    modal.classList.add('d-block');
}

function closeModal() {
    let modal = document.getElementById('delete-modal');
    modal.classList.remove('d-block');

    let overlay = document.getElementById('overlay');
    overlay.classList.add('d-none');

    let modifyModal = document.getElementById('modify-modal');
    modifyModal.classList.remove('d-block');
}

function confermaEliminazione(id) {
    console.log(id);
    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4MTcyZThmYzBmMzAwMTU1ZTU5MjciLCJpYXQiOjE3MTgxODA3NjcsImV4cCI6MTcxOTM5MDM2N30.JYPyrGgPtWFMEWZmTsBHQOZJxEtoggeyynfS4Y33X3g",
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.status === 200) {
            alert("Prodotto eliminato con successo");
            closeModal();
            container.innerHTML = "";
            mostraProdotti();  
        } else {
            alert("Errore durante l'eliminazione del prodotto");
        }
    })
    .catch(error => {
        console.error('Errore:', error);
        alert("Si è verificato un errore durante l'eliminazione del prodotto");
    });
}

function pulisciForm(){
    document.getElementById("name").value = ""
    document.getElementById("description").value = ""
    document.getElementById("brand").value = ""
    document.getElementById("price").value = ""
    document.getElementById("imgUrl").value = ""
 }


function modify (id) {
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');
    let modifyModal = document.getElementById('modify-modal');
    modifyModal.classList.add('d-block');

    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4MTcyZThmYzBmMzAwMTU1ZTU5MjciLCJpYXQiOjE3MTgxODA3NjcsImV4cCI6MTcxOTM5MDM2N30.JYPyrGgPtWFMEWZmTsBHQOZJxEtoggeyynfS4Y33X3g",
            "Content-Type": "application/json"
        }
    }).then((response) => {
        response.json().then((data) => {
            document.getElementById("name_mod").value = data.name
            document.getElementById("description_mod").value = data.description
            document.getElementById("brand_mod").value = data.brand
            document.getElementById("price_mod").value = data.price
            document.getElementById("imgUrl_mod").value = data.imageUrl
            document.getElementById("id_mod").value = data._id
        })
    })
}


function confermaModifica() { 
    let id = document.getElementById("id_mod").value;
    let name_mod = document.getElementById("name_mod").value;
    let description_mod = document.getElementById("description_mod").value;
    let brand_mod = document.getElementById("brand_mod").value;
    let price_mod = document.getElementById("price_mod").value;
    let imgUrl_mod = document.getElementById("imgUrl_mod").value;

    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4MTcyZThmYzBmMzAwMTU1ZTU5MjciLCJpYXQiOjE3MTgxODA3NjcsImV4cCI6MTcxOTM5MDM2N30.JYPyrGgPtWFMEWZmTsBHQOZJxEtoggeyynfS4Y33X3g",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name_mod,
            description: description_mod,
            brand: brand_mod,
            imageUrl: imgUrl_mod,
            price: price_mod
        })
    })
    .then((response) => {
        if (response.ok) {
            alert("Prodotto modificato con successo");
            closeModal();
            mostraProdotti();
        } else {
            alert("Errore nella modifica del prodotto");
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Errore:', error);
    });
}              