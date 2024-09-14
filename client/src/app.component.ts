import { Component, OnInit } from "@angular/core";
import { SeatService } from "./seat.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  seats: any[] = [];
  seatCount: number = 1;

  constructor(private seatService: SeatService) {}

  ngOnInit() {
    this.getSeats();
  }

  getSeats() {
    this.seatService.getSeats().subscribe((data: any) => {
      this.seats = data;
    });
  }

  reserveSeats() {
    this.seatService.reserveSeats(this.seatCount).subscribe((response: any) => {
      alert("Seats reserved: " + response.reservedSeats);
      this.getSeats(); // Refresh the seat status after booking
    });
  }
}
