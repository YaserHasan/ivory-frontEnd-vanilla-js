// build navbar
document.querySelector('#nav-placeholder').replaceWith(UiUtils.buildNavBar());
// footer
document.querySelector('#footer-placeholder').replaceWith(UiUtils.buildFooter());

// build categories
async function buildCategories() {
    const categoriesSection = document.querySelector('#categories-section');
    const categories = await ProductsService.getCategories();
    categories.forEach((category) => {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category');
        categoryElement.innerHTML = `
            <a href="#">
                <input type="hidden" id="category-id" value="${category.id}">
                <img src="${category.imageURL}" alt="category">
                <h3>${category.name}</h3>
            </a>
        `;
        categoriesSection.append(categoryElement);
    });
}

// build featured products
async function buildFeaturedProducts() {
    const featuredProductsGrid = document.querySelector('#featured-products-grid');
    const featuredProducts = await ProductsService.getFeaturedProducts();
    featuredProducts.forEach((product) => {
        const productElement = document.createElement('div');
        productElement.classList.add('card');
        productElement.classList.add('vertical-product-view');
        productElement.innerHTML = `
            <a href="#">
                <input type="hidden" id="category-id" value="${product.id}">
                <img src=${product.imageURL} alt="Product">
                <p>${product.name}</p>
                <h2>${product.price}&#8362;</h2>
            </a>
        `;
        featuredProductsGrid.append(productElement);
    });
}

// build most popular products
async function buildMostPopularProducts() {
    const mostPopularProductsGrid = document.querySelector('#most-popular-products-grid');
    const mostPopularProducts = await ProductsService.getMostPopularProducts();
    mostPopularProducts.forEach((product) => {
        const productElement = document.createElement('div');
        productElement.classList.add('card');
        productElement.classList.add('vertical-product-view');
        productElement.innerHTML = `
            <a href="#">
                <input type="hidden" id="category-id" value="${product.id}">
                <img src=${product.imageURL} alt="Product">
                <p>${product.name}</p>
                <h2>${product.price}&#8362;</h2>
            </a>
        `;
        mostPopularProductsGrid.append(productElement);
    });
}




buildCategories();
buildFeaturedProducts();
buildMostPopularProducts();

