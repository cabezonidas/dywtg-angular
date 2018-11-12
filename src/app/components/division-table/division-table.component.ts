import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-division-table",
  templateUrl: "./division-table.component.html",
  styleUrls: ["./division-table.component.css"]
})
export class DivisionTableComponent implements OnChanges {
  @Input() divisionStandings: any;
  @Input() selectedTeamId: number;
  divisionTeams: any;
  divisionName: string;

  isCurrentTeam(entry) {
    if (!entry || !this.selectedTeamId) return false;
    return entry.team.id === this.selectedTeamId;
  }

  ngOnChanges() {
    let standingFound: any;

    if (this.divisionStandings) {
      this.divisionStandings.records.forEach(standing => {
        if (standing.teamRecords.find(teamRecord => `${this.selectedTeamId}` === `${teamRecord.team.id}`)) {
          standingFound = standing;
          this.divisionName = `${standingFound.division.name} Division`;
          this.divisionTeams = standingFound.teamRecords;
          return;
        }
      });
    } else {
      this.divisionName = '';
      this.divisionTeams = undefined;
    }
  }
}
