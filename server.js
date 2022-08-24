 import dotenv from 'dotenv'
 dotenv.config()
import express from 'express'
const app = express()


import routerProducts from './routes/routerProducts.js'
import routerCart from './routes/routerCart.js'
import isAdmin from './requiriments/admin.js'






//rutas




// Permite recibir parámetros en formato JSON.
app.use(express.json());

// Se agrega el middleware en la aplicación.
app.use(isAdmin);

// Ruta a la cual solo deben ingresar usuarios administradores.
app.get('/dashboard', (req, res) => {
    res.send('You are an admin');
});









//middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

//apis

app.use('/api/productos', routerProducts)


app.use('/api/carrito', routerCart)



// const PORT=8080
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))