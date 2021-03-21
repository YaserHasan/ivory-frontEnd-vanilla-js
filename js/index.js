// build navbar
document.querySelector('#nav-placeholder').replaceWith(UiUtils.buildNavBar());

// build footer
document.querySelector('#footer-placeholder').replaceWith(UiUtils.buildFooter());

// build loading view
document.querySelector('#loading-view-placeholder').replaceWith(UiUtils.buildLoadingView());

async function main() {
    UiUtils.showLoadingView();
    await buildCategories();
    await buildFeaturedProducts();
    await buildMostPopularProducts();
    UiUtils.hideLoadingView();
}
main();

// build categories
async function buildCategories() {
    const categoriesSection = document.querySelector('#categories-section');
    const categories = await ProductsService.getCategories();
    categories.forEach((category) => {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category');
        categoryElement.innerHTML = `
            <a href="pages/category_products.html?ID=${category.id}">
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
        featuredProductsGrid.append(UiUtils.buildVerticalProductView(product));
    });
}

// build most popular products
async function buildMostPopularProducts() {
    const mostPopularProductsGrid = document.querySelector('#most-popular-products-grid');
    const mostPopularProducts = await ProductsService.getMostPopularProducts();
    mostPopularProducts.forEach((product) => {
        mostPopularProductsGrid.append(UiUtils.buildVerticalProductView(product));
    });
}

