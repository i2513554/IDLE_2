const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json()); 

// ruta de la api
app.use('/api/empleados', require('./routes/empleadoRoutes'));

// Ruta de diagnóstico simple en el navegador
app.get('/', (req, res) => {
  res.send('API de Empleados de Maxx Grass');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => 
{
  console.log(`Servidor funcionando en: http://localhost:${PORT}`);

});