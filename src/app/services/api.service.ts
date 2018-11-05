import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  baseUrl: string = "https://statsapi.web.nhl.com";
  apiVersion: string = "/api/v1";
  constructor(private http: HttpClient) {}
  /**
   * Get schedule for a team on specified dates
   * (more info: https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#schedule)
   *
   * @param {Object} params - Request parameters object
   * @param {Number} params.teamId - Team ID
   * @param {String} params.startDate - Start date for fixtures
   * @param {String} params.endDate - Start date for fixtures
   *
   * @returns {Promise} - The request promise
   */
  getSchedule(params) {
    return this.http.get(`${this.baseUrl}${this.apiVersion}/schedule`, {
      params
    });
  }

  /**
   * Get highlights for a specific fixture
   *
   * @param {String} path - Request path string
   *
   * @returns {Promise} - The request promise
   */
  getHighlights(path) {
    return this.http.get(`${this.baseUrl}${path}`);
  }

  /**
   * Get current standings by division
   * (more info: https://gitlab.com/dword4/nhlapi/blob/master/stats-api.md#standings)
   *
   * @returns {Promise} - The request promise
   *
   */
  getStandingsByDivision() {
    return this.http.get(
      `${this.baseUrl}${this.apiVersion}/standings/byDivision`
    );
  }
}
