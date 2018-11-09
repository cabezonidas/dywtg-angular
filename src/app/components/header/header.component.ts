import { Component, Input, Output, EventEmitter } from "@angular/core";
import Teams from "src/app/teamsList";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  @Input()
  selectedTeamId: number;
  @Output()
  teamChanged = new EventEmitter();
  teams = Teams;

  constructor() {}

  onSelectTeamChanged(e) {
    this.teamChanged.emit(parseInt(e.target.value));
  }
}
