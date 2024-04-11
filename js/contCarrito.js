// Traer productos almacenados en el STORAGE
let elementosCarritos = JSON.parse(localStorage.getItem('listaArticulosSeleccionados'))


let carritoOk = document.getElementsByClassName('carrito')[0];

// Inyectar Productos almacenados
const mostrarProductos = () =>{
    elementosCarritos.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('divCarrito')
        div.innerHTML = `
        <tr>
            <td><img src="${producto.img}" alt="${producto.id}"></td>
            <td><span id="nombre">${producto.articulo}</span></td>
            <td><div id="precio">$${producto.precio}</div></td>
            <td><button class="remove-btn">X</button></td>
        </tr>
        `
        carritoOk.appendChild(div)
    
    
    
        const boton = div.getElementsByClassName('remove-btn')[0]
        boton.addEventListener('click', (e) => {
            Toastify({
                text: "Se elimino el producto",
                className: "info",
                style: {
                    background: 'rgb(0,0,0);',
                    background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(137,105,51,0.7170576848903624) 54%, rgba(105,41,0,1) 100%)'
                }
            }).showToast();
            eliminarProducto(producto)
            borrarDeLaVista(e)
            actualizarPrecio()
        })
    })
}
if(elementosCarritos == null || elementosCarritos.length == 0){ //Aviso por si el carrito esta vacio
    const div = document.createElement('div')
        div.classList.add('divCarritoVacio')
        div.innerHTML = `
        <div>El carrito esta vacio.</div>
        `
        carritoOk.appendChild(div)
}else{
    mostrarProductos()
}

//F(x) eliminar productos
const eliminarProducto = (prod) => {
    let index = elementosCarritos.indexOf(prod)
    elementosCarritos.splice(index,1)

    localStorage.setItem('listaArticulosSeleccionados', JSON.stringify(elementosCarritos));
    actualizarCarrito();
}

function borrarDeLaVista(e) {
    btn = e.target
    btn.parentElement.remove()
}








let precioTotal = document.getElementsByClassName('precioTotal')[0]

const actualizarPrecio = () =>{
    let precioSumado = elementosCarritos.reduce((valorFinal,elem)=>{
        return valorFinal + elem.precio
    },0)
    precioTotal.innerHTML = precioSumado
}
actualizarPrecio()



//Boton Pagar
let btnPagar = document.querySelector('.pagar')
btnPagar.addEventListener('click', ()=>{
    numeroRandom = parseInt(Math.random() * pokemons.length)
    comentarioRandom = parseInt(Math.random() * comentario.length)
    obtenerPokemon()
    Swal.fire({
        icon: 'error',
        title: 'No se pudo realizar la compra',
        text:`¡Vuelva a intentarlo luego! \n
        De todos modos te damos tu Pokemon`,
        confirmButtonColor: '#261514',
      })
})




// POKEMON 
let numeroRandom = 0
let nombrePokemon = 0
let imgPokemon = 0



let pokemons = ['ditto','charizard','onix','pikachu','bulbasaur','charmander','squirtle','rattata','ekans','zubat','meowth','gyarados','dragonite','mewtwo','mew'];
let comentario = ['Gran Pokemon','Wow','Increible','De los Mejores'];



let contenedorPokemon = document.querySelector('#contendorPokemon')



const obtenerPokemon = ()=>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemons[numeroRandom]}`)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            console.log(resultado)
            nombrePokemon = resultado.name.toUpperCase()
            imgPokemon = resultado.sprites.front_default
            console.log(nombrePokemon)
            console.log(imgPokemon)
            for(let i = 0; i < 1; i++){
                const div = document.createElement('div')
                contenedorPokemon.innerHTML += `
                <div class="card mt-4" style="width: 15rem;">
                    <img src="${imgPokemon}" class="card-img-top mx-auto" alt="..." style="width: 200px;">
                    <div class="card-body">
                        <h5 class="card-title d-flex justify-content-center">${nombrePokemon}</h5>
                        <p class="card-text d-flex justify-content-center">${comentario[comentarioRandom]}</p>
                    </div>
                </div>
                `
                contenedorPokemon.appendChild(div)
            }
        })
        .catch(error => console.log(error))
}