const Sequelize = require('sequelize');
const db = require('../models');
const { Product, Image, Color, Size_top, Size_bottom, Size_skirt, Pattern } = db;

const productController = {

    getProducts: (req, res) => {
        const { gender, category } = req.query;
        const { _color, _size, _min, _max, _order, _page } = req.query;
        const getColors = async () => {
            if(_color){
                const colorArray = await Color.findAll({
                    attributes: ['id'],
                    where: {
                        name: _color,
                    }
                })
                    .then(colors => colors.map(color => color.id))
                return colorArray
            }
            return []
        }
        // getColors().then(data => console.log(data))
        const getSizes = async () => {
            if(_size){
                const sizeTops = await Size_top.findAll({
                        attributes: ['id'],
                        where: {
                            size: _size
                        }
                    })
                    .then(sizes => sizes.map(size => (
                        {size_top_id: size.id}
                    )))
                const sizeBottoms = await Size_bottom.findAll({
                        attributes: ['id'],
                        where: {
                            size: _size
                        }
                    })
                    .then(sizes => sizes.map(size => (
                        {size_bottom_id: size.id}
                    )))
                const sizeSkirts = await Size_skirt.findAll({
                        attributes: ['id'],
                        where: {
                            size: _size
                        }
                    })
                    .then(sizes => sizes.map(size => (
                        {size_skirt_id: size.id}
                    )))
                return [...sizeTops, ...sizeBottoms, ...sizeSkirts]
            }
            return []
        }
        // getSizes().then(data => console.log(data))

        const getPatterns = async () => {
            const Op = Sequelize.Op;
            const colors = await getColors();
            const sizes = await getSizes();

            const Obj = {};
            Obj.total = {[Op.gt]: 0};
            if(colors.length > 0){
                Obj.color_id = {[Op.or]: colors}
            }
            if(sizes.length > 0){
                Obj[Op.or] = sizes
            }
            // console.log(Obj)

            return await Pattern.findAll({
                attributes: ['product_id'],
                where: Obj
            })
            .then(patterns => patterns.map(pattern => pattern.product_id))
            .then(data => (
                data.filter((value, index) => (
                    data.indexOf(value) === index
                ))
            ))
        }
        // getPatterns().then(data => console.log(data))

        const getProducts = async () => {
            const Op = Sequelize.Op;
            const patterns = await getPatterns();

            const Obj = {};
            Obj.is_on = {[Op.is]: true};
            if(gender){
                Obj.gender = gender
                if(category){
                    Obj.category_id = category
                }
            }
            if(patterns.length > 0){
                Obj.id = {[Op.or]: patterns}
            }
            if(_min && _max){
                const onArr = {
                    is_sale: {[Op.is]: true},
                    price_sale: {
                        [Op.and]: {
                            [Op.gt]: parseInt(_min),
                            [Op.lt]: parseInt(_max),
                        }
                    }
                }
                const offArr = {
                    is_sale: {[Op.is]: false},
                    price_standard: {
                        [Op.and]: {
                            [Op.gt]: parseInt(_min),
                            [Op.lt]: parseInt(_max),
                        }
                    }
                }
                Obj[Op.or] = [onArr, offArr]
            }
            // console.log(Obj)

            const Arr = [];
            if(_order){
                switch (_order) {
                    case '1':
                        Arr.push(['sold', 'DESC']);
                        break;
                    case '2':
                        Arr.push(['price_standard', 'DESC']);
                        break;
                    case '3':
                        Arr.push(['price_standard', 'ASC']);
                        break;
                }
            }
            Arr.push(['id', 'ASC']);
            // console.log(Arr)

            const page = _page ? parseInt(_page) : 1;
            const per_page = 12;

            const pagination = await Product.findAll({
                attributes: ['id', 'gender', 'name', 'price_standard', 'price_sale', 'is_sale', 'sold'],
                include: [{
                    model: Image,
                    attributes: ['src', 'alt'],
                    where: {
                        product_id: Sequelize.col('Product.id'),
                        is_main: 1,
                    },
                }],
                where: Obj,
                order: Arr,
            }).then(data => (
                {
                    page,
                    per_page,
                    total_count: data.length,
                    page_count: parseInt(data.length / per_page) + 1,
                }       
            ))

            const data = await Product.findAll({
                attributes: ['id', 'gender', 'name', 'price_standard', 'price_sale', 'is_sale', 'sold'],
                include: [{
                    model: Image,
                    attributes: ['src', 'alt'],
                    where: {
                        product_id: Sequelize.col('Product.id'),
                        is_main: 1,
                    },
                }],
                where: Obj,
                order: Arr,
                offset: per_page * (page - 1),
                limit: per_page,
            })

            return { pagination, data }
        }
        getProducts()
        .then(data => {
            if(!data.pagination.total_count) return res.status(400).json(data)
            return res.status(200).json(data)
        })
        .catch(err => {
            return res.status(500).json(err)
        })
    },

    getTrendingProducts: (req, res) => {
        Product.findAll({
            attributes: ['id', 'gender', 'name', 'price_standard', 'price_sale', 'is_sale', 'sold'],
            include: [{
                model: Image,
                attributes: ['src', 'alt'],
                where: {
                    product_id: Sequelize.col('Product.id'),
                    is_main: 1,
                },
            }],
            where: {
                is_on: 1,
            },
            order: [
                ['sold', 'DESC']
            ]
        })
            .then(data => {
                if(!data.length) return res.status(400).json(data)
                return res.status(200).json(data)
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    },
};

module.exports = productController;