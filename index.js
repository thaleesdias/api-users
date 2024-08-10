
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
    const name = req.body.name || 'teste'
    const lastName = req.body.lastName || 'messi'
    const cellNumber = req.body.number || '00000-11111'
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

app.post('/user/delete', (req, res) => {
    const id = req.body.id
    if (!id) {
        console.log('not found')
        return res.status(404).json({ err: "" })
    }
})



dadada



app.listen(process.env.PORT, () => {
    console.log('on');
});