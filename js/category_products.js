// build Header
document.querySelector('#header-placeholder').replaceWith(UiUtils.buildHeader());

// build footer
document.querySelector('#footer-placeholder').replaceWith(UiUtils.buildFooter());

// build loading view
document.querySelector('#loading-view-placeholder').replaceWith(UiUtils.buildLoadingView());

async function main() {
    UiUtils.showLoadingView();
    await buildCategoryProducts();
    UiUtils.hideLoadingView();
}
main();

// build category products
async function buildCategoryProducts() {
    // get category ID
    const categoryID = FormatUtils.getURLParam(window.location.href, 'ID');
    const categoryProductsGrid = document.querySelector('#category-products-grid');
    const categoryData = await ProductsService.getCategoryData(categoryID);
    UiUtils.updatePageTitle(categoryData.categoryName);
    updateCategoryName(categoryData.categoryName);
    categoryData.categoryProducts.forEach((product) => {
        categoryProductsGrid.append(UiUtils.buildVerticalProductView(product));
    });
}

function updateCategoryName(categoryName) {
    const categoryNameH1 = document.querySelector('#category-name');
    categoryNameH1.textContent = categoryName;
}