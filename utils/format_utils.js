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

    static formatPrice(price) {
        let formattedPrice = price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        // to remove the .00 at the end
        formattedPrice = formattedPrice.split('.')[0];
        return formattedPrice.toString() + '&#8362;';
    }
}