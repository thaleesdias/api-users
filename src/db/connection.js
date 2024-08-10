import dotenv from 'dotenv'
dotenv.config()

import mysql2 from 'mysql2'


const db = mysql2.createConnection({
    host:'localhost',
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:'users'
})  

db.connect((err)=>{
    if(err){
        console.log('deu ruim com o DB')
        return
    }  
     console.log('conexão okay')
})

export default db