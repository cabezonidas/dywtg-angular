import { Component, OnInit } from "@angular/core";
import { getDateForUrl } from "./common/helpers";
import { ApiService } from "./services/api.service.js";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import ScheduleModifier from "./interfaces/schedule-modifier.interface";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "Did you watch the game?";
  selectedTeamId: number = 23;
  nextFixtures$: Observable<any>;
  divisionTeams$: Observable<any>;
  latestFixtures: any[] = [];
  divisionTeams: any[] = [];
  divisionName: string = "Division";

  constructor(private api: ApiService) { }

  onSelectTeamChanged(teamId: number) {
    const fixturesLimit = 5;
    this.setUrlHash(teamId);
    this.selectedTeamId = teamId;

    this.getLatestFixtures(
      {
        teamId: teamId,
        startDate: getDateForUrl(-1),
        endDate: getDateForUrl()
      },
      fixturesLimit
    );

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

    const next = <ScheduleModifier> {
      teamId: teamId,
      startDate: getDateForUrl(),
      endDate: getDateForUrl(1)
    }

    this.nextFixtures$ = this.api.getSchedule(next).pipe(
      map(response => response.dates.slice(0, fixturesLimit))
    )
  }

  // Get the selected teams recently played fixtures
  getLatestFixtures(params, limit: number) {
    this.api.getSchedule(params).subscribe(response => {
      const latestFixtures = response.dates.slice(-limit).reverse();
      latestFixtures.forEach((fixture, index) => {
        this.api
          .getHighlights(fixture.games[0].content.link)
          .subscribe(response => {
            let highlightsLink;
            try {
              highlightsLink = response.media.epg[2].items[0].playbacks[9].url;
            } catch (error) {
              // console.log("No highlight link found");
            } finally {
              if (highlightsLink) {
                const updatedFeatures = this.latestFixtures.map(
                  (fixture, i) => {
                    if (i === index) {
                      fixture.games[0].highlightsLink = highlightsLink;
                    }
                    return fixture;
                  }
                );
                this.latestFixtures = updatedFeatures;
              }
            }
          });
      });
      this.latestFixtures = latestFixtures;
    });
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
