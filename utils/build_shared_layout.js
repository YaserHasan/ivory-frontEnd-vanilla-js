// build loading view
document.querySelector('#loading-view-placeholder').replaceWith(UiUtils.buildLoadingView());

// build header
async function buildHeader() {
    UiUtils.showLoadingView();
    const header = await UiUtils.buildHeader();
    // handle mobile menu
    handleHeaderMobileMenu(header);
    document.querySelector('#header-placeholder').replaceWith(header);
    UiUtils.hideLoadingView();
}
buildHeader();

function handleHeaderMobileMenu(header) {
    const mobileMenuBtn = header.querySelector('#mobile-menu-btn');
    const mobileNav = header.querySelector('.mobile-nav');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        // change button icon
        if (mobileNav.classList.contains('active'))
            mobileMenuBtn.childNodes[0].classList = 'fas fa-times';
        else
            mobileMenuBtn.childNodes[0].classList = 'fas fa-bars';
    });
    
}

// build footer
document.querySelector('#footer-placeholder').replaceWith(UiUtils.buildFooter());