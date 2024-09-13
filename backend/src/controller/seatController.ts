import { json, Request, Response } from "express";
import { db } from "../db";
import { Seat } from "../models/seat";
import { QueryResult, RowDataPacket } from "mysql2";

export const getSeats = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM seats");
    res.json(rows);
  } catch (err) {
    res.send({ message: "Error fetching seats", err });
  }
};

export const reserveSeats = async (req: Request, res: Response) => {
  const { seatCount } = req.body;
  console.log(req.body);
  res.send({ message: "success" });
  if (seatCount < 1 || seatCount > 7) {
    return res
      .status(400)
      .json({ message: "You can reserve between 1 and 7 seats at a time" });
  }

  try {
    const [availableSeats] = await db.query<RowDataPacket[]>(
      'SELECT * FROM seats WHERE status = "available" ORDER BY row_number, seat_number'
    );
    if (availableSeats.length < seatCount) {
      return res.status(400).json({ message: "Not enough available seats" });
    }

    let reservedSeats: Seat[] = [];
    const groupedByRow = groupedByRow(availableSeats);

    for (const rowSeats of groupedByRow) {
      if (rowSeats.length >= seatCount) {
        reservedSeats = rowSeats.slice(0, seatCount);
        break;
      }
    }
  } catch (err) {}
};
