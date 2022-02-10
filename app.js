require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
const bodyParser = require('body-parser')

const productController = require('./controllers/productController')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/v1/products', productController.getProducts)
app.post('/api/v1/products', productController.addProduct)
app.get('/api/v1/products/:id', productController.getProduct)
app.patch('/api/v1/products/:id', productController.updateProduct)
app.delete('/api/v1/products/:id', productController.deleteProduct)
app.get('/api/v1/product/search', productController.searchProduct)
app.patch('/api/v1/product/patterns/:id', productController.updatePattern)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
