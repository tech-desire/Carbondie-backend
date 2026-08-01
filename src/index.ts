import routes from './routes/index'
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'

const app = express();
dotenv.config();

app.use(cors({
    origin:process.env.HOST_URL || "*"
}))

app.use(express.json())

app.use('/api',routes)

app.listen(process.env.PORT||7000,()=>console.log("Server is connect port",process.env.PORT||7000))