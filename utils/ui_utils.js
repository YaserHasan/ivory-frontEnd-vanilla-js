class UiUtils {
    static buildNavBar() {
        const navBar = document.createElement('nav');
        navBar.innerHTML = `
            <div class="container topHeader">
                <a href="#"><h5>about Ivory</h5></a>
                <a href="#"><h5>contact us</h5></a>
            </div>
            <div class="divider"></div>

            <div class="container main-nav">
                <a href="#"><img src="assets/images/logo.png" alt="Logo"></a>

                <div class="input-with-icon">
                    <input type="text" placeholder="Search">
                    <div class="icon">
                        <i class="fas fa-search"></i>
                    </div>
                </div>

                <div class="actions">
                    <a href="#" class="action-link"><i class="fas fa-shopping-cart"></i></a>
                    <div class="drop-down-link">
                        <a href="#" class="action-link"><i class="fas fa-user"></i></a>
                        <ul class="drop-down-items">
                            <li><a href="#">My orders</a></li>
                            <li><a href="#">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="divider"></div>
        `;
        return navBar;
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
}