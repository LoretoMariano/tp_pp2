// server.js - El motor de nuestra aplicación
const express = require("express");
const app = express();
const PORT = 3000;

// Le decimos al servidor que exponga públicamente los archivos de la carpeta "public"
app.use(express.static("public"));

//Permite que el servidor entienda los datos en formato JSON que le enviaremos
app.use(express.json());

// Simulamos una base de datos en memoria
const productosDB = [
  {
    id: 1,
    nombre: "Teclado Mecánico",
    precio: 50000,
    img: "[https://via.placeholder.com/150](https://via.placeholder.com/150)",
    descuento: true,
  },
  {
    id: 2,
    nombre: "Mouse Gamer",
    precio: 25000,
    img: "[https://via.placeholder.com/150](https://via.placeholder.com/150)",
    descuento: false,
  },
  {
    id: 3,
    nombre: "Monitor 24",
    precio: 180000,
    img: "[https://via.placeholder.com/150](https://via.placeholder.com/150)",
    descuento: true,
  },
];

// Enviamos el arreglo convertido a JSON
app.get("/api/productos", (req, res) => {
  res.json(productosDB);
});

app.post("/api/checkout", (req, res) => {
  const carritoRecibido = req.body; // Aquí viene la info desde el Frontend
  console.log("🛒 ¡NUEVA COMPRA RECIBIDA EN EL SERVIDOR!");
  console.log(carritoRecibido);
  res.json({ mensaje: "Ticket generado con éxito, gracias por su compra" });
});

async function cargarCatalogo() {
  try {
    const respuesta = await fetch("/api/productos"); // Esperamos a la red
    const productos = await respuesta.json(); //Transformamos a JS

    const contenedor = document.getElementById("catalogo");
    contenedor.innerHTML = "";

    productos.forEach((prod) => {
      let badgeHTML = prod.descuento
        ? '<span class="badge bg-danger">10% OFF</span>'
        : "";
      const tarjeta = ` <div class="col-md-4 mb-4"> <div class="card h-100"> <img src="${prod.img}" class="card-img-top" alt="${prod.nombre}"> <div class="card-body"> <h5 class="card-title">${prod.nombre} ${badgeHTML}</h5> <p class="card-text text-success fw-bold">$${prod.precio}</p> <input type="number" id="cant-${prod.id}" class="form-control mb-2" value="1" min="1"> <button class="btn btn-primary w-100" onclick="agregarAlCarrito(${prod.id},
'${prod.nombre}', ${prod.precio})"> Agregar </button> </div> </div> </div> `;
      contenedor.innerHTML += tarjeta;
    });
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
}
cargarCatalogo();

// Encendemos el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
