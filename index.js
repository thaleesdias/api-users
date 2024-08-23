import express from 'express'
import router from './src/routes/routes.js'


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)








app.listen(process.env.PORT, () => {
    console.log('on');
});