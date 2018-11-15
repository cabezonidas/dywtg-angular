import { Component, Input } from "@angular/core";
import Teams from "src/app/teamsList";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  @Input()
  teams = Teams;
  selectedTeamId: any;

  constructor(private router: Router, public api: ApiService) {}


  onSelectTeamChanged = (e) => this.router.navigate(['/', e.target.value]);
}
