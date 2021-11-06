const Sequelize = require('sequelize');
const db = require('../models');
const { Product, Image } = db;

const productController = {
    getTrendingProducts: (req, res) => {
        const { gender } = req.query;
        Product.findAll({
            attributes: ['id', 'name', 'price_standard', 'price_sale', 'is_sale', 'sold'],
            include: [{
                model: Image,
                attributes: ['src', 'alt'],
                where: {
                    deletedAt: null,
                    product_id: Sequelize.col('Product.id'),
                    is_main: 1,
                },
            }],
            where: {
                deletedAt: null,
                is_on: 1,
                gender
            },
            order: [
                ['sold', 'DESC']
            ]
        })
            .then(products => {
                res.json(products)
            })
            .catch(err => console.log(err))
    },
};

module.exports = productController;