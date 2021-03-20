class ProductsService {
    static async getCategories() {
        const url = 'http://localhost:3000/api/products/categories';
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
        const url = 'http://localhost:3000/api/products/featured';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const featuredProducts = await response.json();
        console.log(featuredProducts);
        return featuredProducts.data;
    }

    static async getMostPopularProducts() {
        const url = 'http://localhost:3000/api/products/mostPopular';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const mostPopularProducts = await response.json();
        console.log(mostPopularProducts);
        return mostPopularProducts.data;
    }
}