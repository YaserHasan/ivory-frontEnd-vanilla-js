// build loading view
document.querySelector('#loading-view-placeholder').replaceWith(UiUtils.buildLoadingView());

// build header
async function buildHeader() {
    UiUtils.showLoadingView();
    await AuthService.updateAuthStatus();
    document.querySelector('#header-placeholder').replaceWith(UiUtils.buildHeader());
    UiUtils.hideLoadingView();
}
buildHeader();

// build footer
document.querySelector('#footer-placeholder').replaceWith(UiUtils.buildFooter());