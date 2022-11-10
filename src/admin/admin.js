import El from '../createElement.js';

const tBodyEl = document.querySelector(".t-body");
const containerEl = document.querySelector(".container");
const addBtnEl = document.querySelector(".addBtn");
const restoreBtnEl = document.querySelector('#restoreBtn');
const clearCartBtnEl = document.querySelector('#clearCartBtn');

let shopItems = JSON.parse(localStorage.getItem('shopItems'));

shopItems.forEach((item) => {
    createInfo(item);
});

function findMaxId() {
    let maxId = 0;
    shopItems.forEach((item) => {
        if (item.id > maxId) {
            maxId = item.id;
        }
    });
    return maxId;
}

createAddModal();

function createInfo(item) {
    const modalEl = createModal(item);
    const trEl = El.createElement('tr', `item${item.id}`);
    const thEl = El.createElement('th', '');
    const td1El = El.createElement('td', '');
    const td2El = El.createElement('td', '');
    const td3El = El.createElement('td', '');
    const td4El = El.createElement('td', '');
    const aEl = El.createElement('a', 'btn btn-color');
    const deleteEl = El.createElement('button', 'btn btn-danger');

    thEl.innerText = item.category;
    td1El.innerText = item.title;
    td2El.innerText = item.price;
    aEl.innerText = 'Edit';
    aEl.setAttribute('data-bs-toggle', 'modal');
    aEl.setAttribute('data-bs-target', `#staticBackdrop${item.id}`);
    deleteEl.innerText = 'Delete';
    deleteEl.addEventListener('click', () => {
        deleteItem(item);
    });

    trEl.appendChild(thEl);
    trEl.appendChild(td1El);
    trEl.appendChild(td2El);
    trEl.appendChild(td3El);
    trEl.appendChild(td4El);
    trEl.appendChild(modalEl);
    td3El.appendChild(aEl);
    td4El.appendChild(deleteEl);

    tBodyEl.appendChild(trEl);
}

function createModal(item) {
    // modal
    const modalEl = El.createElement('div', `modal fade`);
    modalEl.setAttribute('id', `staticBackdrop${item.id}`);
    modalEl.setAttribute('data-bs-backdrop', 'static');
    modalEl.setAttribute('data-bs-keyboard', 'false');
    modalEl.setAttribute('tabindex', '-1');
    modalEl.setAttribute('aria-labelledby', 'staticBackdropLabel');
    modalEl.setAttribute('aria-hidden', 'true');
    const modalDialogEl = El.createElement('div', 'modal-dialog');
    const modalContentEl = El.createElement('div', 'modal-content');
    const modalHeaderEl = El.createElement('div', 'modal-header');
    const modalTitleEl = El.createElement('h1', 'modal-title fs-5');
    const modalCloseBtnEl = El.createElement('button', 'btn-close');
    const modalBodyEl = El.createElement('div', 'modal-body');
    const modalFooterEl = El.createElement('div', 'modal-footer');
    const modalCloseBtn2El = El.createElement('button', 'btn btn-secondary');
    const modalSaveBtnEl = El.createElement('button', 'btn btn-primary');

    modalSaveBtnEl.addEventListener('click', () => {
        validateEditForm(item);
        // saveChanges(item);
    });

    // form
    const formEl = El.createElement('form', 'text-dark');
    const categoryGroup1El = El.createElement('div', 'mb-3 category-group1');
    const categoryLabel1El = El.createElement('label', 'form-label');
    const categoryInputEl = El.createElement('input', 'form-control');
    const nameGroup2El = El.createElement('div', 'mb-3 name-group2');
    const nameLabel2El = El.createElement('label', 'form-label');
    const nameInputEl = El.createElement('input', 'form-control');
    const priceGroup3El = El.createElement('div', 'mb-3 price-group3');
    const priceLabel3El = El.createElement('label', 'form-label');
    const priceInputEl = El.createElement('input', 'form-control');
    const imageGroup4El = El.createElement('div', 'mb-3 image-group4');
    const imageLabel4El = El.createElement('label', 'form-label');
    const imageInputEl = El.createElement('input', 'form-control');

    categoryLabel1El.innerText = 'Category';
    categoryInputEl.setAttribute('type', 'text');
    categoryInputEl.setAttribute('id', `category${item.id}`);
    categoryInputEl.setAttribute('value', item.category);

    nameLabel2El.innerText = 'Name';
    nameInputEl.setAttribute('type', 'text');
    nameInputEl.setAttribute('id', `name${item.id}`);
    nameInputEl.setAttribute('value', item.title);

    priceLabel3El.innerText = 'Price';
    priceInputEl.setAttribute('type', 'text');
    priceInputEl.setAttribute('id', `price${item.id}`);
    priceInputEl.setAttribute('value', item.price);

    imageLabel4El.innerText = 'Image';
    imageInputEl.setAttribute('type', 'text');
    imageInputEl.setAttribute('id', `image${item.id}`);
    imageInputEl.setAttribute('value', item.image);

    formEl.appendChild(categoryGroup1El);
    categoryGroup1El.appendChild(categoryLabel1El);
    categoryGroup1El.appendChild(categoryInputEl);
    formEl.appendChild(nameGroup2El);
    nameGroup2El.appendChild(nameLabel2El);
    nameGroup2El.appendChild(nameInputEl);
    formEl.appendChild(priceGroup3El);
    priceGroup3El.appendChild(priceLabel3El);
    priceGroup3El.appendChild(priceInputEl);
    formEl.appendChild(imageGroup4El);
    imageGroup4El.appendChild(imageLabel4El);
    imageGroup4El.appendChild(imageInputEl);

    //modal
    modalTitleEl.innerText = 'Edit item';
    modalCloseBtnEl.setAttribute('type', 'button');
    modalCloseBtnEl.setAttribute('data-bs-dismiss', 'modal');
    modalCloseBtnEl.setAttribute('aria-label', 'Close');
    modalCloseBtn2El.setAttribute('type', 'button');
    modalCloseBtn2El.setAttribute('data-bs-dismiss', 'modal');
    modalCloseBtn2El.innerText = 'Close';
    modalSaveBtnEl.setAttribute('type', 'button');
    modalSaveBtnEl.innerText = 'Save changes';

    modalHeaderEl.appendChild(modalTitleEl);
    modalHeaderEl.appendChild(modalCloseBtnEl);
    modalFooterEl.appendChild(modalCloseBtn2El);
    modalFooterEl.appendChild(modalSaveBtnEl);
    modalContentEl.appendChild(modalHeaderEl);
    modalContentEl.appendChild(modalBodyEl);
    modalContentEl.appendChild(modalFooterEl);
    modalDialogEl.appendChild(modalContentEl);
    modalEl.appendChild(modalDialogEl);
    modalBodyEl.appendChild(formEl);

    return modalEl;
}

function saveChanges(item) {
    const category = document.getElementById(`category${item.id}`).value;
    const name = document.getElementById(`name${item.id}`).value;
    const price = document.getElementById(`price${item.id}`).value;

    const newItem = {
        id: item.id,
        title: name,
        image: item.image,
        price: Number(price),
        description: item.description,
        category: category,
        rating: item.rating,
    };

    //close modal
    const modal = document.getElementById(`staticBackdrop${item.id}`);
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();

    //update item and table
    let shopItems = JSON.parse(localStorage.getItem('shopItems'));
    const index = shopItems.findIndex((el) => el.id === item.id);
    shopItems[index] = newItem;
    localStorage.setItem('shopItems', JSON.stringify(shopItems));
    updateTable();

    // update cart
    let cartItems = JSON.parse(localStorage.getItem('cart'));
    if (cartItems) {
        cartItems.forEach((el, i) => {
            if (el.id === item.id) {
                cartItems[i] = newItem;
            }
        });
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    //show alert
    const alertEl = El.createElement('div', 'alert alert-success alert-dismissible fade show');
    alertEl.setAttribute('role', 'alert');
    alertEl.innerText = 'Item updated successfully';
    const alertBtnEl = El.createElement('button', 'btn-close');
    alertBtnEl.setAttribute('type', 'button');
    alertBtnEl.setAttribute('data-bs-dismiss', 'alert');
    alertBtnEl.setAttribute('aria-label', 'Close');
    alertEl.appendChild(alertBtnEl);
    containerEl.appendChild(alertEl);

    setTimeout(() => {
        alertEl.remove();
    }
    , 3000);
}

function updateTable() {
    const shopItems = JSON.parse(localStorage.getItem('shopItems'));
    const tableBodyEl = document.querySelector('.t-body');
    tableBodyEl.innerHTML = '';
    shopItems.forEach((item) => {
        createInfo(item);
    });
}

function createAddModal() {
        // modal
        const modalEl = El.createElement('div', `modal fade`);
        modalEl.setAttribute('id', `staticBackdropAdd`);
        modalEl.setAttribute('data-bs-backdrop', 'static');
        modalEl.setAttribute('data-bs-keyboard', 'false');
        modalEl.setAttribute('tabindex', '-1');
        modalEl.setAttribute('aria-labelledby', 'staticBackdropLabel');
        modalEl.setAttribute('aria-hidden', 'true');
        const modalDialogEl = El.createElement('div', 'modal-dialog');
        const modalContentEl = El.createElement('div', 'modal-content');
        const modalHeaderEl = El.createElement('div', 'modal-header');
        const modalTitleEl = El.createElement('h1', 'modal-title fs-5 text-dark');
        const modalCloseBtnEl = El.createElement('button', 'btn-close');
        const modalBodyEl = El.createElement('div', 'modal-body');
        const modalFooterEl = El.createElement('div', 'modal-footer');
        const modalCloseBtn2El = El.createElement('button', 'btn btn-secondary');
        const modalAddBtnEl = El.createElement('button', 'btn btn-color');

        // form
        const formEl = El.createElement('form', 'text-dark');
        const categoryGroup1El = El.createElement('div', 'mb-3 category-group');
        const categoryLabel1El = El.createElement('label', 'form-label');
        const categoryInputEl = El.createElement('input', 'form-control');
        const nameGroup2El = El.createElement('div', 'mb-3 name-group');
        const nameLabel2El = El.createElement('label', 'form-label');
        const nameInputEl = El.createElement('input', 'form-control');
        const priceGroup3El = El.createElement('div', 'mb-3 price-group');
        const priceLabel3El = El.createElement('label', 'form-label');
        const priceInputEl = El.createElement('input', 'form-control');
        const imgGroup4El = El.createElement('div', 'mb-3 img-group');
        const imgLabel4El = El.createElement('label', 'form-label');
        const imgInputEl = El.createElement('input', 'form-control');

        categoryLabel1El.innerText = 'Category';
        categoryInputEl.setAttribute('type', 'text');
        categoryInputEl.setAttribute('id', `categoryAdd`);
        categoryInputEl.setAttribute('value', '');

        nameLabel2El.innerText = 'Name';
        nameInputEl.setAttribute('type', 'text');
        nameInputEl.setAttribute('id', `nameAdd`);

        priceLabel3El.innerText = 'Price';
        priceInputEl.setAttribute('type', 'text');
        priceInputEl.setAttribute('id', `priceAdd`);

        imgLabel4El.innerText = 'Image';
        imgInputEl.setAttribute('type', 'text');
        imgInputEl.setAttribute('id', `imgAdd`);

        formEl.appendChild(categoryGroup1El);
        categoryGroup1El.appendChild(categoryLabel1El);
        categoryGroup1El.appendChild(categoryInputEl);
        formEl.appendChild(nameGroup2El);
        nameGroup2El.appendChild(nameLabel2El);
        nameGroup2El.appendChild(nameInputEl);
        formEl.appendChild(priceGroup3El);
        priceGroup3El.appendChild(priceLabel3El);
        priceGroup3El.appendChild(priceInputEl);
        formEl.appendChild(imgGroup4El);
        imgGroup4El.appendChild(imgLabel4El);
        imgGroup4El.appendChild(imgInputEl);

        modalTitleEl.innerText = 'Add new item';

        modalAddBtnEl.addEventListener('click', (e) => {
            e.preventDefault();
            validateAddForm();
            // addItem();
        });

        //modal
        modalTitleEl.innerText = 'Edit item';
        modalCloseBtnEl.setAttribute('type', 'button');
        modalCloseBtnEl.setAttribute('data-bs-dismiss', 'modal');
        modalCloseBtnEl.setAttribute('aria-label', 'Close');
        modalCloseBtn2El.setAttribute('type', 'button');
        modalCloseBtn2El.setAttribute('data-bs-dismiss', 'modal');
        modalCloseBtn2El.innerText = 'Close';
        modalAddBtnEl.setAttribute('type', 'button');
        modalAddBtnEl.innerText = 'Save changes';

        modalHeaderEl.appendChild(modalTitleEl);
        modalHeaderEl.appendChild(modalCloseBtnEl);
        modalFooterEl.appendChild(modalCloseBtn2El);
        modalFooterEl.appendChild(modalAddBtnEl);
        modalContentEl.appendChild(modalHeaderEl);
        modalContentEl.appendChild(modalBodyEl);
        modalContentEl.appendChild(modalFooterEl);
        modalDialogEl.appendChild(modalContentEl);
        modalEl.appendChild(modalDialogEl);
        modalBodyEl.appendChild(formEl);

        addBtnEl.appendChild(modalEl);

}

function addItem() {
    let highestId = findMaxId() + 1;
    const category = document.getElementById(`categoryAdd`).value;
    const name = document.getElementById(`nameAdd`).value;
    const price = document.getElementById(`priceAdd`).value;
    const image = document.getElementById(`imgAdd`).value;

    const newItem = {
        id: highestId,
        title: name,
        price: Number(price),
        image: image,
        // description: item.description,
        category: category,
        // rating: item.rating,
    };

    //close modal
    const modal = document.getElementById(`staticBackdropAdd`);
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();

    //update item and table
    let shopItems = JSON.parse(localStorage.getItem('shopItems'));
    shopItems.push(newItem);
    localStorage.setItem('shopItems', JSON.stringify(shopItems));
    updateTable();

    alert('Item updated successfully');
}

function deleteItem(item) {
    let shopItems = JSON.parse(localStorage.getItem('shopItems'));
    shopItems = shopItems.filter((i) => i.id !== item.id);
    localStorage.setItem('shopItems', JSON.stringify(shopItems));
    updateTable();

    let cartItems = JSON.parse(localStorage.getItem('cart'));
    cartItems = cartItems.filter((i) => i.id !== item.id);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    alert('Item deleted successfully');

}

function alert(text) {
    const alertEl = El.createElement('div', 'alert alert-success alert-dismissible fade show position-sticky top-0 z-index-1');
    alertEl.setAttribute('role', 'alert');
    alertEl.innerText =  `${text}`;
    const alertBtnEl = El.createElement('button', 'btn-close');
    alertBtnEl.setAttribute('type', 'button');
    alertBtnEl.setAttribute('data-bs-dismiss', 'alert');
    alertBtnEl.setAttribute('aria-label', 'Close');
    alertEl.appendChild(alertBtnEl);
    containerEl.appendChild(alertEl);

    setTimeout(() => {
        alertEl.remove();
    }
    , 3000);
}

async function getItemData() {
    const res = await fetch('https://fakestoreapi.com/products');
    let fetchedData = await res.json();

    return fetchedData;
}

restoreBtnEl.addEventListener('click', () => {
    shopItems = getItemData();
    shopItems.then((data) => {
        localStorage.setItem('shopItems', JSON.stringify(data));
        updateTable();
    });
    alert('Items restored successfully');
});


function validateAddForm() {
    const category = document.getElementById(`categoryAdd`).value;
    const categoryGroupEl = document.querySelector(`.category-group`);
    const name = document.getElementById(`nameAdd`).value;
    const nameGroupEl = document.querySelector(`.name-group`);
    const price = document.getElementById(`priceAdd`).value;
    const priceGroupEl = document.querySelector(`.price-group`);
    const image = document.getElementById(`imgAdd`).value;
    const imgGroupEl = document.querySelector(`.img-group`);

    if (category === '') {
        if (!categoryGroupEl.querySelector('.error')) {
            const errorEl = El.createElement('div', 'error text-danger');
            errorEl.innerText = 'Please select a category';
            categoryGroupEl.appendChild(errorEl);
        }
    } else {
        if (categoryGroupEl.querySelector('.error')) {
            categoryGroupEl.querySelector('.error').remove();
        }
    }

    if (name === '') {
        if (!nameGroupEl.querySelector('.error')) {
            const errorEl = El.createElement('div', 'error text-danger');
            errorEl.innerText = 'Please enter a name';
            nameGroupEl.appendChild(errorEl);
        }
    } else {
        if (nameGroupEl.querySelector('.error')) {
            nameGroupEl.querySelector('.error').remove();
        }
    }

    if (price === '') {
        if (!priceGroupEl.querySelector('.error')) {
            const errorEl = El.createElement('div', 'error text-danger');
            errorEl.innerText = 'Please enter a price';
            priceGroupEl.appendChild(errorEl);
        }
    } else {
        if (priceGroupEl.querySelector('.error')) {
            priceGroupEl.querySelector('.error').remove();
        }

        if (isNaN(price) || (price.split('.')[1] && price.split('.')[1].length > 2)) {
            if (!priceGroupEl.querySelector('.error')) {
                const errorEl = El.createElement('div', 'error text-danger');

                errorEl.innerText = 'Please enter a valid price';
                priceGroupEl.appendChild(errorEl);
            }
        } else {
            if (priceGroupEl.querySelector('.error')) {
                priceGroupEl.querySelector('.error').remove();
            }
        }
    }

    if (image === '') {
        if (!imgGroupEl.querySelector('.error')) {
            const errorEl = El.createElement('div', 'error text-danger');
            errorEl.innerText = 'Please enter an image url';
            imgGroupEl.appendChild(errorEl);
        }
    } else {
        if (imgGroupEl.querySelector('.error')) {
            imgGroupEl.querySelector('.error').remove();
        }
    }

    if (!categoryGroupEl.querySelector('.error') && !nameGroupEl.querySelector('.error') && !priceGroupEl.querySelector('.error') && !imgGroupEl.querySelector('.error')) {
        addItem();
    }
}

function validateEditForm(item) {
    const categoryGroupEl = document.querySelector(`.category-group1`);
    const category = document.getElementById(`category${item.id}`).value;
    const nameGroupEl = document.querySelector(`.name-group2`);
    const name = document.getElementById(`name${item.id}`).value;
    const priceGroupEl = document.querySelector(`.price-group3`);
    const price = document.getElementById(`price${item.id}`).value;
    const imgGroupEl = document.querySelector(`.image-group4`);
    const image = document.getElementById(`image${item.id}`).value;

    if (category === '') {
        if (!categoryGroupEl.querySelector('.error')) {
            const errorEl = El.createElement('div', 'error text-danger');
            errorEl.innerText = 'Please select a category';
            categoryGroupEl.appendChild(errorEl);
        }
    } else {
        if (categoryGroupEl.querySelector('.error')) {
            categoryGroupEl.querySelector('.error').remove();
        }
    }

    if (name === '') {
        if (!nameGroupEl.querySelector('.error')) {
            const errorEl = El.createElement('div', 'error text-danger');
            errorEl.innerText = 'Please enter a name';
            nameGroupEl.appendChild(errorEl);
        }
    } else {
        if (nameGroupEl.querySelector('.error')) {
            nameGroupEl.querySelector('.error').remove();
        }
    }

    if (price === '') {
        if (!priceGroupEl.querySelector('.error')) {
            const errorEl = El.createElement('div', 'error text-danger');
            errorEl.innerText = 'Please enter a price';
            priceGroupEl.appendChild(errorEl);
        }
    } else {
        if (priceGroupEl.querySelector('.error')) {
            priceGroupEl.querySelector('.error').remove();
        }

        if (isNaN(price) || (price.split('.')[1] && price.split('.')[1].length > 2)) {
            if (!priceGroupEl.querySelector('.error')) {
                const errorEl = El.createElement('div', 'error text-danger');

                errorEl.innerText = 'Please enter a valid price';
                priceGroupEl.appendChild(errorEl);
            }
        } else {
            if (priceGroupEl.querySelector('.error')) {
                priceGroupEl.querySelector('.error').remove();
            }
        }
    }

    if (image === '') {
        if (!imgGroupEl.querySelector('.error')) {
            const errorEl = El.createElement('div', 'error text-danger');
            errorEl.innerText = 'Please enter an image url';
            imgGroupEl.appendChild(errorEl);
        }
    } else {
        if (imgGroupEl.querySelector('.error')) {
            imgGroupEl.querySelector('.error').remove();
        }
    }

    if (!categoryGroupEl.querySelector('.error') && !nameGroupEl.querySelector('.error') && !priceGroupEl.querySelector('.error') && !imgGroupEl.querySelector('.error')) {
        saveChanges(item);
    }
}


clearCartBtnEl.addEventListener('click', () => {
    localStorage.setItem('cart', JSON.stringify([]));
    updateTable();
    alert('Cart cleared successfully');
});