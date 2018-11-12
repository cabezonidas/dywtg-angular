import { Component, OnInit } from "@angular/core";
import { getDateForUrl } from "./common/helpers";
import { ApiService } from "./services/api.service.js";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import ScheduleModifier from "./interfaces/schedule-modifier.interface";
import ScheduleDate from "./interfaces/schedule-date";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "Did you watch the game?";
  selectedTeamId: number = 23;
  nextFixtures$: Observable<ScheduleDate[]>;
  lastFixtures$: Observable<ScheduleDate[]>;
  divisionTeams$: Observable<any>;
  latestFixtures: any[] = [];
  divisionTeams: any[] = [];
  divisionName: string = "Division";

  constructor(private api: ApiService) { }

  onSelectTeamChanged(teamId: number) {


    const fixturesLimit = 5;
    this.setUrlHash(teamId);
    this.selectedTeamId = teamId;

    this.divisionTeams$ = this.api.getStandingsByDivision().pipe(
      map(response => {
        let result: any = null;
        response.records.forEach(standing => {
          standing.teamRecords.forEach(teamRecord => {
            if (teamId === teamRecord.team.id) {
              result = standing;
            }
          });
        });
        return result;        
      }),
      tap(standing => this.divisionName = `${standing.division.name} Division`), // Tap is for side effect
      map(standing => standing.teamRecords)
    );
    
    this.nextFixtures$ = this.api.getScheduleNextYear(teamId).pipe(
      map(response => response.dates.slice(0, fixturesLimit))
    )

    this.lastFixtures$ = this.api.getSchedulePastYear(teamId).pipe(
      map(lastFixtures => lastFixtures.dates.slice(0, fixturesLimit))
    );
  }



  // Set URL hash
  setUrlHash(teamId) {
    document.location.hash = `#${teamId}`;
  }

  // Set team from url hash (default to Canucks if none present)
  getTeamFromUrlHash() {
    return parseInt(document.location.hash.substr(1)) || 23;
  }

  ngOnInit() {
    this.onSelectTeamChanged(this.getTeamFromUrlHash());
  }
}
