import {Router} from 'express';
import {pool} from '../db.js';

const router = Router();

router.get('/peliculas', async (req, res) => {
    const {rows} = await pool.query('select * from Peliculas');
    res.json(rows);
});

router.get('/peliculas/:id', async (req, res) => {
    const {id} = req.params
    const {rows} = await pool.query('select * from Peliculas where idPelicula = $1', [id])

    if(rows.length === 0){
        return res.status(404).json({message: "Pelicula no encontrada"})
    }

    res.json(rows[0]);
});

router.post('/peliculas', async (req, res) => {
    const data = req.body  
    const result = await pool.query('insert into Peliculas (Titulo, Duracion, Genero, Clasificacion) values ($1, $2, $3, $4)', 
        [data.Titulo, data.Duracion, data.Genero, data.Clasificacion])
    console.log(result)
    res.send('Creando Pelicula')
});

router.delete('/peliculas/:id', async (req, res) => {
    const {id} = req.params
    res.send('Eliminando Pelicula con id: ' + id)
});

router.put('/Peliculas/:id', async (req, res) => {   
    const { id } = req.params
    const data = req.body

    const {result} = await pool.query('update Peliculas set Titulo = $1, Duracion = $2, Genero = $3, Clasificacion = $4 where idPelicula = $5', 
        [data.Titulo, data.Duracion, data.Genero, data.Clasificacion, id]
    );

     res.send(data);
});

export default router;