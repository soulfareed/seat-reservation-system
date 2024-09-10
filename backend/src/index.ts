import express, { Request,Response } from "express";
import seatRoutes from './routes'
import bodyParser from 'body-parser'
import { bundlerModuleNameResolver } from "typescript";


const app = express()

const PORT = 3000;

app.use(bodyParser.json())

app.use('/api',seatRoutes)

app.listen(PORT,()=>{
     console.log('server is running')
})