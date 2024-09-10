import { Router,Request,Response } from "express";
import mysql from 'mysql2/promise';

const router = Router()

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'seat-reservation'
})

router.get('/seats', async(req: Request,res: Response)=>{
    const[rows] = await db.query('SELECT * from seats')
    res.json(rows)
})