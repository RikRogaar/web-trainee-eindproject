import Card from "./createCard.js";
import El from "./createEl.js";

const rowEl = document.querySelector('.row-items');
const itemsFoundEl = document.querySelector('.itemsFound');
const categorySelectEl = document.querySelector(".category-select");
const cardCountEl = document.querySelector(".card-count");
const cardTotalEl = document.querySelector(".card-total");
const shoppingCartEl = document.querySelector('#shoppingCart');
const cardIncrease = 9;

let shopItems = JSON.parse(localStorage.getItem("shopItems"));
let clothing = [];
let cardLimit;
let categories = [];
let currentPage = 1;
let throttleTimer;
const pageCount = Math.ceil(cardLimit / cardIncrease);
let cartItemCount = 0;
let cart = localStorage.getItem('cart');

setup();

async function getItemData() {
    const res = await fetch('https://fakestoreapi.com/products');
    let fetchedData = await res.json();

    return fetchedData;
}

async function setup() {
    shopItems = JSON.parse(localStorage.getItem("shopItems"));
    if (!shopItems) {
        shopItems = await getItemData();
        save();
    }

    cardLimit += shopItems.length;

    show();
}

async function show() {
    window.onload = () => {
        addCards(currentPage);
    };

    window.addEventListener("scroll", handleInfiniteScroll);

    findCategories(shopItems);
    createItemCategorySelect(categories);

    showItemsFound();
    filters();

    showCartCount();
}


async function save() {
    window.localStorage.setItem("shopItems", JSON.stringify(shopItems));
}

function createItemCategorySelect(catagories) {
    catagories.forEach((category, index) => {
        let amount = shopItems.filter((item) => item.category === category).length;

        const labelEL = El.createElement("label", `form-check mb-2`);
        const inputEl = El.createElement("input", `form-check-input category-${index + 1}`);
        const spanEl = El.createElement("span", "form-check-label");
        const badgeEl = El.createElement("b", "badge rounded-pill bubble-bg float-end");

        inputEl.type = "checkbox";
        inputEl.id = `category-${index + 1}`;
        spanEl.innerHTML = category;
        badgeEl.innerText = amount;
        labelEL.htmlFor = `category-${index + 1}`;

        labelEL.appendChild(inputEl);
        labelEL.appendChild(spanEl);
        labelEL.appendChild(badgeEl);

        categorySelectEl.appendChild(labelEL);
    });
}

function showItemsFound() {
    itemsFoundEl.innerHTML = `${shopItems.length} items found`;
}

function findCategories(shopItemsCategories) {
    shopItemsCategories.forEach((shopItem) => {
        if (!categories.includes(shopItem.category)) {
            categories.push(shopItem.category);
        }
    });

    return categories;
}

function throttle(callback, time) {
    if (throttleTimer) return;

    throttleTimer = true;

    setTimeout(() => {
        callback();
        throttleTimer = false;
    }, time);
}

function addCards(pageIndex) {
    currentPage = pageIndex;

    const startRange = (pageIndex - 1) * cardIncrease;
    const endRange = currentPage == pageCount ? cardLimit : pageIndex * cardIncrease;

    cardCountEl.innerText = endRange;
    cardTotalEl.innerText = shopItems.length;

    for (let i = startRange + 1; i <= endRange; i++) {
        Card.createCard(shopItems[i]);
    }
}

function handleInfiniteScroll() {
    throttle(() => {
        const endOfPage =
          window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

        if (endOfPage) {
            addCards(currentPage + 1);
        }

        if (currentPage === pageCount) {
            removeInfiniteScroll();
        }
    }, 1000);
}

function removeInfiniteScroll() {
    let loader;
    loader.remove();
    window.removeEventListener("scroll", handleInfiniteScroll);
}

function filters() {
    categorySelectEl.addEventListener("click", (e) => {
        if (e.target.classList.contains("form-check-input")) {
            let category = e.target.nextElementSibling.innerText;

            let filtered = shopItems.filter((item) => { return item.category === category; });

            rowEl.innerHTML = "";
            filtered.forEach((item) => {
                Card.createCard(item);
            });

            showItemsFound();
        }

        if (!e.target.checked) {
            rowEl.innerHTML = "";
            shopItems.forEach((item) => {
                Card.createCard(item);
            });
            showItemsFound();
        } else if (e.target.checked) {
            for (let i = 0; i < categorySelectEl.children.length; i++) {
                if (categorySelectEl.children[i].firstChild.checked) {
                    categorySelectEl.children[i].firstChild.checked = false;
                }
            }
            e.target.checked = true;
        }
    });
}

function showCartCount() {
    if (cart) {
        cart = JSON.parse(cart);
        cartItemCount = cart.length;
        console.log(cartItemCount);
        shoppingCartEl.innerText = `Shopping Cart (${cartItemCount})`;
    } else {
        shoppingCartEl.innerText = 'Shopping Cart (0)';
    }
}