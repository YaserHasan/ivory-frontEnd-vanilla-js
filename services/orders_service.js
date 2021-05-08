class OrdersService {

    static async getUserOrders() {
        const url = `${API_BASE_URL}/api/orders`;
        const response = await fetch(url, {
            method: 'GET',
            headers: FormatUtils.getAuthorizedHeader(),
        });
        if (response.status >= 400) return {success: false, message: ERROR_MESSAGE_TEXT_REFRESH};
        const data = await response.json();
        return {success: true, data: data.data}
    }

    static async createOrderFromCart() {
        const url = `${API_BASE_URL}/api/orders`;
        const response = await fetch(url, {
            method: 'POST',
            headers: FormatUtils.getAuthorizedHeader(),
        });
        if (response.status == 404) return {success: false, message: 'Your cart is empty!'};
        if (response.status >= 400) return {success: false, message: ERROR_MESSAGE_TEXT};
        return {success: true};
    }
}
       