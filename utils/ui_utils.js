class UiUtils {
    static buildHeader() {
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
                    <a href="#" class="action-link"><i class="fas fa-shopping-cart"></i></a>
                    <div class="drop-down-link">
                        <a href="#" class="action-link"><i class="fas fa-user"></i></a>
                        <ul class="drop-down-items">
                            <li><a href="#">My orders</a></li>
                            <li><a href="#">Logout</a></li>
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
            <a href="#">
                <input type="hidden" id="product-id" value="${product.id}">
                <img src=${product.imageURL} alt="Product">
                <p>${product.name}</p>
                <h2>${product.price}&#8362;</h2>
            </a>
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
}