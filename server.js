import { MessagesOptions } from './src/db/connection/connection.js';
import MessagesClienteSQL from './src/db/classes/MessagesClass.js';
import { ProductsOptions } from './src/db/connection/connection.js';
import ProductsClienteSQL from './src/db/classes/ProductsClass.js';

import express  from 'express'
const app = express()
import { createServer } from 'http'
import { Server }  from 'socket.io'



const httpServer = createServer(app);
const io = new Server(httpServer, {

});


/////

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src'))

/////

const products = []
const messages = []

// ACTIONS

io.on('connection', socket => {
    console.log('New user connected');

//    OF PRODUCTS

    socket.emit('products', products);
    socket.on('update-products', data => {
        products.push(data);

        const sqlProducts = new ProductsClienteSQL(ProductsOptions);

        sqlProducts.crearTabla()
        .then(() => {
            return sqlProducts.addProducts(products)
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            return sqlProducts.close()
        })

        io.sockets.emit('products', products);
    })

//    OF CHAT APP
    
    socket.emit('messages', messages)
    socket.on('update-chat', data => {
        messages.push(data);

        const sqlMessages = new MessagesClienteSQL(MessagesOptions);

        sqlMessages.crearTabla()
        .then(() => {
            return sqlMessages.insertarArticulos(messages);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            return sqlMessages.close()
        })


        io.sockets.emit('messages', messages)
    })
})

/////

const PORT = 8080

httpServer.listen(PORT, () => {
    console.log(`Escuchando en el ${PORT}`);
})