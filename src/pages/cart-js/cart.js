import Summary from "./summary/summary.js";
import CartLogic from "./cart-logic.js";

let cart = JSON.parse(localStorage.getItem("cart"));
let shopItems = JSON.parse(localStorage.getItem("shopItems"));
const orderBtn = document.querySelector(".orderBtn");
const shoppingCartEl = document.querySelector('#shoppingCart');

setup();

function setup() {
    setupCards(cart);
    Summary.createShippingSelect();
    Summary.showSummaryItems(cart);
    orderBtn.addEventListener("click", () => {
        CartLogic.order();
    });

    showCartCount();

}

function setupCards(cart) {
    let cartItems = new Map();

    cart.forEach((cartItem) => {
        if (cartItems.has(cartItem.id)) {
            cartItems.set(cartItem.id, cartItems.get(cartItem.id) + 1);
        } else {
            cartItems.set(cartItem.id, 1);
        }
    });

    cartItems.forEach((cartItemCount, cartItemId) => {
        let itemObj = shopItems.find((shopItem) => shopItem.id === cartItemId);
        createCard(itemObj, cartItemCount);
    });
}

function createCard(itemObj, cartItemCount) {
    const itemContainerEl = document.querySelector(".items-container");
    const rowEl = createElement("div", "row mb-4 d-flex justify-content-between align-items-center");
    const col1El = createElement("div", "col-md-2 col-lg-2 col-xl-2");
    const imgEl = createElement("img", "img-fluid rounded-3");
    const col2El = createElement("div", "col-md-3 col-lg-3 col-xl-3");
    const titleEl = createElement("h6", "mb-0");
    const categoryEl = createElement("h6", "");
    const col3El = createElement("div", "col-md-3 col-lg-3 col-xl-2 d-flex");
    const minusBtn = createElement("button", "btn btn-link px-2");
    const minusIcon = createElement("i", "fas fa-minus");
    const inputEl = createElement("input", "form-control form-control-sm amountCount");
    const plusBtn = createElement("button", "btn btn-link px-2");
    const plusIcon = createElement("i", "fas fa-plus");
    const col4El = createElement("div", "col-md-3 col-lg-2 col-xl-2 offset-lg-1");
    const priceEl = createElement("h6", "mb-0");
    const col5El = createElement("div", "col-md-1 col-lg-1 col-xl-1 text-end");
    const deleteBtn = createElement("a", "");
    const deleteIcon = createElement("i", "fas fa-times");
    const hrEl = createElement("hr", "my-4");

    imgEl.src = itemObj.image;
    imgEl.alt = itemObj.title;
    titleEl.innerText = itemObj.title;
    categoryEl.innerText = itemObj.category;
    minusIcon.style.color = "#b0d5fa";
    minusBtn.addEventListener("click", () => {
        CartLogic.removeOne(itemObj.id, shopItems);
        location.reload();
    });
    inputEl.min = 0;
    inputEl.name = "quantity";
    inputEl.type = "number";
    inputEl.setAttribute("readonly", "readonly");
    inputEl.value = cartItemCount;
    inputEl.style.cursor = "default";
    plusIcon.style.color = "#b0d5fa";
    plusBtn.addEventListener("click", () => {
        CartLogic.addOne(itemObj.id, shopItems);
        location.reload();
    });
    priceEl.innerText = itemObj.price + " bits";
    deleteIcon.style.color = "red";
    deleteIcon.style.cursor = "pointer";
    deleteBtn.addEventListener("click", () => {
        CartLogic.removeAll(itemObj.id);
        location.reload();
    });

    rowEl.appendChild(col1El);
    col1El.appendChild(imgEl);
    rowEl.appendChild(col2El);
    col2El.appendChild(titleEl);
    col2El.appendChild(categoryEl);
    rowEl.appendChild(col3El);
    col3El.appendChild(minusBtn);
    minusBtn.appendChild(minusIcon);
    col3El.appendChild(inputEl);
    col3El.appendChild(plusBtn);
    plusBtn.appendChild(plusIcon);
    rowEl.appendChild(col4El);
    col4El.appendChild(priceEl);
    rowEl.appendChild(col5El);
    col5El.appendChild(deleteBtn);
    deleteBtn.appendChild(deleteIcon);

    itemContainerEl.appendChild(rowEl);
    itemContainerEl.appendChild(hrEl);
}

function createElement(element, className) {
    let x = document.createElement(element);
    x.setAttribute("class", className);
    return x;
}

function showCartCount() {
    let cartItemCount = 0;
    let cart = localStorage.getItem('cart');

    if (cart) {
        cart = JSON.parse(cart);
        cartItemCount = cart.length;
        console.log(cartItemCount);
        shoppingCartEl.innerText = `Shopping Cart (${cartItemCount})`;
    } else {
        shoppingCartEl.innerText = 'Shopping Cart (0)';
    }
}