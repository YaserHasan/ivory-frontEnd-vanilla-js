// build Header
document.querySelector('#header-placeholder').replaceWith(UiUtils.buildHeader());

// build footer
document.querySelector('#footer-placeholder').replaceWith(UiUtils.buildFooter());

// build loading view
document.querySelector('#loading-view-placeholder').replaceWith(UiUtils.buildLoadingView());

async function main() {
    //UiUtils.showLoadingView();
    //await buildCategoryProducts();
    //UiUtils.hideLoadingView();
}
main();
