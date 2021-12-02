require('dotenv').config()

const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')

const productController = require('./controllers/productController')

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/v1/products', productController.getProducts)
app.get('/api/v1/products/:id', productController.getProduct)
app.get('/api/v1/product/trending', productController.getTrendingProducts)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
