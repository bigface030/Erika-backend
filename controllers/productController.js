const Sequelize = require('sequelize');
const db = require('../models');
const { Product, Category, Image, Color, Size_top, Size_bottom, Size_skirt, Size_general, Pattern } = db;

const productController = {

    getProducts: (req, res) => {

        const { _gender, _category, _color, _size, _min, _max, _order, _page, _is_on, _is_sale } = req.query;

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

        const getPatterns = async () => {
            const Op = Sequelize.Op;

            const colors = await getColors();
            const sizes = await getSizes();

            const Obj = {};
            if(_page){
                Obj.total = {[Op.gt]: 0};
            }
            if(colors.length > 0){
                Obj.color_id = {[Op.or]: colors}
            }
            if(sizes.length > 0){
                Obj[Op.or] = sizes
            }

            return Pattern.findAll({
                attributes: ['product_id'],
                where: Obj
            }).then(patterns => (
                patterns.map(pattern => pattern.product_id)
            )).then(data => (
                data.filter((value, index) => (
                    data.indexOf(value) === index
                ))
            ))
        }

        const getProducts = async () => {
            const Op = Sequelize.Op;
            const patterns = await getPatterns();

            const Obj = {};
            if(_gender){
                Obj.gender = _gender
            }
            if(_category){
                const category_id = await Category.findOne({
                    attributes: ['id'],
                    where: {
                        name: _category
                    }
                }).then(data => data.id)
                Obj.category_id = category_id
            }
            if(_page && patterns.length > 0){
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

            const Arr = [];
            switch (_order) {
                case 'price_desc': {
                    Arr.push(['price_standard', 'DESC'])
                    break
                }
                case 'price_asc': {
                    Arr.push(['price_standard', 'ASC'])
                    break
                }
                case 'sold_desc': {
                    Arr.push(['sold', 'DESC'])
                    break
                }
                case 'sold_asc': {
                    Arr.push(['sold', 'ASC'])
                    break
                }
                default: break
            }
            Arr.push(['id', 'ASC']);

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
                }).then(data => ({
                    count: data.count,
                    per_page,
                    page: data.count ? page : 0,
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
                }).then(data => data)
            }
        }

        getProducts()
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err))
    },

    getProduct: (req, res) => {

        const { id } = req.params;

        const getGroup = () => {
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

        const getProduct = async () => {

            const isValid = await Product.findByPk(id).then(product => {
                if(product === null) return false
                return true
            })
            if(!isValid) return Promise.reject(new ReferenceError('invalid product id'))

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
                where: { id }
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
            .then(data => res.status(200).json(data))
            .catch(err => {
                if(err instanceof ReferenceError) return res.status(404).json(`${err.name}: ${err.message}`)
                return res.status(500).json(err)
            })
    },

    addProduct: (req, res) => {

        const { name, gender, category, desc, material, washing, images, sizes, colors, patterns, is_on, is_sale, price_standard, price_sale } = req.body;

        const getGroup = () => {
            return Category.findOne({
                where: {
                    name: category
                }
            }).then(data => data.group.slice(0, -1))
        }

        const addProduct = async () => {

            if(!category) return missParam('category')
            const category_id = await Category.findOne({
                attributes: ['id'],
                where: {
                    name: category
                }
            })
            if(!category_id) return invalidParam('category')

            const missParam = param => {
                return Promise.resolve([undefined, undefined, new TypeError(`miss '${param}' parameter`)])
            }

            const invalidParam = param => {
                return Promise.resolve([undefined, undefined, new ReferenceError(`invalid '${param}' parameter`)])
            }

            const missProperty = param => {
                return Promise.resolve([undefined, undefined, new TypeError(`miss property in specific element of '${param}' array`)])
            }

            if(!name) return missParam('name')
            
            if (images && images.length > 0) {
                const error = !images.every(image => image.src && image.alt)
                if(error) return missProperty('images')
            } else {
                return missParam('images')
            }
            
            if(gender && gender !== 'M' && gender !== 'F') return invalidParam('gender')

            if (sizes && sizes.length > 0) {
                const error = !sizes.every(size => size.size)
                if(error) return missProperty('sizes')
            }

            if (colors && colors.length > 0) {
                const error = !colors.every(color => color.name)
                if(error) return missProperty('colors')
            }

            if (patterns && patterns.length > 0) {
                if(!sizes) return missParam('sizes')
                if(!colors) return missParam('colors')
                const error = !patterns.every(pattern => pattern.size && pattern.color)
                if(error) return missProperty('patterns')
            }

            const obj = {
                gender,
                category_id: category_id.id,
                desc,
                material,
                washing,
                is_on,
                is_sale,
                price_standard,
                price_sale
            }

            return Product.findOrCreate({
                where: { name },
                defaults: obj
            })
        }

        const addImages = product => {
            return Promise.all(images.map(async (image, index) => await Image.create({
                product_id: product.id,
                src: image.src,
                alt: image.alt,
                is_main: index === 0 ? 1 : 0
            })))
        }

        const addSizes = async product => {
            if(!sizes) return []
            const group = await getGroup()
            return Promise.all(sizes.map(async size => {
                size.product_id = product.id
                let result
                switch (group) {
                    case 'Size_top': {
                        result = await Size_top.create(size)
                        break
                    }
                    case 'Size_bottom': {
                        result = await Size_bottom.create({...size, waist: size.waist.join('~')})
                        break
                    }
                    case 'Size_skirt': {
                        result = await Size_skirt.create({...size, waist: size.waist.join('~')})
                        break
                    }
                    case 'Size_general': {
                        result = await Size_general.create(size)
                        break
                    }
                    default: break
                }
                return result
            }))
        }

        const addColors = product => {
            if(!colors) return []
            return Promise.all(colors.map(async color => {
                color.product_id = product.id
                return await Color.create(color)
            }))
        }

        const addPatterns = async (addedSizes, addedColors, product) => {

            const group = await getGroup()

            const model_ID = [
                group.split('_')[0].toLowerCase(), 
                group.split('_')[1], 
                'id'
            ].join('_')

            if(!addedSizes.length > 0 || !addedColors.length > 0) return []
            return Promise.all(addedSizes.map(addedSize => Promise.all(addedColors.map(async addedColor => {
                const obj = {
                    product_id: product.id,
                    color_id: addedColor.id
                }
                obj[model_ID] = addedSize.id
                if(patterns){
                    obj.total = patterns
                        .find(pattern => (
                            pattern.size === addedSize.size && pattern.color === addedColor.name
                        ))?.total
                }
                return await Pattern.create(obj)
            }))))
        }

        const addAll = async () => {
            const [product, created, error] = await addProduct()
            if(error) return Promise.reject(error)
            if(!created) return Promise.reject(new Error('name already be used'))
            const addedImages = await addImages(product)
            const addedSizes = await addSizes(product)
            const addedColors = await addColors(product)
            const addedPatterns = await addPatterns(addedSizes, addedColors, product)
            return Promise.resolve({
                ...product.toJSON(), 
                Images: addedImages,
                Sizes: addedSizes,
                Colors: addedColors,
                Patterns: addedPatterns.flat()
            })
        }

        addAll()
            .then(result => res.status(201).json(result))
            .catch(err => {
                if(err instanceof TypeError || err instanceof ReferenceError) return res.status(403).json(`${err.name}: ${err.message}`)
                if(err.message === 'name already be used') return res.status(409).json(`${err.name}: ${err.message}`)
                res.status(500).json(err)
            })

    },

    updateProduct: (req, res) => {

        const { id } = req.params;

        const { name, gender, desc, material, washing, images, sizes, colors, is_on, is_sale, price_standard, price_sale } = req.body;

        const isError = async () => {

            const invalidParam = param => {
                return Promise.resolve(new ReferenceError(`invalid '${param}' parameter`))
            }

            const isValid = await Product.findByPk(id).then(product => {
                if(product === null) return false
                return true
            })
            if(!isValid) return Promise.resolve(new ReferenceError('invalid product id'))

            if(name){
                const isUnique = await Product.findOne({
                    where: { name }
                }).then(product => {
                    if(product && product.id !== parseInt(id)) return false
                    return true
                })
                if(!isUnique) return Promise.resolve(new Error('name already be used'))
            }

            if(gender && gender !== 'M' && gender !== 'F') return invalidParam('gender')

            return Promise.resolve(null)

        }

        const getGroup = () => {
            return Product.findByPk(id).then(product => {
                return Category.findOne({
                    where: {
                        id: product.category_id
                    }
                }).then(data => data.group.slice(0, -1))
            })
        }

        const updateProduct = () => {
            return Product.update({
                name,
                gender,
                desc,
                material,
                washing,
                is_on, 
                is_sale, 
                price_standard, 
                price_sale
            }, {
                where: { id }
            })
        }

        const updateImages = () => {
            images.filter(image => image.id || image.src)
                .map(image => !image.id ? (
                    Image.create({
                        product_id: id,
                        src: image.src,
                        alt: image.alt || null,
                        is_main: 0
                    })
                ) : image.src ? (
                    Image.update({
                        src: image.src,
                        alt: image.alt || null,
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
            return Promise.resolve(true)
        }

        const updateSizes = async () => {
            const group = await getGroup()
            const model = db[group]

            const updateSizes = () => {
                if(!sizes) return Promise.resolve(true)
                switch (group) {
                    case 'Size_top': {
                        return Promise.all(sizes.map(async size => size.id ? (
                            await Size_top.update(size, {
                                where: {
                                    id: size.id,
                                    product_id: id
                                }
                            })
                        ) : (
                            await Size_top.create({
                                ...size, 
                                product_id: id,
                            })
                        )))
                    }
                    case 'Size_bottom': {
                        return Promise.all(sizes.map(async size => size.id ? (
                            await Size_bottom.update({
                                ...size,
                                waist: size.waist.join('~')
                            }, {
                                where: {
                                    id: size.id,
                                    product_id: id
                                }
                            })
                        ) : (
                            await Size_bottom.create({
                                ...size, 
                                product_id: id, 
                                waist: size.waist.join('~')
                            })
                        )))
                    }
                    case 'Size_skirt': {
                        return Promise.all(sizes.map(async size => size.id ? (
                            await Size_skirt.update({
                                ...size,
                                waist: size.waist.join('~')
                            }, {
                                where: {
                                    id: size.id,
                                    product_id: id
                                }
                            })
                        ) : (
                            await Size_skirt.create({
                                ...size, 
                                product_id: id, 
                                waist: size.waist.join('~')
                            })
                        )))
                    }
                    default: break
                }
            }

            return updateSizes().then(() => {
                return model.findAll({
                    where: {
                        product_id: id
                    }
                }).then(results => {
                    return results.map(result => result.id)
                })
            })
        }

        const updateColors = async () => {
            const updateColors = () => {
                if(!colors) return Promise.resolve(true)
                return Promise.all(colors.map(async color => color.id ? (
                    await Color.update(color, {
                        where: {
                            id: color.id,
                            product_id: id
                        }
                    })
                ) : (
                    await Color.create({
                        ...color,
                        product_id: id
                    })
                )))
            }

            return updateColors().then(() => {
                return Color.findAll({
                    where: {
                        product_id: id
                    }
                }).then(results => {
                    return results.map(result => result.id)
                })
            })
        }

        const updatePatterns = async (sizeIDs, colorIDs) => {

            const group = await getGroup()
            const model_ID = [group.split('_')[0].toLowerCase(), group.split('_')[1], 'id'].join('_')

            return sizeIDs.map(sizeID => colorIDs.map(colorID => {
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

        const getProduct = async () => {
            const group = await getGroup()
            const model_ID = [group.split('_')[0].toLowerCase(), group.split('_')[1], 'id'].join('_')
            const model = db[group]

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
                where: { id }
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

        const updateAll = async () => {
            const error = await isError()
            if(error) return Promise.reject(error)

            await updateProduct()
            if(images) await updateImages()
            const sizeIDs = await updateSizes()
            const colorIDS = await updateColors()
            if(sizes?.some(size => !size.id) || colors?.some(color => !color.id)) await updatePatterns(sizeIDs, colorIDS)

            return getProduct()
        }

        updateAll()
            .then(data => res.status(200).json(data))
            .catch(err => {
                if(err.message === 'name already be used') return res.status(409).json(`${err.name}: ${err.message}`)
                if(err.message === 'invalid product id') return res.status(404).json(`${err.name}: ${err.message}`)
                if(err instanceof TypeError || err instanceof ReferenceError) return res.status(403).json(`${err.name}: ${err.message}`)
                return res.status(500).json(err)
            })

    },

    deleteProduct: (req, res) => {

        const { id } = req.params

        Product.findByPk(id)
            .then(product => {
                if(product === null) return Promise.reject(new ReferenceError('invalid product id'))
            })
            .then(() => {
                return Pattern.destroy({
                    where: { product_id: id }
                }).then(() => {
                    return Product.destroy({
                        where: { id }
                    }).then(() => (
                        res.sendStatus(204)
                    ))
                })
            })
            .catch(err => {
                if(err instanceof ReferenceError) return res.status(404).json(`${err.name}: ${err.message}`)
                return res.status(500).json(err)
            })

    },

    searchProduct: (req, res) => {

        const { name } = req.query

        Product.findAll({
            where: { name }
        })
            .then(data => {
                if(data.length === 0) throw new ReferenceError('cannot find product')
                return res.status(200).json(data)
            })
            .catch(err => {
                if(err instanceof ReferenceError) return res.status(404).json(`${err.name}: ${err.message}`)
                return res.status(500).json(err)
            })
    },

    updatePattern: (req, res) => {

        const { id } = req.params;
        const { type, quantity } = req.body;

        const getTotal = () => {
            return Pattern.findOne({
                where: { id }
            }).then(pattern => {
                if(pattern === null) return null
                return pattern.total || 0
            })
        }

        const updatePattern = async () => {
            const total = await getTotal()
            if(total === null) return Promise.reject(new ReferenceError('invalid pattern id'))
            if(type !== 'INC' && type !== 'DEC') return Promise.reject(new ReferenceError(`invalid 'type' parameter`))
            const qty = type === 'INC' ? quantity : type === 'DEC' ? -quantity : null
            if(total + qty < 0) return Promise.reject(new RangeError('total will be negative'))
            return Pattern.update({
                total: total + qty
            }, {
                where: { id }
            })
        }

        updatePattern()
            .then(() => res.sendStatus(200))
            .catch(err => {
                if(err.message === 'invalid pattern id') return res.status(404).json(`${err.name}: ${err.message}`)
                if(err instanceof RangeError || err instanceof ReferenceError) return res.status(403).json(`${err.name}: ${err.message}`)
                return res.status(500).json(err)
            })
    },
};

module.exports = productController;