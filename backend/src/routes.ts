import { Router, Request, Response } from "express";
import mysql from "mysql2/promise";
import { getSeats, reserveSeats } from "./controller/seatController";

const router = Router();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "seat-reservation",
});

router.get("/seats", getSeats);

router.post("/reserve", reserveSeats);

export default router;
