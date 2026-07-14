const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleado_controller');

router.get('/', empleadoController.obtenerEmpleados);
router.get('/:numero_documento', empleadoController.obtener_Empleado_num_documento);
router.post('/', empleadoController.crearEmpleado);
router.put('/:numero_documento', empleadoController.actualizarEmpleado);
router.delete('/:numero_documento', empleadoController.eliminarEmpleado);

module.exports = router;