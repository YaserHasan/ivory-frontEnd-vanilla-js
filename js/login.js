// navigate to hmepage if user already logged in
if (sessionStorage.getItem('authorized') === 'true')
    window.location.replace('../index.html');

const messageElement = document.querySelector('#message');

document.querySelector('form button').addEventListener('click', async e => {
    e.preventDefault();
    const email = document.querySelector('#email-input').value;
    const password = document.querySelector('#password-input').value;
    
    UiUtils.hideMessage(messageElement);
    UiUtils.showLoadingView();
    const response = await AuthService.login(email, password);
    UiUtils.hideLoadingView();

    if (response.success) {
        window.location.replace('../index.html');
    }
    else {
        UiUtils.buildErrorMessage(messageElement, response.message);
    }
});
