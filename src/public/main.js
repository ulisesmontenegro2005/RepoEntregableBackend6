const socket = io();

// ACTIONS OF PRODUCTS

const formProducto = document.getElementById('form-producto');
formProducto.addEventListener('submit', e => {
    e.preventDefault();

    const product = {
        name: document.getElementById('producto-nombre').value,
        stock: document.getElementById('producto-stock').value,
        thumbnail: document.getElementById('producto-url').value
    }

    socket.emit('update-products', product)
    formProducto.reset();
})

socket.on('products', renderProducts);
async function renderProducts(products) {

    const fetchRender = await fetch('hbs/products.hbs');
    const textoPlantilla = await fetchRender.text();
    const functionTemplate = Handlebars.compile(textoPlantilla);

    const html = functionTemplate({ products });
    document.getElementById('productos').innerHTML = html;
}
