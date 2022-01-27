const Sequelize = require('sequelize');
const db = require('../models');
const { Product, Category, Image, Color, Size_top, Size_bottom, Size_skirt, Size_general, Pattern } = db;

const productController = {

    getProducts: (req, res) => {

        const { gender, category } = req.query;
        const { _color, _size, _min, _max, _order, _page, _is_on, _is_sale } = req.query;

        const getColors = () => {
            if(_color){
                return Color.findAll({
                    attributes: ['id'],
                    where: {
                        name: _color,
                    }
                })
                    .then(colors => colors.map(color => color.id))
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

            return Pattern.findAll({
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
            if(gender){
                Obj.gender = gender
            }
            if(category){
                Obj.category_id = category
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
            switch (_is_on) {
                case '1': {
                    Obj.is_on = {[Op.is]: true}
                    break
                }
                case '0': {
                    Obj.is_on = {[Op.is]: false}
                    break
                }
                default: break
            }
            switch (_is_sale) {
                case '1': {
                    Obj.is_sale = {[Op.is]: true}
                    break
                }
                case '0': {
                    Obj.is_sale = {[Op.is]: false}
                    break
                }
                default: break
            }
            // console.log(Obj)

            const Arr = [];
            switch (_order) {
                case '1': {
                    Arr.push(['price_standard', 'DESC'])
                    break
                }
                case '2': {
                    Arr.push(['price_standard', 'ASC'])
                    break
                }
                case '3': {
                    Arr.push(['sold', 'DESC'])
                    break
                }
                case '4': {
                    Arr.push(['sold', 'ASC'])
                    break
                }
                default: break
            }
            Arr.push(['id', 'ASC']);
            // console.log(Arr)

            const page = _page ? parseInt(_page) : null;
            const per_page = 12;

            if (page) {
                Obj.is_on = {[Op.is]: true};
                return Product.findAndCountAll({
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
                    .then(data => ({
                        count: data.count,
                        per_page,
                        page,
                        page_count: Math.ceil(data.count/per_page),
                        rows: data.rows
                    }))
            } else {
                return Product.findAll({
                    attributes: ['id', 'gender', 'name', 'price_standard', 'price_sale', 'is_on', 'is_sale', 'sold', 'createdAt', 'updatedAt'],
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
                })
                    .then(data => data)                
            }
        }

        getProducts()
            .then(data => {
                if(!data) return res.status(400).json(data)
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
                    required: false
                }, {
                    model: Color,
                    attributes: ['id', 'name', 'code'],
                    where: {
                        product_id: id,
                    },
                    required: false
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
                attributes: ['id', 'total', 'createdAt', 'updatedAt'],
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

    addProduct: (req, res) => {

        const { name, gender, category, desc, material, washing, images, group, sizes, colors, patterns, is_on, is_sale, price_standard, price_sale } = req.body;

        const createProduct = async () => {

            const category_id = await Category.findOne({
                attributes: ['id'],
                where: {
                    name: category
                }
            }).then(data => data.id)

            const obj = {
                gender,
                category_id,
                desc,
                material,
                washing
            }
            if(is_on) obj.is_on = is_on
            if(is_sale) obj.is_sale = is_sale
            if(price_standard) obj.price_standard = price_standard
            if(price_sale) obj.price_sale = price_sale

            return Product.findOrCreate({
                where: { name },
                defaults: obj
            })
        }

        const addImage = product => {
            images.map((image, index) => Image.create({
                product_id: product.id,
                src: image.src,
                alt: image.alt,
                is_main: index === 0 ? 1 : 0
            }))            
        }

        const getSizes = product => (
            Promise.all(sizes.map(async size => {
                size.product_id = product.id
                let result
                if(group === 'Size_top'){
                    result = await Size_top.create(size)
                }
                if(group === 'Size_bottom'){
                    result = await Size_bottom.create({...size, waist: size.waist.join('~')})
                }
                if(group === 'Size_skirt'){
                    result = await Size_skirt.create({...size, waist: size.waist.join('~')})
                }
                if(group === 'Size_general'){
                    result = await Size_general.create(size)
                }
                return {id: result.id, size: result.size}
            }))
        )

        const getColors = product => (
            Promise.all(colors.map(async color => {
                color.product_id = product.id
                return await Color.create(color).then(result => ({id: result.id, color: result.name}))
            }))
        )

        const addPatterns = async product => {
            const sizeIDs = await getSizes(product)
            const colorIDs = await getColors(product)

            const model_ID = [group.split('_')[0].toLowerCase(), group.split('_')[1], 'id'].join('_')

            return await sizeIDs.map(sizeID => colorIDs.map(colorID => {
                const obj = {
                    product_id: product.id,
                    color_id: colorID.id
                }
                obj[model_ID] = sizeID.id
                if(patterns){
                    obj.total = patterns.find(pattern => pattern.size === sizeID.size && pattern.color === colorID.color).total
                }
                Pattern.create(obj)
            }))
        }


        createProduct()
        .then(([product, created]) => {
            if(!created) return res.status(400).json(product)
            addImage(product)
            if(sizes && colors){
                addPatterns(product)
            }
            return res.status(200).json(product)
        })
        .catch(err => res.status(500).json(err))

    },

    updateProduct: (req, res) => {

        const { id } = req.params;

        const { name, gender, category, desc, material, washing, images, sizes, colors, group, is_on, is_sale, price_standard, price_sale } = req.body;


        const updateProduct = async () => {

            const isValid = await Product.findByPk(id).then(product => {
                if(product === null) return false
                return true
            })
            if(!isValid) return Promise.reject(new ReferenceError('invalid product id'))

            if(name){
                const isUnique = await Product.findOne({
                    where: { name }
                }).then(product => {
                    if(product && product.id !== parseInt(id)) return false
                    return true
                })
                if(!isUnique) return Promise.reject(new Error('name already be used'))
            }

            const obj = name ? {
                gender,
                name,
                desc,
                material,
                washing,
            } : {
                is_on, 
                is_sale, 
                price_standard, 
                price_sale
            }

            return Product.update(obj, {
                where: { id }
            }).then(() => ({id, ...obj}))
            
        }


        const updateImages = () => {
            images.filter(image => image.id || image.src)
                .map((image, i) => !image.id ? (
                    Image.create({
                        product_id: id,
                        src: image.src,
                        alt: `${name}_0${i+1}`,
                        is_main: 0
                    })
                ) : image.src ? (
                    Image.update({
                        src: image.src,
                        alt: `${name}_0${i+1}`
                    }, {
                        where: {
                            id: image.id
                        }
                    })
                ) : (
                    Image.destroy({
                        where: {
                            id: image.id
                        }
                    })
                ))
        }


        const updateSizes = () => {
            switch (group) {
                case 'Size_top': {
                    return Promise.all(sizes.map(async size => size.id ? (
                        await Size_top.update(size, {
                            where: {
                                id: size.id
                            }
                        }).then(() => size.id)
                    ) : (
                        await Size_top.create({
                            ...size, 
                            product_id: id,
                        }).then(result => result.id)
                    )))
                }
                case 'Size_bottom': {
                    return Promise.all(sizes.map(async size => size.id ? (
                        await Size_bottom.update({
                            ...size,
                            waist: size.waist.join('~')
                        }, {
                            where: {
                                id: size.id
                            }
                        }).then(() => size.id)
                    ) : (
                        await Size_bottom.create({
                            ...size, 
                            product_id: id, 
                            waist: size.waist.join('~')
                        }).then(result => result.id)
                    )))
                }
                case 'Size_skirt': {
                    return Promise.all(sizes.map(async size => size.id ? (
                        await Size_skirt.update({
                            ...size,
                            waist: size.waist.join('~')
                        }, {
                            where: {
                                id: size.id
                            }
                        }).then(() => size.id)
                    ) : (
                        await Size_skirt.create({
                            ...size, 
                            product_id: id, 
                            waist: size.waist.join('~')
                        }).then(result => result.id)
                    )))
                }
                default: break
            }
        }

        const updateColors = () => {
            return Promise.all(colors.map(async color => color.id ? (
                await Color.update(color, {
                    where: {
                        id: color.id
                    }
                }).then(() => color.id)
            ) : (
                await Color.create({
                    ...color,
                    product_id: id
                }).then(result => result.id)
            )))
        }

        const updatePatterns = async () => {
            const sizeIDs = await updateSizes()
            const colorIDs = await updateColors()

            const model_ID = [group.split('_')[0].toLowerCase(), group.split('_')[1], 'id'].join('_')

            return await sizeIDs.map(sizeID => colorIDs.map(colorID => {
                const obj = {
                    product_id: id,
                    color_id: colorID
                }
                obj[model_ID] = sizeID
                Pattern.findOrCreate({
                    where: obj,
                    defaults: obj
                })
            }))
        }

        updateProduct()
            .then(data => {
                if(images) updateImages()
                if(sizes && colors) updatePatterns()
                return res.status(200).json(data)
            })
            .catch(err => {
                if(err.message === 'name already be used') return res.status(403).json(`${err.name}: ${err.message}`)
                if(err instanceof ReferenceError) return res.status(404).json(`${err.name}: ${err.message}`)
                return res.status(500).json(err)
            })

    },

    updatePattern: (req, res) => {
        const { id } = req.params;

        const { type, quantity } = req.body;

        const getTotal = async () => {
            return await Pattern.findOne({
                where: { id }
            }).then(pattern => {
                if(pattern === null) return null
                return pattern.total || 0
            })
        }

        const updatePattern = async () => {
            const total = await getTotal()
            if(total === null) return Promise.reject(new ReferenceError('invalid pattern id'))
            const qty = type === 'INC' ? quantity : type === 'DEC' ? -quantity : null
            if(total + qty < 0) return Promise.reject(new RangeError('total will be negative'))
            return Pattern.update({
                total: total + qty
            }, {
                where: { id }
            }).then(() => ({id, total: total + qty}))
        }

        updatePattern()
        .then(data => res.status(200).json(data))
        .catch(err => {
            if(err instanceof RangeError) return res.status(403).json(`${err.name}: ${err.message}`)
            if(err instanceof ReferenceError) return res.status(404).json(`${err.name}: ${err.message}`)
            return res.status(500).json(err)
        })
    },

    deleteProduct: (req, res) => {
        const { id } = req.params

        Product.findByPk(id).then(product => {
            if(product === null) return Promise.reject(new ReferenceError('invalid product id'))
        })
        .then(() => {
            return Pattern.destroy({
                where: { product_id: id }
            }).then(() => {
                return Product.destroy({
                    where: { id }
                }).then(() => res.status(200).json({ok: true}))
            })
        })
        .catch(err => {
            if(err instanceof ReferenceError) return res.status(404).json(`${err.name}: ${err.message}`)
            return res.status(500).json(err)
        })

    },

    searchProduct: (req, res) => {
        const { name } = req.query;
        Product.findOne({
            where: { name }
        })
        .then(data => {
            if(!data) return res.status(400).json(data)
            return res.status(200).json(data)
        })
        .catch(err => {
            return res.status(500).json(err)
        })
    }
};

module.exports = productController;