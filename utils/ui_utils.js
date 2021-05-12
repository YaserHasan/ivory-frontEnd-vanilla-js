class UiUtils {
    static async buildHeader() {
        const isLoggedIn = await AuthService.isLoggedIn();
        function buildAccountDropDown() {
            if (isLoggedIn)
                return `
                    <li><a href="${FormatUtils.getRelativePath('pages/orders.html')}">My orders</a></li>
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

        function buildInfoLinks(isMobile) {
            if (!isMobile)
                return `
                    <a href="#"><h5>about Ivory</h5></a>
                    <a href="#"><h5>contact us</h5></a>
                `
            return `
                <li><a href="#">about Ivory</a></li>
                <li><a href="#">contact us</a></li>
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
                <ul>
                    ${buildInfoLinks()}
                </ul>
            </div>
            <div class="divider"></div>

            <div class="container main-header">
                <a href="${FormatUtils.getRelativePath('index.html')}">
                    <img src="${FormatUtils.getRelativePath('assets/images/logo.png')}" alt="Logo">
                </a>

                <div id="desktop-search" class="input-with-icon">
                    <input type="text" placeholder="Search">
                    <div class="icon clickable">
                        <i class="fas fa-search"></i>
                    </div>
                </div>

                <nav>
                    <a id="cart-link" href="${buildCartHREF()}" class="action-link clickable"><i class="fas fa-shopping-cart"></i></a>
                    <div id="account-link" class="drop-down-link">
                        <a href="#" class="action-link clickable"><i class="fas fa-user"></i></a>
                        <ul class="drop-down-items">
                            ${buildAccountDropDown()}
                        </ul>
                    </div>
                    <a id="mobile-menu-btn" href="#" class="action-link clickable"><i class="fas fa-bars"></i></a>
                </nav>
            </div>
            <div class="divider"></div>

            <div class="mobile-nav">
                <div id="mobile-search" class="input-with-icon">
                    <input type="text" placeholder="Search">
                    <div class="icon clickable">
                        <i class="fas fa-search"></i>
                    </div>
                </div>
                <ul>
                    ${
                        !isLoggedIn ? '' : 
                        `<li><a href="${FormatUtils.getRelativePath('pages/cart.html')}">My Cart</a></li>`
                    }
                    ${buildAccountDropDown()}
                    ${buildInfoLinks(true)}
                </ul>
            </div>
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
                <h2>${FormatUtils.formatPrice(product.price)}</h2>
            </a>
        `;
        return productElement;
    }

    static buildHorizontalProductView(product, inCart) {
        function buildProductFooter() {
            if (inCart)
                return `<div class="cart-product-actions">
                    <div class="cart-product-quantity-actions">
                        <div class="cart-product-quantity-action quantity-action-dec clickable"></div>
                        <p class="p-xlarge cart-product-product-quantity">${product.quantity}</p>
                        <div class="cart-product-quantity-action quantity-action-inc clickable"></div>
                    </div>

                    <div class="cart-product-remove-btn clickable"></div>
                </div>`
                
            return '';
        }
        const productElement = document.createElement('div');
        productElement.classList.add('card');
        productElement.classList.add('horizontal-product-view');
        productElement.innerHTML = `
            <div class="horizontal-product-image">
                <a href="${FormatUtils.getRelativePath(`pages/product_details.html?ID=${product.id}`)}" target="_blank">
                    <img src="${product.imageURL}" alt="product">
                </a>
            </div>

            <div class="horizontal-product-info">
                <a href="${FormatUtils.getRelativePath(`pages/product_details.html?ID=${product.id}`)}" target="_blank">
                    <p class="p-large">${product.name}</p>
                </a>
                <p class="horizontal-product-price">${FormatUtils.formatPrice(product.productTotalPrice)}</p>
                
                ${buildProductFooter()}
            </div>
        `;
        return productElement;
    }

    static buildOrderView(order) {
        // used arrow function to avoid binding errors
        const buildOrderProducts = () => {
            const wrapper = document.createElement('div');
            const productsDiv = document.createElement('div');
            productsDiv.classList.add('order-products');
            wrapper.appendChild(productsDiv);

            order.products.forEach((product) => {
                productsDiv.appendChild(this.buildHorizontalProductView(product));
            });
            return wrapper.innerHTML;
        }

        const orderElement = document.createElement('div');
        orderElement.classList.add('card');
        orderElement.classList.add('order');
        orderElement.innerHTML = `
            <div class="order-info">
                <div class="order-info-row">
                    <h3>Order ID:</h3>
                    <p class="p-xlarge">${order.id}</p>
                </div>

                <div class="align-left">
                    <div class="order-info-row">
                        <h3>Order Date:</h3>
                        <p class="p-xlarge">${FormatUtils.formatDate(order.date)}</p>
                    </div>

                    <div class="order-info-row">
                        <h3>Order amount:</h3>
                        <p class="p-xlarge">${FormatUtils.formatPrice(order.totalPrice)}</p>
                    </div>
                </div>
            </div>

            ${buildOrderProducts()}
        `;
        return orderElement;
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