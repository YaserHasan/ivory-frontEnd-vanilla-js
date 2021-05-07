class UiUtils {
    static async buildHeader() {
        const isLoggedIn = await AuthService.isLoggedIn();
        function buildAccountDropDown() {
            if (isLoggedIn)
                return `
                    <li><a href="#">My orders</a></li>
                    <li><a onclick="(async () => {
                        UiUtils.showLoadingView();
                        await AuthService.logout();
                        UiUtils.hideLoadingView();
                        location.reload();
                    })()">Logout</a></li>
                `
            return `
                <li><a href="${FormatUtils.getRelativePath('./pages/login.html')}">Login</a></li>
                <li><a href="${FormatUtils.getRelativePath('./pages/register.html')}">Register</a></li>
            `
        }

        function buildCartHREF() {
            if (isLoggedIn)
                return FormatUtils.getRelativePath('pages/cart.html');
            return FormatUtils.getRelativePath('pages/login.html');
        }

        const header = document.createElement('header');
        header.innerHTML = `
            <div class="container topHeader">
                <a href="#"><h5>about Ivory</h5></a>
                <a href="#"><h5>contact us</h5></a>
            </div>
            <div class="divider"></div>

            <div class="container main-header">
                <a href="${FormatUtils.getRelativePath('index.html')}">
                    <img src="${FormatUtils.getRelativePath('assets/images/logo.png')}" alt="Logo">
                </a>

                <div class="input-with-icon">
                    <input type="text" placeholder="Search">
                    <div class="icon">
                        <i class="fas fa-search"></i>
                    </div>
                </div>

                <nav>
                    <a href="${buildCartHREF()}" class="action-link"><i class="fas fa-shopping-cart"></i></a>
                    <div class="drop-down-link">
                        <a href="#" class="action-link"><i class="fas fa-user"></i></a>
                        <ul class="drop-down-items">
                            ${buildAccountDropDown()}
                        </ul>
                    </div>
                </nav>
            </div>
            <div class="divider"></div>
        `;
        return header;
    }

    static buildFooter() {
        const footer = document.createElement('footer');
        footer.innerHTML = `
            <div class="divider"></div>
            <div>
                <h4>Copyright &#169; 2021 Ivory. All Rights Reserved</h4>
            </div>
        `;
        return footer;
    }

    static buildVerticalProductView(product) {
        const productElement = document.createElement('div');
        productElement.classList.add('card');
        productElement.classList.add('vertical-product-view');
        productElement.innerHTML = `
            <a href="${FormatUtils.getRelativePath(`./pages/product_details.html?ID=${product.id}`)}">
                <input type="hidden" id="product-id" value="${product.id}">
                <img src=${product.imageURL} alt="Product">
                <p>${product.name}</p>
                <h2>${product.price}&#8362;</h2>
            </a>
        `;
        return productElement;
    }

    static buildCartProductView(cartProduct) {
        const productElement = document.createElement('div');
        productElement.classList.add('card');
        productElement.classList.add('cart-product-view');
        productElement.innerHTML = `
            <div class="cart-product-image">
                <img src="${cartProduct.imageURL}" alt="product">
                </div>

                <div class="cart-product-info">
                    <p class="p-large">${cartProduct.name}</p>
                    <p class="cart-product-price">${FormatUtils.formatPrice(cartProduct.productTotalPrice)}</p>

                    <div class="cart-product-actions">
                        <div class="cart-product-quantity-actions">
                            <div class="cart-product-quantity-action quantity-action-inc"></div>
                            <p class="p-xlarge cart-product-product-quantity">1</p>
                            <div class="cart-product-quantity-action quantity-action-dec"></div>
                        </div>

                        <div class="cart-product-remove-btn"></div>
                    </div>
            </div>
        `;
        return productElement;
    }

    static updatePageTitle(title, hideSiteName) {
        const titleElement = document.querySelector('head title');
        if (hideSiteName)
            titleElement.textContent = title;
        else
            titleElement.textContent = `Ivory Computers and Phones | ${title}`;
    }

    static buildLoadingView() {
        const loadingViewElement = document.createElement('div');
        loadingViewElement.classList.add('loading-view');
        loadingViewElement.innerHTML = `
            <lottie-player src="${FormatUtils.getRelativePath('assets/ui/loading_spinner.json')}"background="transparent"  speed="1" loop  autoplay>
            </lottie-player>
        `;
        return loadingViewElement;
    }

    static showLoadingView() {
        const loadingView = document.querySelector('.loading-view');
        loadingView.style.opacity = 1;
        document.body.style.overflow = "hidden";
        loadingView.style.display = 'flex';
    }

    static hideLoadingView() {
        const loadingView = document.querySelector('.loading-view');
        loadingView.style.opacity = 0;
        // set Timeout to show animation before hiding
        setTimeout(() => {
            document.body.style.overflow = "auto";
            loadingView.style.display = 'none';
        }, 300)
    }

    static buildSuccessMessage(messageElement, text) {
        messageElement.classList.remove('error-message');
        messageElement.classList.add('success-message');
        messageElement.textContent = text;
    }

    static buildErrorMessage(messageElement, text) {
        messageElement.classList.remove('success-message');
        messageElement.classList.add('error-message');
        messageElement.textContent = text;
    }

    static hideMessage(messageElement) {
        messageElement.classList = ['message'];
        messageElement.textContent = '';
    }
}