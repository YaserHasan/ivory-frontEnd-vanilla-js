class ProductsService {
    static async getCategories() {
        const url = `${API_BASE_URL}/api/products/categories`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const categories = await response.json();
        return categories.data;
    }

    static async getFeaturedProducts() {
        const url = `${API_BASE_URL}/api/products/featured`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const featuredProducts = await response.json();
        return featuredProducts.data;
    }

    static async getMostPopularProducts() {
        const url = `${API_BASE_URL}/api/products/mostPopular`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const mostPopularProducts = await response.json();
        return mostPopularProducts.data;
    }

    static async getCategoryData(categoryID) {
        const url = `${API_BASE_URL}/api/products/categories/${categoryID}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const categoryData = await response.json();
        return categoryData.data;
    }

    static async getProductDetails(productID) {
        const url = `${API_BASE_URL}/api/products/${productID}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const productDetails = await response.json();
        return productDetails.data;
    }
}