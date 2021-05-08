// navigate to login page if user is not logged in
if (!AuthService.lazyIsLoggedIn())
    window.location.replace('../index.html')

async function main() {
    UiUtils.showLoadingView();
    await buildUserOrders();
    UiUtils.hideLoadingView();
}
main();

async function buildUserOrders() {
    const response = await OrdersService.getUserOrders();
    if (!response.success) return alert(response.message);
    const userOrders = response.data;
    const main = document.querySelector('main');
    userOrders.forEach((order) => {
        main.appendChild(UiUtils.buildOrderView(order));
    });
}