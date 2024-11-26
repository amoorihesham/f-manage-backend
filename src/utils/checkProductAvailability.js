import dbConnect from '../../db/connection.js';
import Product from '../../db/models/product.model.js';
export default async function (orderProducts) {
  try {
    const availabilityChecks = orderProducts.map(async (product) => {
      const productInStock = await Product.findById(product._id);

      if (!productInStock) {
        console.log(`Product ${product._id} not found in stock.`);
        return { product: product._id, available: false }; // Product not found
      }

      if (product.quantity > productInStock.stock_quantity) {
        console.log(`Product ${product._id} is out of stock. Only ${productInStock.stock_quantity} available.`);
        return { product: product._id, available: false };
      }

      return { product: product._id, available: true };
    });

    const results = await Promise.all(availabilityChecks);

    const unavailableProducts = results.filter((result) => !result.available);

    if (unavailableProducts.length > 0) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking availability:', error);
    return false;
  }
}

// Example usage (assuming ProductModel is your MongoDB model for products):
