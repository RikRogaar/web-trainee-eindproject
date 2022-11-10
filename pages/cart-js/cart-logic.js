import El from '../../createElement.js';

class CartLogic {
    addOne(id, shopItems) {
        let cart = JSON.parse(localStorage.getItem("cart"));

        shopItems.forEach((shopItem) => {
            if (shopItem.id === id) {
                cart.push(shopItem);
            }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    removeOne(id) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let item = cart.find((cartItem) => cartItem.id === id);
        const index = cart.indexOf(item);

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    removeAll(id) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let newCart = cart.filter((item) => item.id !== id);

        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    getTotalPrice(cart) {
        const totalPriceEl = document.querySelector(".totalPrice");

        let totalPrice = 0;

        cart.forEach((cartItem) => {
            totalPrice += cartItem.price;
        });

        totalPriceEl.innerText = Number(totalPrice.toFixed(2)) + " bits";

        return Number(totalPrice.toFixed(2));
    }

    getFinalPrice(cart) {
        const finalPriceEl = document.querySelector(".finalPrice");
        const shippingSelectEl = document.querySelector(".shippingSelect");

        let shippingPrice = 0;
        let totalPrice = this.getTotalPrice(cart);
        let finalPrice = totalPrice + shippingPrice;

        finalPriceEl.innerText = totalPrice + " bits";

        shippingSelectEl.addEventListener("change", () => {
            switch (shippingSelectEl.value) {
                case "0":
                    shippingPrice = 0;
                    break;
                case "1":
                    shippingPrice = 2.50;
                    break;
                case "2":
                    shippingPrice = 2;
                    break;
                case "3":
                    shippingPrice = 1.50;
                    break;
                case "4":
                    shippingPrice = 1;
                    break;
                case "5":
                    shippingPrice = 5;
                    break;
                case "6":
                    shippingPrice = 0;
                    break;
                case "7":
                    shippingPrice = 0;
                    break;
                case "8":
                    shippingPrice = 2.50;
                    break;
                case "9":
                    shippingPrice = 3;
                    break;
                case "10":
                    shippingPrice = 2.50;
                    break;
                default:
                    shippingPrice = 0;
            }

            finalPrice = (totalPrice + shippingPrice);

            finalPriceEl.innerText = `${finalPrice} bits`;
        });
    }

    order() {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let order = [];

        if (cart.length === 0) {
            this.alert("Your cart is empty!");
            return;
        }

        if (document.querySelector(".shippingSelect").value == '0') {
            this.alert("Please select a shipping method!");
            return;
        }

        cart.forEach((itemCart) => {
            order.push(itemCart);
        });

        localStorage.setItem("order", JSON.stringify(order));

        const cartContentEl = document.querySelector(".card-registration");
        cartContentEl.innerHTML = "";
        cartContentEl.style.border = "none";

        this.alert("Your order has been placed!");
        localStorage.setItem("cart", JSON.stringify([]));

        setTimeout(() => {
            window.location.href = "../products/products.html";
        }, 2000);
    }

    alert(text) {
        const containerEl = document.querySelector(".top-container");
        const alertEl = El.createElement('div',
            'alert alert-success alert-dismissible fade show position-sticky top-0 z-index-1');
        alertEl.setAttribute('role', 'alert');
        alertEl.innerText = `${text}`;
        const alertBtnEl = El.createElement('button', 'btn-close');
        alertBtnEl.setAttribute('type', 'button');
        alertBtnEl.setAttribute('data-bs-dismiss', 'alert');
        alertBtnEl.setAttribute('aria-label', 'Close');
        alertEl.appendChild(alertBtnEl);
        containerEl.appendChild(alertEl);

        setTimeout(() => {
            alertEl.remove();
        }, 3000);
    }
}

export default new CartLogic();