import { Component, OnInit } from "@angular/core";
import { getDateForUrl } from "./common/helpers";
import { ApiService } from "./services/api.service.js";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import ScheduleModifier from "./interfaces/schedule-modifier.interface";
import ScheduleDate from "./interfaces/schedule-date";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {

}
