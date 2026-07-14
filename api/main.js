import { 
    obtener_Herramientas, 
    crear_Herramienta, 
    editar_Herramienta, 
    eliminar_Herramienta
} from './crud.js';

const formulario = document.getElementById('formulario');
const tabla = document.getElementById('tabla-datos');

// Función para visualizar la tabla
function renderizar() 
{
    const datos = obtener_Herramientas();
    tabla.innerHTML = ''; 
    
    datos.forEach(item => {
        tabla.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>
                    <button onclick="preparar_Edicion(${item.id}, '${item.nombre}', ${item.cantidad})">Editar</button>
                    <button onclick="borrar_Registro(${item.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// función para el botón guardar datos
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const cantidad = document.getElementById('cantidad').value;

    if (id) {
        editar_Herramienta(id, nombre, cantidad);
    } else {
        crear_Herramienta(nombre, cantidad);
    }

    formulario.reset();
    document.getElementById('id').value = '';
    renderizar();
});

window.borrar_Registro = function(id) 
{
    if (confirm("¿Seguro que quieres borrar esto?")) {
        eliminar_Herramienta(id);
        renderizar();
    }
};

window.preparar_Edicion = function(id, nombre, cantidad) 
{
    document.getElementById('id').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('cantidad').value = cantidad;
};

// renderiza la tabla al abrir la página
renderizar();