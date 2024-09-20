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
    const groupedByRow = groupSeatsByRow(availableSeats as Seat[]);

    for (const rowSeats of Object.values(groupedByRow)) {
      if (rowSeats.length >= seatCount) {
        reservedSeats = rowSeats.slice(0, seatCount);
        break;
      }
    }

    if (reservedSeats.length === 0) {
      reservedSeats = availableSeats.slice(0, seatCount) as Seat[];
    }

    const seatNumbers = reservedSeats.map((seat) => seat.seat_number);
    await db.query(
      'UPDATE seats SET status = "booked" WHERE seat_number IN (?)',
      [seatNumbers]
    );

    res.json({ message: "Seats reserved", reservedSeats: seatNumbers });
  } catch (err) {
    res.status(500).json({ message: "Error reserving seats", err });
  }
// };
// const groupSeatsByRow = (seats: Seat[]): Seat[][] => {
//   return seats.reduce((rows: Seat[][], seat) => {
//     if (!rows[seat.row_number]) {
//       rows[seat.row_number] = [];
//     }
//     rows[seat.row_number].push(seat);
//     return rows;
//   }, []);
// };
