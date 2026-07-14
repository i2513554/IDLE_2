import { leer_BD, escribir_BD } from './api.js';

export function obtener_Herramientas() 
{
    return leer_BD();
}

export function crear_Herramienta(nombre, cantidad) 
{
    const datos = leer_BD();
    // Creamos un ID rápido basado en la fecha
    const nueva = { id: Date.now(), nombre: nombre, cantidad: cantidad };
    datos.push(nueva);
    escribir_BD(datos);
}

export function editar_Herramienta(id, nombre, cantidad) 
{
    const datos = leer_BD();
    const index = datos.findIndex(item => item.id == id);
    
    if (index !== -1) {
        datos[index] = { id: Number(id), nombre: nombre, cantidad: cantidad };
        escribir_BD(datos);
    }
}

export function eliminar_Herramienta(id) 
{
    let datos = leer_BD();
    datos = datos.filter(item => item.id != id);
    escribir_BD(datos);
}