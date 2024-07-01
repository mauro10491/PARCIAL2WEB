import {Router} from 'express';
import {pool} from '../db.js';

const router = Router();

router.get('/taquilleros', async (req, res) => {
    const {rows} = await pool.query('select * from Taquilleros');
    res.json(rows);
})

router.get('/taquilleros/:id', async (req, res) => {
    const {id} = req.params
    const {rows} = await pool.query('select * from Taquilleros where id = $1', [id]);

    if(rows.length === 0){
        return res.status(404).json({message: "taquilleros no encontrada"})
    }

    res.json(rows[0])
})

router.post('/taquilleros', async (req, res) => {
    const data = req.body
    const result = await pool.query('insert into Taquilleros (Nombre, Apellido, Email) values ($1, $2, $3)', 
        [data.nombre, data.apellido, data.email])
    console.log(result)
    res.send('Creando taquilleros')

})

router.delete('/taquilleros/:id', async (req, res) => {
    const {id} = req.params
    res.send('Eliminando taquilleros con id: ' + id)
});

router.put('/taquilleros/:id', async (req, res) => {   
    const { id } = req.params
    const data = req.body

    const {result} = await pool.query('update Taquilleros set Nombre = $1, Apellido = $2, Email = $3 where id = $4', 
        [data.nombre, data.apellido, data.email, id]
    );

     res.send(data);
});

export default router;