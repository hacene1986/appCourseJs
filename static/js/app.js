// ciblage du DOM
const btns = document.querySelectorAll('#menu button');
const domBasket = document.querySelector('#basket tbody');
const domTotal = document.getElementById('total');
const btnOrder = document.getElementById('btnOrder');
const inputsQuantity = document.querySelectorAll('#menu input');

let basket = []; // panier

// Fonctions
function addEvents() {
  // écoute tous les boutons d'ajout au panier
  for (let i=0; i<btns.length; i++) {
    btns[i].addEventListener('click', e => {
      // parent direct du bouton cliqué
      let article = e.target.parentNode;

      let quantity = parseInt(article.querySelector('input').value);

      // si la quantité est négative
      if (quantity < 0) {
        article.querySelector('input').value = 1;
        quantity = 1;
      }


      // ciblage et récupération des informations utiles
      let item = {
        name: article.querySelector('.name').innerText,
        quantity: quantity,
        price: parseFloat(article.querySelector('.price').innerText)
      };

      basket.push(item); // ajout de l'élément dans le panier
      updateBasket();

    })
  } // fin de for

  // écoute le bouton commander
  btnOrder.addEventListener('click', e => {
    // par rapport au bouton porteur de l'événement,
    // on cible l'élément suivant de le DOM (un paragraphe ici)
    e.target.nextSibling.innerText = 'Merci infiniment...';
    setTimeout(() => {
      e.target.nextSibling.innerText = '';
    }, 4000);
  })

  // écoute les inputs quantité
  for (let i=0; i<inputsQuantity.length; i++) {
    inputsQuantity[i].addEventListener('change', checkInput);
    inputsQuantity[i].addEventListener('keyup', checkInput);
  }

} // fin addEvents

function checkInput(e) {
  let val = parseInt(e.target.value);
  let btn = e.target.nextSibling.nextSibling;

  if (val < 1 || isNaN(val)) {
    btn.disabled = true
  } else {
    btn.disabled = false
  }
}

function updateBasket() {
  let html = '';
  let total = 0;
  let totals = 0;
  basket.forEach(item => {
    total = item.price * item.quantity;
    totals += total; // cumul totaux

    html += '<tr>';
    html += '<td class="name">'+ item.name +'</td>';
    html += '<td>'+ item.quantity +'</td>';
    html += '<td>'+ item.price +'</td>';
    html += '<td>'+ total +'</td>';
    html += '<td><button class="btn btn-sm btn-danger delete">Supprimer</button></td>';
    html += '</tr>';
  });
  domBasket.innerHTML = html;
  domTotal.innerText = totals;

  // écoute des boutons de suppression
  let btnsDelete = domBasket.querySelectorAll('.delete');
  for (let i=0; i<btnsDelete.length; i++) {
    btnsDelete[i].addEventListener('click', e => {
      let tr = e.target.parentNode.parentNode;
      let name = tr.querySelector('.name').innerText;

      basket.splice(find(name), 1);
      updateBasket(); // met le DOM à jour après suppression

    })
  }

}

function find(name) {
  let index = -1;

  for (let i=0; i<basket.length; i++) {
    if (basket[i].name == name) {
      index = i;
      break;
    }
  }

  return index;
}

function init() {
  addEvents();
}

init();