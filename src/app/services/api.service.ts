import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import ScheduleModifier from "../interfaces/schedule-modifier.interface";
import Schedule from "../interfaces/schedule";
import GameHighlights from "../interfaces/game-highlights";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  baseUrl: string = "https://statsapi.web.nhl.com";
  apiVersion: string = "/api/v1";

  public selectedTeamIdSource = new BehaviorSubject<any>(null);
  public selectedTeamId$ = this.selectedTeamIdSource.asObservable();

  constructor(private http: HttpClient) {}

  getSchedule = (scheduleModifier: ScheduleModifier) =>
    this.http.get<Schedule>(`${this.baseUrl}${this.apiVersion}/schedule`, { params: this.buildQueryParams(scheduleModifier) });

  getHighlights = (path: string) => this.http.get<GameHighlights>(`${this.baseUrl}${path}`);
  
  getStandingsByDivision = () => this.http.get<any>(`${this.baseUrl}${this.apiVersion}/standings/byDivision`);

  private getScheduleByPeriod = (teamId: number, from: Date, to: Date) => {
    const period = <ScheduleModifier> {
      teamId: teamId,
      startDate: from.toISOString().split('T')[0],
      endDate: to.toISOString().split('T')[0]
    }
    return this.getSchedule(period);
  }

  getScheduleNextYear = (teamId: number) => {
    const today = new Date();
    const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    return this.getScheduleByPeriod(teamId, today, nextYear);
  }

  getSchedulePastYear = (teamId: number) => {
    const today = new Date();
    const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    return this.getScheduleByPeriod(teamId, lastYear, today);
  }

  buildQueryParams = (source: Object): HttpParams => {
    let target: HttpParams = new HttpParams();
    Object.keys(source).filter(key => !!source[key]).forEach(key => target = target.append(key, source[key] as string));
    return target;
  }
}
