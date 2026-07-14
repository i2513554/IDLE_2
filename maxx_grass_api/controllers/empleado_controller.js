const fs = require('fs');
const path = require('path');

const rutaJson = path.join(__dirname, '../database.json');

function leerArchivo() 
{
  const contenido = fs.readFileSync(rutaJson, 'utf-8');
  return JSON.parse(contenido);
}

function escribirArchivo(datos) 
{
  fs.writeFileSync(rutaJson, JSON.stringify(datos, null, 2), 'utf-8');
}

// Muestra la lista completa de los empleados
exports.obtenerEmpleados = async (req, res) => 
{
  try 
  {
    const datos = leerArchivo();
    res.json(datos.empleado || []);
  } 
  catch (error) 
  {
    res.status(500).json({ error: 'No se pudo leer el archivo: ' + error.message });
  }
};

// Obtener por número de documento
exports.obtener_Empleado_num_documento = async (req, res) => 
{
  try 
  {
    const datos = leerArchivo();
    const numero_documento = req.params.numero_documento; 

    const empleadoEncontrado = (datos.empleado || []).find(e => String(e.numero_documento) === String(numero_documento));

    if (!empleadoEncontrado) 
    {
      return res.status(404).json({ error: `No se encontró ningún empleado con el número de documento ${numero_documento}` });
    }

    res.json(empleadoEncontrado);
  } catch (error)
  {
    res.status(500).json({ error: 'Error al buscar el empleado: ' + error.message });
  }
};

// Registra a un nuevo empleado (POST)
exports.crearEmpleado = async (req, res) => 
{
  try 
  {
    const datos = leerArchivo();
    
    // Protección por si el arreglo no existía aún en el JSON
    if (!datos.empleado) {
      datos.empleado = [];
    }

    // Buscamos el último ID convirtiéndolo a número con seguridad
    let ultimoId = 0;
    if (datos.empleado.length > 0) {
      const ultimoElemento = datos.empleado[datos.empleado.length - 1];
      ultimoId = Number(ultimoElemento.id_empleado) || 0;
    }

    const nuevoEmpleado = {
      id_empleado: ultimoId + 1,
      nombres: req.body.nombres,
      apellido_1: req.body.apellido_1,
      apellido_2: req.body.apellido_2,
      tipo_documento: req.body.tipo_documento,
      numero_documento: req.body.numero_documento,
      direccion: req.body.direccion || '',
      telefono: req.body.telefono,
      fecha_contrato: req.body.fecha_contrato || '2026-07-09',
      tipo_contrato: req.body.tipo_contrato || 'planilla',
      estado: 'activo',
      id_puesto: req.body.id_puesto
    };

    datos.empleado.push(nuevoEmpleado);
    escribirArchivo(datos);

    res.json({ mensaje: 'Nuevo Empleado registrado', nuevoEmpleado });
  } catch (error) 
  {
    res.status(500).json({ error: 'No se pudo registrar el empleado: ' + error.message });
  }
};

// Modificar datos del empleado por numero_documento (PUT)
exports.actualizarEmpleado = async (req, res) => 
{
  try {
    const datos = leerArchivo();
    const numero_documento = req.params.numero_documento;
    const index = (datos.empleado || []).findIndex(e => String(e.numero_documento) === String(numero_documento));

    if (index === -1) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    datos.empleado[index] = {
      ...datos.empleado[index],
      nombres: req.body.nombres || datos.empleado[index].nombres,
      apellido_1: req.body.apellido_1 || datos.empleado[index].apellido_1,
      apellido_2: req.body.apellido_2 || datos.empleado[index].apellido_2,
      direccion: req.body.direccion || datos.empleado[index].direccion,
      telefono: req.body.telefono || datos.empleado[index].telefono,
      estado: req.body.estado || datos.empleado[index].estado
    };

    escribirArchivo(datos);
    res.json({ mensaje: 'Datos del empleado actualizados', empleado: datos.empleado[index] });
  } catch (error) 
  {
    res.status(500).json({ error: 'No se pudo actualizar los datos del empleado: ' + error.message });
  }
};

// Eliminar empleado identificado por numero_documento (DELETE)
exports.eliminarEmpleado = async (req, res) => 
{
  try 
  {
    const datos = leerArchivo();
    const numero_documento = req.params.numero_documento;
    const listaFiltrada = (datos.empleado || []).filter(e => String(e.numero_documento) !== String(numero_documento));

    if (listaFiltrada.length === (datos.empleado || []).length) 
    {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    datos.empleado = listaFiltrada;
    escribirArchivo(datos);

    res.json({ mensaje: `Empleado con el número de documento: ${numero_documento} eliminado` });
  } catch (error)
  {
    res.status(500).json({ error: 'No se pudo eliminar el empleado: ' + error.message });
  }
};