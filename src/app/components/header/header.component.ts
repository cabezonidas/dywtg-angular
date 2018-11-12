import { Component, Input, Output, EventEmitter } from "@angular/core";
import Teams from "src/app/teamsList";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  @Input()
  teams = Teams;

  constructor(private router: Router) {}

  onSelectTeamChanged = (e) => this.router.navigate(['/', e.target.value]);
}
