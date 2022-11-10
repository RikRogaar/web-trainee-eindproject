import El from "../../../createElement.js";
import Cart from "../cart-logic.js";

const shippingSelectEl = document.querySelector(".shippingSelect");
const shoppingCartTitleEl = document.querySelector(".shoppingCartTitle");
const cartItemCountEl = document.querySelector(".cartItemCount");

class Summary {
    createShippingSelect() {
        const option0 = El.createElement("option", "");
        const dhlGroup = El.createElement("optgroup", "");
        const option1 = El.createElement("option", "");
        const option2 = El.createElement("option", "");
        const postNLGroup = El.createElement("optgroup", "");
        const option3 = El.createElement("option", "");
        const option4 = El.createElement("option", "");
        const option5 = El.createElement("option", "");
        const bitGroup = El.createElement("optgroup", "");
        const option6 = El.createElement("option", "");
        const othersGroup = El.createElement("optgroup", "");
        const option7 = El.createElement("option", "");
        const option8 = El.createElement("option", "");
        const option9 = El.createElement("option", "");
        const option10 = El.createElement("option", "");

        option0.innerText = "Select Shipping";
        option0.setAttribute("selected", "");
        option0.setAttribute("value", "0");
        dhlGroup.label = "DHL";
        option1.value = 1;
        option1.innerHTML = "DHL 2-Day Delivery 2.50 bits";
        option2.value = 2;
        option2.innerHTML = "DHL 24h Delivery 2 bits";
        postNLGroup.label = "PostNL";
        option3.value = 3;
        option3.innerHTML = "PostNL 2-Day Delivery 1.50 bits";
        option4.value = 4;
        option4.innerHTML = "PostNL 24h Delivery 1 bits";
        option5.value = 5;
        option5.innerHTML = "PostNL 12h Delivery 5.00 bits";
        bitGroup.label = "Bit";
        option6.value = 6;
        option6.innerHTML = "Bit 1h Quantum Delivery 0 bits";
        othersGroup.label = "Others";
        option7.value = 7;
        option7.innerHTML = "Pickup 0 bits";
        option8.value = 8;
        option8.innerHTML = "UPS 2-Day Delivery 2.50 bits";
        option9.value = 9;
        option9.innerHTML = "UPS 24h Delivery 3 bits";
        option10.value = 10;
        option10.innerHTML = "FedEx 2-Day Delivery 2.50 bits";

        shippingSelectEl.appendChild(option0);
        shippingSelectEl.appendChild(dhlGroup);
        dhlGroup.appendChild(option1);
        dhlGroup.appendChild(option2);
        shippingSelectEl.appendChild(postNLGroup);
        postNLGroup.appendChild(option3);
        postNLGroup.appendChild(option4);
        postNLGroup.appendChild(option5);
        shippingSelectEl.appendChild(bitGroup);
        bitGroup.appendChild(option6);
        shippingSelectEl.appendChild(othersGroup);
        othersGroup.appendChild(option7);
        othersGroup.appendChild(option8);
        othersGroup.appendChild(option9);
        othersGroup.appendChild(option10);
    }

    showSummaryItems(cart) {
        Cart.getTotalPrice(cart);
        Cart.getFinalPrice(cart);

        shoppingCartTitleEl.innerText = `${cart.length} Items`;
        cartItemCountEl.innerText = `${cart.length} Items`;
    }
}

export default new Summary();