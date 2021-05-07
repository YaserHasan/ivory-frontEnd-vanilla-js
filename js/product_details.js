async function main() {
    UiUtils.showLoadingView();
    await checkIfProductInCart();
    await buildProductDetails();
    UiUtils.hideLoadingView();
}

// get productID
const productID = FormatUtils.getURLParam(window.location.href, 'ID');

let isInCart;
const productImage = document.querySelector('#product-image');
const addToCartBtn = document.querySelector('#add-to-cart-btn');

main();

// build product details
async function buildProductDetails() {
    // get product details
    const product = await ProductsService.getProductDetails(productID);
    // update page title
    UiUtils.updatePageTitle(product.name, true);
    // update html
    updateHTMLProductDetails(product);
    // show hidden elements
    showHiddenElements();
}

function updateHTMLProductDetails(product) {
    // update product id hidden input
    document.querySelector('#product-id').value = product.id;
    updateElementText('product-name', product.name);
    updateElementText('product-description', product.description);
    updateElementText('product-price', `${product.price}&#8362;`);
    // update image
    const productImage = document.querySelector('#product-image');
    productImage.src = product.imageURL;
    productImage.alt = product.name;
    // update product specs
    const productSpecsTable = document.querySelector('#product-specs-table');
    product.specs.forEach(spec => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><h4>${spec.name}</h4></td>
            <td><p>${spec.value}</p></td>
        `;
        productSpecsTable.append(tr);
    });
}

function updateElementText(elementID, text) {
    const element = document.querySelector(`#${elementID}`);
    element.innerHTML = text;
}

async function checkIfProductInCart() {
    isInCart = await CartService.isProductInUserCart(productID);
    if (isInCart) {
        addToCartBtn.classList.add('btn-danger');
        addToCartBtn.textContent = 'REMOVE FROM CART';
    }
    else {
        addToCartBtn.classList.remove('btn-danger');
        addToCartBtn.textContent = 'ADD TO CART';
    } 
}

function showHiddenElements() {
    productImage.classList.remove('hidden');
    addToCartBtn.classList.remove('hidden');
}

addToCartBtn.addEventListener('click', async () => {
    const isLoggedIn = await AuthService.isLoggedIn();
    if (!isLoggedIn)
        return window.location.assign('login.html');
    
    UiUtils.showLoadingView();
    if (isInCart)
        await CartService.removeProductFromUserCart(productID);
    else
        await CartService.addProductToUserCart(productID);

    await checkIfProductInCart();
    UiUtils.hideLoadingView();
});