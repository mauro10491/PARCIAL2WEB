import {Router} from 'express';
import {pool} from '../db.js';

const router = Router();

router.get('/clientes', async (req, res) => {
    const {rows} = await pool.query('select * from Clientes');
    res.json(rows);
})

router.get('/clientes/:id', async (req, res) => {
    const {id} = req.params
    const {rows} = await pool.query('select * from Clientes where id = $1', [id]);

    if(rows.length === 0){
        return res.status(404).json({message: "Cliente no encontrada"})
    }

    res.json(rows[0])
})

router.post('/clientes', async (req, res) => {
    const data = req.body
    const result = await pool.query('insert into Clientes (Nombre, Apellido, Email) values ($1, $2, $3)', 
        [data.nombre, data.apellido, data.email])
    console.log(result)
    res.send('Creando Cliente')

})

router.delete('/clientes/:id', async (req, res) => {
    const {id} = req.params
    res.send('Eliminando clientes con id: ' + id)
});

router.put('/clientes/:id', async (req, res) => {   
    const { id } = req.params
    const data = req.body

    const {result} = await pool.query('update Clientes set Nombre = $1, Apellido = $2, Email = $3 where id = $4', 
        [data.nombre, data.apellido, data.email, id]
    );

     res.send(data);
});

export default router;