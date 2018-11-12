import { Component, OnInit, Input } from "@angular/core";
import { formatDateToString } from "../../common/helpers.js";
import Game from "src/app/interfaces/game.js";

@Component({
  selector: "app-fixtures-list-item",
  templateUrl: "./fixtures-list-item.component.html",
  styleUrls: ["./fixtures-list-item.component.css"]
})
export class FixturesListItemComponent implements OnInit {
  @Input()
  fixture: Game;

  @Input()
  showResults: boolean = false;

  @Input()
  currentTeamId: number;
  constructor() {}

  formatDateToString(date) {
    return formatDateToString(date);
  }

  getTeamString(fixture) {
    return `${fixture.teams.home.team.name} vs ${fixture.teams.away.team.name}`;
  }

  ngOnInit() { }
}
