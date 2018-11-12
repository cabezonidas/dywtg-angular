import { Component, OnInit, Input, OnChanges } from "@angular/core";
import Game from "src/app/interfaces/game";

@Component({
  selector: "app-fixtures-list",
  templateUrl: "./fixtures-list.component.html",
  styleUrls: ["./fixtures-list.component.css"]
})
export class FixturesListComponent {
  @Input()
  fixtures: Game[];

  @Input()
  currentTeamId: number;

  @Input()
  showResults: boolean = false;

  constructor() {}
}
