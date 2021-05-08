// navigate to login page if user is not logged in
if (!AuthService.lazyIsLoggedIn())
    window.location.replace('../index.html')

async function main() {
    UiUtils.showLoadingView();
    await buildOrderInfo();
    buildCartProducts();
    UiUtils.hideLoadingView();
}

let userCartProducts;

main();

async function buildOrderInfo() {
    const response = await CartService.getUserCart();
    if (!response.success) return alert(response.message);
    userCartProducts = response.data;
    // calc total price
    const totalPrice = userCartProducts.reduce((currentTotal, product) => {
        return currentTotal + product.productTotalPrice;
    }, 0);
    // calc subTotal price
    const subTotalPrice = totalPrice * 0.83;
    // calc taxes price
    const taxesPrice = totalPrice * 0.17;
    // update html
    document.querySelector('#sub-total').innerHTML = FormatUtils.formatPrice(subTotalPrice);
    document.querySelector('#taxes').innerHTML = FormatUtils.formatPrice(taxesPrice);
    document.querySelector('#total').innerHTML = FormatUtils.formatPrice(totalPrice); 
}

function buildCartProducts() {
    const cartProductsSection = document.querySelector('#cart-products-section');
    // clear products
    cartProductsSection.innerHTML = '';
    userCartProducts.forEach(product => {
        const productElement = UiUtils.buildHorizontalProductView(product, true);
        // add event listeners
        addProductEventListeners(product.id, productElement);
        cartProductsSection.appendChild(productElement);
    });
}

//funcions
async function incremementProductQuantity(productID) {
    UiUtils.showLoadingView();
    const response = await CartService.incrementProductQuantity(productID);
    if (!response.success) {
        UiUtils.hideLoadingView();
        alert(response.message);
        location.reload();
    }
    await buildOrderInfo();
    buildCartProducts();
    UiUtils.hideLoadingView();
}

async function decremementProductQuantity(productID) {
    UiUtils.showLoadingView();
    const response = await CartService.decrementProductQuantity(productID);
    if (!response.success) {
        UiUtils.hideLoadingView();
        alert(response.message);
        location.reload();
    }
    await buildOrderInfo();
    buildCartProducts();
    UiUtils.hideLoadingView();
}

async function removeProductFromCart(productID) {
    UiUtils.showLoadingView();
    const response = await CartService.removeProductFromUserCart(productID);
    if (!response.success) {
        UiUtils.hideLoadingView();
        alert(response.message);
        location.reload();
    }
    await buildOrderInfo();
    buildCartProducts();
    UiUtils.hideLoadingView();
}

async function checkout() {
    UiUtils.showLoadingView();
    const response = await OrdersService.createOrderFromCart();
    UiUtils.hideLoadingView();
    if (!response.success) return alert(response.message);
    window.location.replace('./order_success.html');
}

// event listeners
function addProductEventListeners(productID, productElement) {
    const incBtn = productElement.querySelector('.quantity-action-inc');
    const decBtn = productElement.querySelector('.quantity-action-dec');
    const removeBtn = productElement.querySelector('.cart-product-remove-btn');

    incBtn.addEventListener('click', async () => await incremementProductQuantity(productID));
    decBtn.addEventListener('click', async () => await decremementProductQuantity(productID));
    removeBtn.addEventListener('click', async () => await removeProductFromCart(productID));
}

document.querySelector('#checkout-btn').addEventListener('click', checkout);


