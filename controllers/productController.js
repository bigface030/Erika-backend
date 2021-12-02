const Sequelize = require('sequelize');
const db = require('../models');
const { Product, Category, Image, Color, Size_top, Size_bottom, Size_skirt, Size_general, Pattern } = db;

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
                            [Op.gte]: parseInt(_min),
                            [Op.lte]: parseInt(_max),
                        }
                    }
                }
                const offArr = {
                    is_sale: {[Op.is]: false},
                    price_standard: {
                        [Op.and]: {
                            [Op.gte]: parseInt(_min),
                            [Op.lte]: parseInt(_max),
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

            const data = await Product.findAndCountAll({
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
                .then(data => {
                    data.per_page = per_page
                    data.page = page
                    data.page_count = parseInt(data.count/per_page+1)
                    return data
                })

            return data
        }
        getProducts()
        .then(data => {
            if(!data.count) return res.status(400).json(data)
            return res.status(200).json(data)
        })
        .catch(err => {
            return res.status(500).json(err)
        })
    },

    getProduct: (req, res) => {

        const { id } = req.params;

        const getGroup = async () => {
            return Product.findOne({
                attributes: ['category_id'],
                where: {
                    id
                }
            }).then(data => {
                return Category.findOne({
                    attributes: ['group'],
                    where: {
                        id: data.category_id
                    }
                }).then(data => data.group)
            })
        }
        // getGroup().then(data => console.log(data))

        const getProduct = async () => {

            const group = await getGroup()
            const model_ID = [group.split('_')[0].toLowerCase(), group.split('_')[1].slice(0, -1), 'id'].join('_')
            const model = db[group.slice(0, -1)]

            const productQuery = await Product.findOne({
                attributes: { exclude: ['category_id']},
                include: [{
                    model: Category,
                    attributes: ['id', 'group', 'name'],
                    where: {
                        id: Sequelize.col(`Product.category_id`)
                    }
                },{
                    model,
                    attributes: { exclude: ['product_id', 'deletedAt', 'createdAt', 'updatedAt'] },
                    where: {
                        product_id: id,
                    },
                }, {
                    model: Color,
                    attributes: ['id', 'name', 'code'],
                    where: {
                        product_id: id,
                    }
                }, {
                    model: Image,
                    attributes: ['id', 'src', 'alt', 'is_main'],
                    where: {
                        product_id: id,
                    }
                }],
                where: {
                    id
                }
            })

            const patternQuery = await Pattern.findAll({
                attributes: ['id', 'total'],
                include: [{
                    model, 
                    attributes: ['size'],
                    where: {
                        id: Sequelize.col(`Pattern.${model_ID}`)
                    }
                }, {
                    model: Color,
                    attributes: ['name', 'code'],
                    where: {
                        id: Sequelize.col('Pattern.color_id')
                    }
                }],
                where: {
                    product_id: id,
                }
            })

            return {product: productQuery, patterns: patternQuery}
        }
        getProduct()
        .then(data => {
            if(!data) return res.status(400).json(data)
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