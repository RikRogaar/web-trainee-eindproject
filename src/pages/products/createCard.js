import El from "./createEl.js";

const rowEl = document.querySelector('.row-items');

class Card {
    createCard(itemObj) {
        let colEl = El.createElement("div", "col col-lg-4 col-md-6 col-sm-6 mb-3");
        let cardEl = El.createElement("div", "card card-bg shadow rounded-5");
        let imgEl = El.createElement("img", "card-img-top rounded-bottom rounded-5");
        let cardBodyEl = El.createElement("div", "card-body");
        let titleEl = El.createElement("h5", "card-title");
        let priceEl = El.createElement("p", "card-text");
        let buttonEl = El.createElement("button", "btn btn-color text-dark add-to-cart-btn");

        imgEl.src = itemObj.image;
        titleEl.innerText = itemObj.title;
        priceEl.innerText = `${itemObj.price} bits`;
        buttonEl.innerText = "Add to cart";

        buttonEl.addEventListener("click", () => {
            const shoppingCartEl = document.querySelector('#shoppingCart');

            this.addToCart(itemObj);
            let cartItemCount = 0;
            let cart = JSON.parse(localStorage.getItem("cart"));
            cartItemCount = cart.length;
            shoppingCartEl.innerText = "";
            shoppingCartEl.innerText = `Shopping Cart (${cartItemCount})`;
        });

        cardEl.style.width = "18rem";
        imgEl.width = "100%";
        imgEl.height = "180";

        rowEl.appendChild(colEl);
        colEl.appendChild(cardEl);
        cardEl.appendChild(imgEl);
        cardEl.appendChild(cardBodyEl);
        cardBodyEl.appendChild(titleEl);
        cardBodyEl.appendChild(priceEl);
        cardBodyEl.appendChild(buttonEl);
    }

    addToCart(itemObj) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!cart) {
            cart = [];
        }
        cart.push(itemObj);

        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

export default new Card();