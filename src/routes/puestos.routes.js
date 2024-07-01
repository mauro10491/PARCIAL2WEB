import {Router} from 'express';
import {pool} from '../db.js';

const router = Router();

router.get('/puestos', async (req, res) => {
    const {rows} = await pool.query('select * from Puestos');
    res.json(rows);
})

router.get('/puestos/:id', async (req, res) => {
    const {id} = req.params
    const {rows} = await pool.query('select * from Puestos where id = $1', [id]);

    if(rows.length === 0){
        return res.status(404).json({message: "Puesto no encontrada"})
    }

    res.json(rows[0])
})

router.post('/puestos', async (req, res) => {
    const data = req.body
    const result = await pool.query('insert into Puestos (Numero, FilaId) values ($1, $2)', [data.numero, data.filaId])
    console.log(result)
    res.send(data)

})

router.delete('/puestos/:id', async (req, res) => {
    const {id} = req.params
    res.send('Eliminando Filas con id: ' + id)
});

router.put('/puestos/:id', async (req, res) => {   
    const { id } = req.params
    const data = req.body

    const {result} = await pool.query('update Puestos set numero = $1, FilaId = $2 where id = $3', 
        [data.nombre, data.capacidad, id]
    );

     res.send(data);
});

export default router;