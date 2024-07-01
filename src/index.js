import express from 'express'
import {PORT} from './config.js'
import peliculaRoute from './routes/pelicula.routes.js'
import salasRoute from './routes/salas.routes.js'
import filasRoute from './routes/filas.routes.js'
import puestosRoute from './routes/puestos.routes.js'
import funcionesRoute from './routes/funciones.routes.js'
import clientesRoute from './routes/clientes.routes.js'

const app = express()

app.use(express.json())
app.use(peliculaRoute);
app.use(salasRoute);
app.use(filasRoute);
app.use(puestosRoute);
app.use(funcionesRoute);
app.use(clientesRoute);

app.listen(PORT)
console.log('Server on port', PORT)