import { Router } from "express"
import db from '../db/connection.js'

const router = Router()

router.get('/users', (req, res) => {
    const query = "SELECT * FROM users;"

    db.query(query, (err, results) => {
        if (err) {
            res.status(404).send('erro ao buscar dados')
            return
        }

        res.status(200).json(results)

    })
})

router.get('/user', (req, res) => {
    const id = req.body.id
    
    if (!id) {
        return res.status(404).json({ msg: "ID nao encontrado" });
    }

    const query = "SELECT * FROM users WHERE id=?"

    db.query(query, (err, results) => {
        if (err) {
            return res.status(404).send({ msg: 'falha ao listar usuarios' })
        }

        return res.status(200).json(results)
    })
})


router.post('/user/save', (req, res) => {
    const name = req.body.name || 'teste'
    const lastName = req.body.lastName || 'teste 2'
    const cellNumber = req.body.number || '00000-11111'
    console.log('e')
    const query = `INSERT INTO users (name, lastName, number) VALUES ('${name}', '${lastName}', '${cellNumber}')`

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ msg: 'falha ao cadastrar usuario' })
        }

        return res.status(201).send({msg:"usuario cadastrado!"})
    })
})

router.delete('/user/delete', (req, res) => {
    const id = req.body.id

    if (!id) {

        return res.status(404).json({ msg: 'usuario nao encontrado' })
    }

    const query = "DELETE FROM users WHERE id=?"

    db.query(query,  (err, results)=>{
        if(err){
            console.log("F")
            return res.status(400).json({"erro":"erro na query"})
        }

        return res.status(200).json({ msg: "usuario deletado" })
    })
})

router.put('/users/edit/:id', (req,res)=>{
    const id = req.body.id
})


export default router;