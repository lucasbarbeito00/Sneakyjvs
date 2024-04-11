//------ARRAY DE ARTICULOS
let stockRopa = [
    {id: 'item1', tipo: 'remera', articulo: 'Remera Blanca', precio: 1395, img: '../assets/img/remeras/remera1.jpg'},
    {id: 'item2', tipo: 'remera', articulo: 'Remera Gris', precio: 1175, img: '../assets/img/remeras/remera2.jpg'},
    {id: 'item3', tipo: 'remera', articulo: 'Remera Negra', precio: 1475, img: '../assets/img/remeras/remera3.jpg'},
    {id: 'item4', tipo: 'remera', articulo: 'Remera Gastada', precio: 1375, img: '../assets/img/remeras/remera4.jpg'},
    {id: 'item5', tipo: 'remera', articulo: 'Remera Negra Flores', precio: 1350, img: '../assets/img/remeras/remera5.jpg'},
    {id: 'item6', tipo: 'remera', articulo: 'Remera Violeta', precio: 1420, img: '../assets/img/remeras/remera6.jpg'},
    {id: 'item7', tipo: 'remera', articulo: 'Remera Naranja', precio: 1250, img: '../assets/img/remeras/remera7.jpg'},
    {id: 'item8', tipo: 'remera', articulo: 'Remera Amarilla', precio: 1100, img: '../assets/img/remeras/remera8.jpg'},
    {id: 'item9', tipo: 'remera', articulo: 'Remera Surface', precio: 1150, img: '../assets/img/remeras/remera9.jpg'},
    {id: 'item10', tipo: 'remera', articulo: 'Remera Maradona', precio: 1520, img: '../assets/img/remeras/remera10.jpg'},
    {id: 'item11', tipo: 'buzo', articulo: 'Buzo Blanco', precio: 4500, img: '../assets/img/buzos/buzo1.jpg'},
    {id: 'item12', tipo: 'buzo', articulo: 'Buzo Epico', precio: 3250, img: '../assets/img/buzos/buzo2.jpg'},
    {id: 'item13', tipo: 'buzo', articulo: 'Buzo Estampado', precio: 4000, img: '../assets/img/buzos/buzo3.jpg'},
    {id: 'item14', tipo: 'buzo', articulo: 'Buzo Verde', precio: 4700, img: '../assets/img/buzos/buzo4.jpg'},
    {id: 'item15', tipo: 'buzo', articulo: 'Sueter Azul', precio: 3000, img: '../assets/img/buzos/buzo5.jpg'},
    {id: 'item16', tipo: 'buzo', articulo: 'Buzo Violeta', precio: 3500, img: '../assets/img/buzos/buzo6.jpg'},
    {id: 'item17', tipo: 'buzo', articulo: 'Sueter Violeta', precio: 3250, img: '../assets/img/buzos/buzo7.jpg'},
    {id: 'item18', tipo: 'buzo', articulo: 'Buzo Naranja', precio: 3750, img: '../assets/img/buzos/buzo8.jpg'},
    {id: 'item19', tipo: 'buzo', articulo: 'Buzo Negro Rosa', precio: 4300, img: '../assets/img/buzos/buzo9.jpg'},
    {id: 'item20', tipo: 'buzo', articulo: 'Buzo Negro', precio: 4500, img: '../assets/img/buzos/buzo10.jpg'}
] 


const contenedorRopa = document.querySelector('.contRem')


//Inyectar Productos
const cargarProductos = (productos) => {
    //vacio vista
    while( contenedorRopa.hasChildNodes() ){
        contenedorRopa.removeChild(contenedorRopa.lastChild);
    }
    //cargar vista
    productos.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('cardRem')
        div.innerHTML = `
        <div class="card-1 card ${producto.tipo}" id="${producto.id}">
            <img class="imgRem" src="${producto.img}" alt="${producto.articulo}">
            <h3>${producto.articulo}</h3>
            <span class="product-price">$${producto.precio}</span>
            <button class="add-to-cart" id="agregar-${producto.id}">Agregar al Carrito</button>
        </div>
        `
        contenedorRopa.appendChild(div)
    
        
    
        const boton = div.getElementsByClassName('add-to-cart')[0]
        
        boton.addEventListener('click', ()=>{
            seleccionarArticulos(producto);
        })
    })
}

cargarProductos(stockRopa)

//----GUARDAR ARCHIVOS EN STOREGE PARA DESPUES PODER AGREGARLOS AL CARRITO


const seleccionarArticulos = (prod) => {
    if(localStorage.getItem('listaArticulosSeleccionados') == null){
        const articulosSeleccionados = [];
        articulosSeleccionados.push(prod);
        localStorage.setItem('listaArticulosSeleccionados', JSON.stringify(articulosSeleccionados));
    }else{
        const listaNueva = JSON.parse(localStorage.getItem('listaArticulosSeleccionados'));
        listaNueva.push(prod);
        localStorage.setItem('listaArticulosSeleccionados', JSON.stringify(listaNueva));
    }
    Toastify({
        text: "El producto se agrego al carrito",
        className: "info",
        style: {
            background: 'rgb(0,0,0);',
            background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(137,105,51,0.7170576848903624) 54%, rgba(105,41,0,1) 100%)'
        }
    }).showToast();
    actualizarCarrito();
}


//----FILTRAR POR TIPO


let btnFiltroRemera = document.getElementById('filtroRemeras')
let btnFiltroBuzo = document.getElementById('filtroBuzos')
let btnTodo = document.getElementById('todo')

btnTodo.addEventListener('click', (e) => {
    cargarProductos(stockRopa)
})

btnFiltroRemera.addEventListener('click', filtrarProductos)
btnFiltroBuzo.addEventListener('click', filtrarProductos)
function filtrarProductos(e) {
    if(e.target.checked){
        let ropaFiltrada = stockRopa.filter(producto => producto.tipo == e.target.value)
        cargarProductos(ropaFiltrada)
    }
}