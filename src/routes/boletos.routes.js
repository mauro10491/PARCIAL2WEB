import {Router} from 'express';
import {pool} from '../db.js';

const router = Router();

router.get('/boletos', async (req, res) => {
    const {rows} = await pool.query('select * from Boletas');
    res.json(rows);
})

router.get('/boletos/:id', async (req, res) => {
    const {id} = req.params
    const {rows} = await pool.query('select * from Boletas where id = $1', [id]);

    if(rows.length === 0){
        return res.status(404).json({message: "Boletas no encontrada"})
    }

    res.json(rows[0])
})

router.post('/boletos', async (req, res) => {
    const data = req.body
    const result = await pool.query('insert into Boletas (Precio, FuncionID, PuestoID, ClienteID, TaquilleroID) values ($1, $2, $3, $4, $5)', 
        [data.precio, data.funcionid, data.puestoid, data.clienteid, data.taquilleroid])
    console.log(result)
    res.send('Creando boletos')

})

router.delete('/boletos/:id', async (req, res) => {
    const {id} = req.params
    res.send('Eliminando taquilleros con id: ' + id)
});

router.put('/boletos/:id', async (req, res) => {   
    const { id } = req.params
    const data = req.body

    const {result} = await pool.query('update Boletas set Precio = $1, FuncionID = $2, PuestoID = $3, ClienteID = $4, TaquilleroID = $5 where id = $6', 
        [data.precio, data.funcionid, data.puestoid, data.clienteid, data.taquilleroid, id]
    );

     res.send(data);
});

export default router;