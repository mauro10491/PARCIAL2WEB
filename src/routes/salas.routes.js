import {Router} from 'express';
import {pool} from '../db.js';

const router = Router();

router.get('/salas', async (req, res) => {
    const {rows} = await pool.query('select * from Salas');
    res.json(rows);
})

router.get('/salas/:id', async (req, res) => {
    const {id} = req.params
    const {rows} = await pool.query('select * from Salas where idSalas = $1', [id]);

    if(rows.length === 0){
        return res.status(404).json({message: "Sala no encontrada"})
    }

    res.json(rows[0])
})

router.post('/salas', async (req, res) => {
    const data = req.body
    const result = await pool.query('insert into Salas (Nombre, Capacidad) values ($1, $2)', [data.nombre, data.capacidad])
    console.log(result)
    res.send('Creando Sala')

})

router.delete('/salas/:id', async (req, res) => {
    const {id} = req.params
    res.send('Eliminando Consecionario con id: ' + id)
});

router.put('/salas/:id', async (req, res) => {   
    const { id } = req.params
    const data = req.body

    const {result} = await pool.query('update Salas set nombre = $1, capacidad = $2 where idSalas = $3', 
        [data.nombre, data.capacidad, id]
    );

     res.send(data);
});

export default router;