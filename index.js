const fs = require('fs')
const express = require('express')
const app = express()

app.listen(3000, console.log('Servidor Activado'))

app.use(express.json())

app.post("/canciones", (req, res) => {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('canciones.json', 'utf8'))
    canciones.push(cancion)
    fs.writeFileSync('canciones.json', JSON.stringify(canciones))
    res.send('Cancion agregada correctamente')
})

app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync('canciones.json', 'utf8'))
    res.json(canciones);
})

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync('canciones.json', 'utf8'));
    const index = canciones.findIndex(c => c.id == id)  
    canciones.splice(index, 1)
    fs.writeFileSync('canciones.json', JSON.stringify(canciones))
    res.send('Cancion borrada con exito')
})

app.put("/canciones/:id", (req, res) => {
    const { id } = req.params;
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('canciones.json', 'utf8'));
    const index = canciones.findIndex(c => c.id == id);
    canciones[index] = cancion;
    fs.writeFileSync('canciones.json', JSON.stringify(canciones))
    res.send('Cancion actualizada correctamente')
})

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})