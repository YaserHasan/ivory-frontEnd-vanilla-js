// navigate to hmepage if user already logged in
if (AuthService.lazyIsLoggedIn())
    window.location.replace('../index.html');

const messageElement = document.querySelector('#message');

document.querySelector('form button').addEventListener('click', async e => {
    e.preventDefault();
    const name = document.querySelector('#name-input').value;
    const email = document.querySelector('#email-input').value;
    const password = document.querySelector('#password-input').value;
    const confirmPassword = document.querySelector('#confirm-password-input').value;
    
    UiUtils.hideMessage(messageElement);
    if (password !== confirmPassword)
        return UiUtils.buildErrorMessage(messageElement, 'Passwords doesn\'t match');

    UiUtils.showLoadingView();
    const response = await AuthService.register(name, email, password);
    UiUtils.hideLoadingView();

    if (response.success) {
        UiUtils.buildSuccessMessage(messageElement, response.message);
    }
    else {
        UiUtils.buildErrorMessage(messageElement, response.message);
    }
});
