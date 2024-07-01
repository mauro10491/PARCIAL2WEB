import {Router} from 'express';
import {pool} from '../db.js';

const router = Router();

router.get('/filas', async (req, res) => {
    const {rows} = await pool.query('select * from Filas');
    res.json(rows);
})

router.get('/filas/:id', async (req, res) => {
    const {id} = req.params
    const {rows} = await pool.query('select * from Filas where idFilas = $1', [id]);

    if(rows.length === 0){
        return res.status(404).json({message: "Sala no encontrada"})
    }

    res.json(rows[0])
})

router.post('/filas', async (req, res) => {
    const data = req.body
    const result = await pool.query('insert into Filas (Numero, salaId) values ($1, $2)', [data.numero, data.salaId])
    console.log(result)
    res.send('Creando fila')

})

router.delete('/filas/:id', async (req, res) => {
    const {id} = req.params
    res.send('Eliminando Filas con id: ' + id)
});

router.put('/filas/:id', async (req, res) => {   
    const { id } = req.params
    const data = req.body

    const {result} = await pool.query('update Filas set numero = $1, SalaId = $2 where idFilas = $3', 
        [data.nombre, data.capacidad, id]
    );

     res.send(data);
});

export default router;