import Product from "../models/Product.mjs";
import { enrichProductsWithDefaultVariants } from "../utils/enrichedProducts.mjs";



export const getMostWantedProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 4;

        const products = await Product.find();
        const enrichedProducts = await enrichProductsWithDefaultVariants(products)

        const scoredProducts = enrichedProducts.map(product => {
            const orderCount = product.orderCount || 0;
            const addedToCartCount = product.addedToCartCount || 0;
            const wishlistCount = product.wishlistCount || 0;
            const viewsCount = product.viewsCount || 0;

            const score = (orderCount * 3) +
                (addedToCartCount * 2) +
                (wishlistCount * 1) +
                (viewsCount * 0.5);

            return { ...product.toObject(), mostWantedScore: score };
        });

        const sorted = scoredProducts
            .sort((a, b) => b.mostWantedScore - a.mostWantedScore)
            .slice(0, limit);

        res.status(200).json(sorted);
    } catch (error) {
        console.error('Error fetching most wanted products:', error);
        res.status(500).json({ message: 'Server error fetching most wanted products' });
    }
};

export const getNewArrivalProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 4;

        const products = await Product.find()
            .sort({ createdAt: -1 })
            .limit(limit);
        const enrichedProducts = await enrichProductsWithDefaultVariants(products)

        res.status(200).json(enrichedProducts);
    } catch (error) {
        console.error('Error fetching new arrivals:', error);
        res.status(500).json({ message: 'Server error fetching new arrival products' });
    }
};

export const getBestSellingProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 4;

        const bestSellers = await Product.find()
            .sort({ orderCount: -1 })
            .limit(limit)
            .lean();
        const products = await enrichProductsWithDefaultVariants(bestSellers)

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching best sellers:', error);
        res.status(500).json({ message: 'Server error fetching best sellers' });
    }
};