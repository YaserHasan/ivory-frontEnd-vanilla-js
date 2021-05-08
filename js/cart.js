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
    userCartProducts = await CartService.getUserCart();
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
    userCartProducts.forEach(product => {
        cartProductsSection.appendChild(UiUtils.buildHorizontalProductView(product, true));
    });
}

