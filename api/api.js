const CLAVE = 'registro_almacen';

export function leer_BD() 
{
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
}

export function escribir_BD(datos) 
{
    localStorage.setItem(CLAVE, JSON.stringify(datos));
}