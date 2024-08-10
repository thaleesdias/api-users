
import express from 'express'
import db from './src/db/connection.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/users', (req, res) => {
    const query = "SELECT * FROM users;"
    db.query(query, (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).send('erro ao buscar dados')
            return
        }
        res.json(results)

    })
})

app.get('/user', (req, res) => {

    const id = req.body.id
    console.log(id)
    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }

    const query = `SELECT * FROM users WHERE id=${id}`

    db.query(query, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(404)
        }
        return res.status(200).json(results)
    })

    return res.status(200)
})


app.post('/user/save', (req, res) => {
    const name = req.body.name
    const lastName = req.body.lastName
    const cellNumber = req.body.number
    console.log('e')
    const query = `INSERT INTO users (name, lastName, number) VALUES ('${name}', '${lastName}', '${cellNumber}')`

    db.query(query, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'vish' })
        }
        return res.status(201).json(results)
    })
})







app.listen(process.env.PORT, () => {
    console.log('on');
});