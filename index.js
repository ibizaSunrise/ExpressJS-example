import express from 'express'
import path from 'path'
import { requestTime } from './middlewars.js'
import serverRoutes from './routes/servers.js'


const __dirname = path.resolve()

const PORT = process.env.PORT ?? 8888;

const app = express()



app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'))
console.log(app.get('views'))


app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(requestTime)
app.use(serverRoutes)

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Main page',
        active: 'main'

    })
})

app.get('/features', (req, res) => {
    res.render('features', {
        title: 'Features page',
        active: 'features'

    })
})

//static pages html
/*
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
})
*/

//download
/*
app.get('/download', (req, res) => {
    console.log(req.requestTime)
    res.download(path.resolve(__dirname, 'static', 'index.html'))
})
*/


app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`)
})


