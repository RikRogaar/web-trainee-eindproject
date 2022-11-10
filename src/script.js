// shoppingCart
const shoppingCartEl = document.querySelector('#shoppingCart');

// cartItemCount
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