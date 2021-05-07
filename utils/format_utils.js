class FormatUtils {
    static getRelativePath(path) {
        if (window.location.path == '/index.html')
            return path;
        return `../${path}`;
    }

    static getURLParam(urlString, paramName) {
        const url = new URL(urlString);
        return url.searchParams.get(paramName);
    }

    static getAuthorizedHeader(token) {
        const accessToken = token || localStorage.getItem('accessToken');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
    }
}