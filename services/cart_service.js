class CartService {
    static async isProductInUserCart(productID) {
        const url = `${API_BASE_URL}/cart/${productID}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: FormatUtils.getAuthorizedHeader(),
        });
        const data = await response.json();
        return data.isInCart;
    }

    static async getUserCart() {
        const url = `${API_BASE_URL}/cart`;
        const response = await fetch(url, {
            method: 'GET',
            headers: FormatUtils.getAuthorizedHeader(),
        });
        const data = await response.json();
        return data.data;
    }

    static async addProductToUserCart(productID) {
        const url = `${API_BASE_URL}/cart/${productID}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: FormatUtils.getAuthorizedHeader(),
        });
        if (response.status >= 400) return false;
        return true;
    }

    static async removeProductFromUserCart(productID) {
        const url = `${API_BASE_URL}/cart/${productID}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: FormatUtils.getAuthorizedHeader(),
        });
        if (response.status >= 400) return false;
        return true;
    }

    static async incrementProductQuantity(productID) {
        const url = `${API_BASE_URL}/cart/incrementQuantity/${productID}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: FormatUtils.getAuthorizedHeader(),
        });
        if (response.status == 404) return {success: false, message: 'this product is no longer in cart!'};
        if (response.status >= 400) return {success: false};
        return {success: true};
    }

    static async decrementProductQuantity(productID) {
        const url = `${API_BASE_URL}/cart/decrementQuantity/${productID}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: FormatUtils.getAuthorizedHeader(),
        });
        if (response.status == 404) return {success: false, message: 'this product is no longer in cart!'};
        if (response.status == 405) return {success: false, message: 'Product quantity can\'t be less than 1'};
        if (response.status >= 400) return {success: false};
        return {success: true};
    }
}
       