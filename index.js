const express = require('express');
const cors = require('cors');
const { connectDB, sql } = require('./db');
const app = express();
const port = 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API!');
});

app.post('/login', async (req, res) => {
  var usuario = req.body.usuario;
  var contrasena = req.body.contrasena;

  let conexion = await connectDB();
  const result = await conexion.request()
    .input('usuario', sql.VarChar, usuario)
    .input('contrasena', sql.NVarChar, contrasena)
    .query('SELECT * FROM dbo.usuario WHERE nombre_usuario = @usuario AND contrasena = @contrasena');

  console.log(result.recordset);
  let resultado = result.recordset;
  if (resultado.length > 0) {
    res.json({
      datosUsuario: resultado[0]
    });
  } else {
    res.json({
      datosUsuario: null
    });
  }
});

app.post('/registro', async (req, res) => {
  try {
    var nombre = req.body.nombre;
    var fechaNacimiento = req.body.fechaNacimiento;
    var rut = req.body.rut;
    var correo = req.body.correo;
    var tipo = req.body.tipo;
    var usuario = req.body.usuario;
    var contrasena = req.body.contrasena;

    let conexion = await connectDB();
    const result = await conexion.request()
      .input('nombre', sql.VarChar, nombre)
      .input('fechaNacimiento', sql.Date, fechaNacimiento)
      .input('rut', sql.NVarChar, rut)
      .input('correo', sql.VarChar, correo)
      .input('tipo', sql.Int, tipo)
      .input('usuario', sql.VarChar, usuario)
      .input('contrasena', sql.VarChar, contrasena)
      .query('INSERT INTO dbo.usuario (nombre_completo, fecha_nac, rut_usuario, correo, id_tipo, nombre_usuario, contrasena ) VALUES (@nombre, @fechaNacimiento, @rut, @correo, @tipo, @usuario, @contrasena)');
      res.status(200).send({ mensaje: 'Usuario registrado correctamente' });

  }catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).send({ mensaje: 'Error al registrar el usuario' });
  }finally {
    sql.close();
  }
}
);
/*let query = "SELECT * FROM dbo.usuario WHERE nombre_usuario = ? AND contrasena = ?";

// Assuming a database connection object 'connection' is established
sql.query(query, [usuario, contrasena], function (error, results, fields) {
  if (error) throw error;
  // Process results
  console.log(results)
});*

if (usuario == 'hernan' && contrasena == 'hola')
  res.json(true);
else 
  res.json(false);*/


app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});

