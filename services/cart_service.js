class CartService {
    static async isProductInUserCart(productID) {
        const url = `${API_BASE_URL}/api/cart/${productID}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: FormatUtils.getAuthorizedHeader(),
        });
        const data = await response.json();
        return data.isInCart;
    }

    static async getUserCart() {
        const url = `${API_BASE_URL}/api/cart`;
        const response = await fetch(url, {
            method: 'GET',
            headers: FormatUtils.getAuthorizedHeader(),
        });
        if (response.status >= 400) return {success: false, message: ERROR_MESSAGE_TEXT_REFRESH};
        const data = await response.json();
        return {success: true, data: data.data}
    }

    static async addProductToUserCart(productID) {
        const url = `${API_BASE_URL}/api/cart/${productID}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: FormatUtils.getAuthorizedHeader(),
        });
        if (response.status == 409) return {success: false, message: 'Product already in cart'};
        if (response.status >= 400) return {success: false, message: ERROR_MESSAGE_TEXT};
        return {success: true};
    }

    static async removeProductFromUserCart(productID) {
        const url = `${API_BASE_URL}/api/cart/${productID}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: FormatUtils.getAuthorizedHeader(),
        });
        if (response.status == 404) return {success: false, message: 'this product is no longer in cart!'};
        if (response.status >= 400) return {success: false, message: ERROR_MESSAGE_TEXT};
        return {success: true}
    }

    static async incrementProductQuantity(productID) {
        const url = `${API_BASE_URL}/api/cart/incrementQuantity/${productID}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: FormatUtils.getAuthorizedHeader(),
        });
        if (response.status == 404) return {success: false, message: 'this product is no longer in cart!'};
        if (response.status >= 400) return {success: false, message: ERROR_MESSAGE_TEXT};
        return {success: true};
    }

    static async decrementProductQuantity(productID) {
        const url = `${API_BASE_URL}/api/cart/decrementQuantity/${productID}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: FormatUtils.getAuthorizedHeader(),
        });
        if (response.status == 404) return {success: false, message: 'this product is no longer in cart!'};
        if (response.status == 405) return await this.removeProductFromUserCart(productID);
        if (response.status >= 400) return {success: false, message: ERROR_MESSAGE_TEXT};
        return {success: true};
    }
}
       