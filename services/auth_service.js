class AuthService {
    static async login(email, password) {
        const url = `${API_BASE_URL}/auth/login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        });
        const data = await response.json();
        if (response.status >= 400)
            return {success: false, message: data.message};
        // save tokens to local storage
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        sessionStorage.setItem('authorized', 'true');
        return {success: true};
    }

    static async register(name, email, password) {
        const url = `${API_BASE_URL}/auth/register`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
            })
        });
        const data = await response.json();
        if (response.status >= 400)
            return {success: false, message: data.message};
        return {success: true, message: data.message};
    }

    static async logout() {
        await this.updateAuthStatus();
        if (sessionStorage.getItem('authorized') === 'false') return;

        const url = `${API_BASE_URL}/auth/logout`;
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    static async updateAuthStatus() {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!(accessToken || refreshToken))
            return sessionStorage.setItem('authorized', 'false');
        
        const isValidAccessToken = await this.#checkAccessToken(accessToken);
        if (isValidAccessToken)
            return sessionStorage.setItem('authorized', 'true');

        const isTokenRefreshed = await this.#refreshAccessToken(refreshToken);
        return sessionStorage.setItem('authorized', isTokenRefreshed.toString());
    }

    static async #checkAccessToken(accessToken) {
        const url = `${API_BASE_URL}/auth/checkAuth`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });
        return response.status == 204;
    }

    static async #refreshAccessToken(refreshToken) {
        const url = `${API_BASE_URL}/auth/refreshToken`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({refreshToken})
        });
        if (response.status == 400 || response.status == 401)
            return false;
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        return true;
    }
}
       