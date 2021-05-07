// build loading view
document.querySelector('#loading-view-placeholder').replaceWith(UiUtils.buildLoadingView());

// build header
async function buildHeader() {
    UiUtils.showLoadingView();
    const header = await UiUtils.buildHeader();
    document.querySelector('#header-placeholder').replaceWith(header);
    UiUtils.hideLoadingView();
}
buildHeader();

// build footer
document.querySelector('#footer-placeholder').replaceWith(UiUtils.buildFooter());