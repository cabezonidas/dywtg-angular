import { Component, OnInit } from "@angular/core";
import teams from "./teamsList.js";
import { getDateForUrl } from "./common/helpers";
import { ApiService } from "./services/api.service.js";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [ApiService]
})
export class AppComponent implements OnInit {
  title: string = "Did you watch the game?";
  teams: any[] = teams;
  api;
  selectedTeamId: number = 23;
  nextFixtures: any[] = [];
  latestFixtures: any[] = [];
  divisionTeams: any[] = [];
  divisionName: string = "Division";

  constructor(ApiService: ApiService) {
    this.api = ApiService;
  }

  onSelectTeamChanged(teamId: number) {
    const fixturesLimit = 5;
    this.setUrlHash(teamId);
    this.selectedTeamId = teamId;

    // Get the information for the selected team
    this.getNextFixtures(
      {
        teamId: teamId,
        startDate: getDateForUrl(),
        endDate: getDateForUrl(1)
      },
      fixturesLimit
    );
    this.getLatestFixtures(
      {
        teamId: teamId,
        startDate: getDateForUrl(-1),
        endDate: getDateForUrl()
      },
      fixturesLimit
    );
    this.getDivisionTeams(teamId);
  }

  // Get the selected teams next fixtures
  getNextFixtures(params, limit: number) {
    this.api.getSchedule(params).subscribe(response => {
      this.nextFixtures = response.dates.slice(0, limit);
    });
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

  // Get the division of the selected team
  getDivisionTeams(teamId: number) {
    this.api.getStandingsByDivision(teamId).subscribe(response => {
      response.records.forEach(standing => {
        standing.teamRecords.forEach(teamRecord => {
          if (teamId === teamRecord.team.id) {
            this.divisionName = `${standing.division.name} Division`;
            this.divisionTeams = standing.teamRecords;
            return;
          }
        });
      });
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
