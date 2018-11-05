import { Component, OnInit, Input } from "@angular/core";
import { formatDateToString } from "../../common/helpers.js";

@Component({
  selector: "app-fixtures-list-item",
  templateUrl: "./fixtures-list-item.component.html",
  styleUrls: ["./fixtures-list-item.component.css"]
})
export class FixturesListItemComponent implements OnInit {
  @Input()
  fixture: any = {
    games: [{}]
  };

  @Input()
  showResults: boolean = false;
  constructor() {}

  formatDateToString(date) {
    return formatDateToString(date);
  }

  getResultString(team1Score, team2Score) {
    let winLossDraw;
    if (team1Score > team2Score) {
      winLossDraw = "Win";
    } else if (team1Score < team2Score) {
      winLossDraw = "Loss";
    } else {
      winLossDraw = "Draw";
    }

    return `${winLossDraw} ${team1Score} - ${team2Score}`;
  }

  getTeamString(fixture) {
    return `${fixture.teams.home.team.name} vs ${fixture.teams.away.team.name}`;
  }

  // Get the results data from a fixture
  getGameResultsData(fixture, currentTeamId) {
    const homeTeamId = fixture.teams.home.team.id;
    const homeTeamScore = fixture.teams.home.score;
    const awayTeamScore = fixture.teams.away.score;

    // check if home team is the current team and get result string
    return homeTeamId === currentTeamId
      ? this.getResultString(homeTeamScore, awayTeamScore)
      : this.getResultString(awayTeamScore, homeTeamScore);
  }

  ngOnInit() {}
}
