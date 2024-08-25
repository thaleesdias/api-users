import { Router } from "express"
import db from '../db/connection.js'

const router = Router()

router.get('/users', (req, res) => {
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

router.get('/user', (req, res) => {

    const id = req.body.id
    console.log(id)
    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }

    const query = "SELECT * FROM users WHERE id=?"

    db.query(query,[id], (err, results) => {
        if (err) {
            console.log(err)
            return res.status(404)
        }
        return res.status(200).json(results)
    })
})


router.post('/user/save', (req, res) => {
    const name = req.body.name || 'teste'
    const lastName = req.body.lastName || 'messi'
    const cellNumber = req.body.number || '00000-11111'
    console.log('e')
    const query = `INSERT INTO users (name, lastName, number) VALUES (?,?,?)`

    db.query(query,[name,lastName,cellNumber], (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'vish' })
        }
        return res.status(201).send("usuario cadastrado!")
    })
})

router.delete('/user/delete', (req, res) => {
    const id = req.body.id
    if (!id) {
        console.log('not found')
        return res.status(404).json({ err: "sem id" })
    }

    const query = "DELETE FROM users WHERE id=?"

    db.query(query, [id],  (err, results)=>{
        if(err){
            console.log("F")
            return res.status(400).json({"erro":"erro na query"})
        }
        return res.status(200).json({status:"okay"})
    })
})

router.patch('/user/edit', (req,res)=>{
    const id = req.body.id
    const update = req.body


    if(!id){
        console.log('usuario não encontrado')
        return res.status(404).end()
    }

    const query = "UPDATE users SET ? WHERE id= ?"

    db.query(query,[update,id],(err,results)=>{
        if(err){
            console.log('deu ruim')
            return res.status(400).json({msg:'erro'})
        }

       
        return res.status(200).send({msg:' alterado '})    
    })
    })




export default router;