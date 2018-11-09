import { Component, Input } from "@angular/core";

@Component({
  selector: "app-division-table",
  templateUrl: "./division-table.component.html",
  styleUrls: ["./division-table.component.css"]
})
export class DivisionTableComponent {
  @Input()
  divisionTeams: any;
  @Input()
  selectedTeamId: number;

  isCurrentTeam(entry) {
    if (!entry || !this.selectedTeamId) return false;
    return entry.team.id === this.selectedTeamId;
  }
}
