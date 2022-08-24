import { Router } from "express";

const routerProducts = Router()
import Contenedor from '../controllers/contenedor.js'

const contenedor = new Contenedor('./dataBase/productos.txt')


routerProducts.get('/', async (req, res) => {
    res.sendFile('../public/index.html', { root: __dirname })


})
routerProducts.get('/:id', async (req, res) => {
    const { id } = req.params
    const { title } = req.params
    const prodByID = await contenedor.getByiD(parseInt(id))
    const prodByTitle = await contenedor.getByiD(parseInt(title))

    console.log(prodByID)
    console.log(prodByTitle)
    res.json({
        ok: true,
        mensaje: 'seleccionaste ' +
        prodByID,
        id
    })
})

// 

routerProducts.put('/:id', async (req, res) => {
    const { id } = req.params
    const objProducto = req.body
    console.log(objProducto)

    const productoActualizado = await contenedor.updateById({ id: parseInt(id), ...objProducto })
    console.log(productoActualizado)
    res.json({
        ok: true,

        mensaje: productoActualizado
    })
})



routerProducts.post('/', async (req, res) => {
    const objProducto = req.body
    await contenedor.save(objProducto)
    res.json({
        ok: true,
        mensaje: 'producto guardado',
        objProducto
    })
})

routerProducts.delete('/:id', async (req, res) => {
    const { id } = req.params
    const prodByID = await contenedor.getByiD(parseInt(id))
    console.log(prodByID)
    res.json({
        ok: true,
        mensaje: 'eliminaste ',
        prodByID,
        id
    })
})
routerProducts.use("*", (req, res) => {
    res.json({
        error: -2,
        description: `Ruta: ${req.url} Método: ${req.method} no implementada`,
    })
})

export default routerProducts