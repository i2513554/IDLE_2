# Maxx Grass - API Backend
Este proyecto inicializa automáticamente una base de datos de lista del personal.

1. **Requiere dependencias npm**:
   Abre una terminal dentro de esta carpeta y ejecuta:
   ```bash
   npm install
2. **Pruebas**:
Enlace para visualizar la lista completa de empleados: GET
http://localhost:3000/api/empleados/ 

Enlace para obtener datos de empleado segun su numero de documento: GET
/api/empleados/ (numero de documento ) ejemplo: 

http://localhost:3000/api/empleados/69875437

Metodo para agregar un nuevo empleado : POST

{
  "nombres": "nombres",
  "apellido_1": "apelido 1",
  "apellido_2": "apellido 2",
  "tipo_documento": "tipo de documento dni/ce",
  "numero_documento": "numero de documento",
  "direccion": "direccion",
  "telefono": "numero de telefono",
  "fecha_contrato": "Año-Mes-Dia",
  "tipo_contrato": "planilla/recibo_honorarios",
  "id_puesto": "1" <- segun su tipo de puesto laboral 
}