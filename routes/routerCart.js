
import { Router } from "express";
const routerCart = Router()


import Contenedor from '../controllers/contenedor.js'
const carrito = new Contenedor('./dataBase/carrito.txt')


routerCart.get('/', async (req, res) => {
    res.sendFile('public/carrito.html', { root: __dirname })



})

routerCart.get('/:id/productos', async (req, res) => {
    const productos = await carrito.getAll()
    res.send(productos)


})


routerCart.post('/:id/productos', async (req, res) => {
    const { id } = req.params
    const prodByID = await carrito.getByiD(parseInt(id))
    console.log(prodByID)
    res.json({
        ok: true,
        mensaje: 'seleccionaste ' + prodByID.title,
        prodByID,
        id
    })
})

routerCart.post('/', async (req, res) => {
    const objProducto = req.body
    await carrito.save(objProducto)
    res.json({
        ok: true,
        mensaje: 'producto guardado',
        objProducto
    })
})

routerCart.delete('/:id', async (req, res) => {
    const { id } = req.params
    const prodByID = await carrito.deleteAll(parseInt(id))
    console.log(prodByID)
    res.json({
        ok: true,
        mensaje: 'eliminaste ',
        prodByID,
        id
    })
})

routerCart.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id } = req.params
    const prodByID = await carrito.deleteById(parseInt(id))
    console.log(prodByID)
    res.json({
        ok: true,
        mensaje: 'eliminaste ',
        prodByID,
        id
    })
})
routerCart.use("*", (req, res) => {
    res.json({
        error: -2,
        description: `Ruta: ${req.url} Método: ${req.method} no implementada`,
    })
})
export default routerCart