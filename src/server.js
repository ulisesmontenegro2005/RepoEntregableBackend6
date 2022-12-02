const express = require('express')
const app = express()

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const httpServer = new HttpServer(app)
const io = new Socket(httpServer)


const products = []

// ACTIONS OF PRODUCTS

io.on('connection', socket => {
    console.log('New user connected');


    socket.emit('products', products);
    socket.on('update-products', data => {
        products.push(data);
        io.sockets.emit('products', products);
        console.log(products);
    })
    

})
/////

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

/////

const PORT = 3000

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Escuchando en el ${PORT}`);
})