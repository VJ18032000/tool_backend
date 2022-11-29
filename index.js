const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const url = "mongodb://localhost/image"

const app = express()
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.json())
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection
con.on('open', () => {
    console.log('database connection....')
})

const AuthRoute = require('./routes/user')
app.use('/', AuthRoute)
app.use('/uploads', express.static('uploads'))

const imgroute=require('./routes/image')

app.use('/', imgroute)


app.listen(1111, () => console.log('server connection...1111'))

