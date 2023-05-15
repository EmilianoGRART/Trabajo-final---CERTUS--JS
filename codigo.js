//Crear variables 
let arrayCatalogo = new Array();//defrente array vacio
let numPage;

let parametrosURL = new URLSearchParams(location.search);

//COMPROBAR CON IF
if (parseInt(parametrosURL.get("page")) == 1 || parametrosURL.get("page") == null) {
    numPage = 1;
} else {
    numPage = parametrosURL.get("page") == 1;
}

// Retrieve datos del json
fetch("productos.json").then(respuesta => respuesta.json()).then(objeto => {
    arrayCatalogo = objeto;
    abrirCatalogo(numPage);
})

// Definir FUNCION 
function abrirCatalogo(pagina) {
    let filaCatalogo = document.querySelector("#catalogo");
    let inicio = (pagina - 1) * 8 ;// formula para encontrar el inicio
    let final;
    let tmbfinal = pagina * 8;
    // Se hace una condicional IF
    if (arrayCatalogo.length < tmbfinal) {
        final = arrayCatalogo.length;
        //LO DEMAS
    } else {
        final = tmbfinal;
    }
    for (let index = inicio; index <= final; index++) {
        // DEFINIR VARIABLES LET
        let nombre = arrayCatalogo[index].name;
        let nomImage = arrayCatalogo[index].image;
        let precio = arrayCatalogo[index].price;
        let oferta = arrayCatalogo[index].offer * 100;
        let precioFinal = precio -(precio * oferta / 100);
        // Se crea el nuevo producto
        let nuevoProducto = document.createElement("article");
        nuevoProducto.setAttribute("class", 'class="col-xs-12 col-sm-6 col-md-4 col-xl-3"');
        nuevoProducto.innerHTML =
            `
        <picture>
        <img class="img-fluid" src="image/productos/${nomImage}">
        </picture>
        <h4>${nombre}</h4>
        <span class="precioOriginal">S/ ${precio}</span>
        <span class="precioDescuento">-${oferta}%</span> <br>
        <span class="precioFinal">S/ ${precioFinal}</span>
        </p>
        <button onclick="addCarrito(event)" class="btn btn-light">
        <i class="bi bi-plus-square"></i> 
        Agregar Carrito 
        </button>
        `;
        // Insertar el nuevo producto al cuerpo de la pagina
        filaCatalogo.append(nuevoProducto);
    }
}
function addCarrito(event) {
    const button = event.target;
    const article = button.closest('article');
    const nombre = article.querySelector('h4').innerText;
    const precio = article.querySelector('.precioFinal').innerText;
    const imagenSrc = article.querySelector('img').getAttribute('src');

    const nuevoProducto = document.createElement('div');
    nuevoProducto.innerHTML = `
      <p>${nombre}</p>
      <img src="${imagenSrc}" alt="${nombre}">
      <p>${precio}</p>
    `;

    const carritoProductos = document.getElementById('carritoProductos');
    carritoProductos.appendChild(nuevoProducto);

    const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
    carritoModal.show();
  }
