const express = require('express')
const fs = require('fs')
const app = express()

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const httpServer = new HttpServer(app)
const io = new Socket(httpServer)


const products = []
const messages = []

// ACTIONS

io.on('connection', socket => {
    console.log('New user connected');

//    OF PRODUCTS

    socket.emit('products', products);
    socket.on('update-products', data => {
        products.push(data);
        io.sockets.emit('products', products);
    })

//    OF CHAT APP
    
    socket.emit('messages', messages)
    socket.on('update-chat', data => {
        messages.push(data);

        fs.writeFile('./public/files/messages.txt', JSON.stringify(messages), 'utf-8', (err) => {
            console.log(err);
        });

        io.sockets.emit('messages', messages)
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