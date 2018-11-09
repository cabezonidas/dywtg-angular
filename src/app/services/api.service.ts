import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import ScheduleModifier from "../interfaces/schedule-modifier.interface";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  baseUrl: string = "https://statsapi.web.nhl.com";
  apiVersion: string = "/api/v1";
  constructor(private http: HttpClient) {}

  getSchedule = (scheduleModifier: ScheduleModifier) =>
    this.http.get<any>(`${this.baseUrl}${this.apiVersion}/schedule`, { params: this.buildQueryParams(scheduleModifier) });

  getHighlights = (path: string) => this.http.get<any>(`${this.baseUrl}${path}`);
  
  getStandingsByDivision = () => this.http.get(`${this.baseUrl}${this.apiVersion}/standings/byDivision`);

  buildQueryParams = (source: Object): HttpParams => {
    let target: HttpParams = new HttpParams();
    Object.keys(source).filter(key => !!source[key]).forEach(key => target = target.append(key, source[key] as string));
    return target;
  }
}
