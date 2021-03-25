// build Header
document.querySelector('#header-placeholder').replaceWith(UiUtils.buildHeader());

// build footer
document.querySelector('#footer-placeholder').replaceWith(UiUtils.buildFooter());

// build loading view
document.querySelector('#loading-view-placeholder').replaceWith(UiUtils.buildLoadingView());

async function main() {
    UiUtils.showLoadingView();
    await buildProductDetails();
    UiUtils.hideLoadingView();
}
main();

// build product details
async function buildProductDetails() {
    // get productID
    const productID = FormatUtils.getURLParam(window.location.href, 'ID');
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

function showHiddenElements() {
    document.querySelector('#product-image').classList.remove('hidden');
    document.querySelector('#add-to-cart-btn').classList.remove('hidden');
}