import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SeatService {
  private apiUrl = "http://localhost:3000/api";

  constructor(private http: HttpClient) {}

  getSeats() {
    return this.http.get(`${this.apiUrl}/seats`);
  }

  reserveSeats(seatCount: number) {
    return this.http.post(`${this.apiUrl}/reserve`, { seatCount });
  }
}
