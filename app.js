require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const productsRoutes = require('./routes/products')

app.use(express.json())

app.use('/api/v1/products', productsRoutes)

app.get('/', (req, res) => res.send('<h1>Store Api</h1>'))

app.use(notFound)
app.use(errorHandler)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Serve listening in port http://localhost:${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
