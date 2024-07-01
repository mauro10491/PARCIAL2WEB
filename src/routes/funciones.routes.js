import {Router} from 'express';
import {pool} from '../db.js';

const router = Router();

router.get('/funciones', async (req, res) => {
    const {rows} = await pool.query('select * from Funciones');
    res.json(rows);
})

router.get('/funciones/:id', async (req, res) => {
    const {id} = req.params
    const {rows} = await pool.query('select * from Funciones where id = $1', [id]);

    if(rows.length === 0){
        return res.status(404).json({message: "Funcion no encontrada"})
    }

    res.json(rows[0])
})

router.post('/funciones', async (req, res) => {
    const data = req.body
    const result = await pool.query('insert into Funciones (Fecha, Hora, PeliculaID, SalaID) values ($1, $2, $3, $4)', [data.fecha, data.hora, data.peliculaid, data.salaid])
    console.log(result)
    res.send('Creando funcion')

})

router.delete('/funciones/:id', async (req, res) => {
    const {id} = req.params
    res.send('Eliminando funciones con id: ' + id)
});

router.put('/funciones/:id', async (req, res) => {   
    const { id } = req.params
    const data = req.body

    const {result} = await pool.query('update Funciones set Fecha = $1, Hora = $2, PeliculaID = $3, SalaID = $4  where id = $5', 
        [data.fecha, data.hora, data.peliculaid, data.salaid, id]
    );

     res.send(data);
});

export default router;