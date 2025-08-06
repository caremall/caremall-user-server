import Order from '../models/Order.mjs'

export const createOrder = async (req, res) => {
    try {
        const {
            items,
            shippingAddress,
            paymentMethod,
            totalAmount,
        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No items in order' });
        }

        const formattedItems = items.map(item => ({
            product: item.product,
            variant: item.variant || null,
            quantity: item.quantity,
            priceAtOrder: item.priceAtOrder,
            totalPrice: item.totalPrice,
        }));

        const order = await Order.create({
            ...req.body,
            user: req.user._id,
            items: formattedItems,
            shippingAddress,
            paymentMethod,
            paymentStatus: 'pending',
            totalAmount
        });

        res.status(201).json({ success: true, order });
    } catch (err) {
        console.error('Create Order Error:', err);
        res.status(500).json({ message: 'Failed to place order' });
    }
};


export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate('items.product', 'productName productImages')
            .populate('items.variant', 'variantAttributes');

        res.status(200).json(orders);
    } catch (err) {
        console.error('Get User Orders Error:', err);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};


export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, user: req.user._id })
            .populate('items.product', 'productName productImages')
            .populate('items.variant', 'variantAttributes');

        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json(order);
    } catch (err) {
        console.error('Get Order Error:', err);
        res.status(500).json({ message: 'Failed to fetch order' });
    }
};


export const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (order.orderStatus === 'cancelled' || order.orderStatus === 'delivered') {
            return res.status(400).json({ message: 'Cannot cancel this order' });
        }

        order.orderStatus = 'cancelled';
        await order.save();

        res.status(200).json({ success: true, message: 'Order cancelled' });
    } catch (err) {
        console.error('Cancel Order Error:', err);
        res.status(500).json({ message: 'Failed to cancel order' });
    }
};
