import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import ScheduleDate from 'src/app/interfaces/schedule-date';
import { ApiService } from 'src/app/services/api.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { map, tap, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = "Did you watch the game?";
  selectedTeamId$: Observable<number>;
  nextFixtures$: Observable<ScheduleDate[]>;
  lastFixtures$: Observable<ScheduleDate[]>;
  divisionTeams$: Observable<any>;
  divisionName: string = "Division";
  teamId: number;

  constructor(private api: ApiService, private route: ActivatedRoute) { 
    this.selectedTeamId$ = this.route.params.pipe(map(p => p.id));
  }

  ngOnInit () {
    this.divisionTeams$ = this.selectedTeamId$.pipe(
      switchMap(teamId => this.api.getStandingsByDivision().pipe(
        map(response => {
          let result: any = null;
          response.records.forEach(standing => {
            standing.teamRecords.forEach(teamRecord => {
              if (`${teamId}` === `${teamRecord.team.id}`) {
                result = standing;
              }
            });
          });
          return result;        
        }),
        filter(standing => !!standing),
        tap(standing => this.divisionName = `${standing.division.name} Division`), // Tap is for side effect
        map(standing => standing.teamRecords)
      ))
    );
      
    this.nextFixtures$ = this.selectedTeamId$.pipe(
      switchMap(teamId => this.api.getScheduleNextYear(teamId).pipe(
        map(response => response.dates.slice(0, 5))
      ))
    );
      
    this.lastFixtures$ = this.selectedTeamId$.pipe(
      switchMap(teamId => this.api.getSchedulePastYear(teamId).pipe(
        map(response => response.dates.slice(0, 5))
      ))
    );
  }
}
