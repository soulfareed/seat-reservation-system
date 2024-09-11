import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "lycan",
  password: "Fareed!23",
  database: "seat_reservation",
});
