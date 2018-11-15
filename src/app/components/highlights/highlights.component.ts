import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import Game from 'src/app/interfaces/game';
import { ApiService } from 'src/app/services/api.service';
import { map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.css']
})
export class HighlightsComponent implements OnChanges, OnDestroy {

  @Input() game: Game;
  @Input() currentTeam: number;
  highlightVideo: string;
  result: string;
  highlightsSub = new Subscription();
  constructor(private api: ApiService) { }

  ngOnChanges() {
    this.highlightsSub = this.api.getHighlights(this.game.content.link).pipe(
      map(gameHighlights => gameHighlights.media.epg.find(epg => epg.title === 'Extended Highlights')),
      filter(epg => !!epg && !!epg.items && epg.items.length > 0),
      map(epg => epg.items[0].playbacks),
      filter(playbacks => !!playbacks && playbacks.length > 0),
    ).subscribe(playbacks => {
      this.highlightVideo = playbacks.reverse()[0].url;
      this.result = this.getGameResultsData();
    })
  }
  getResultString(team1Score, team2Score) {
    let winLossDraw;
    if (team1Score > team2Score) {
      winLossDraw = "Win";
    } else if (team1Score < team2Score) {
      winLossDraw = "Loss";
    } else {
      winLossDraw = "Draw";
    }

    return `${winLossDraw} ${team1Score} - ${team2Score}`;
  }

  // Get the results data from a fixture
  getGameResultsData() {
    const homeTeamId = this.game.teams.home.team.id;
    const homeTeamScore = this.game.teams.home.score;
    const awayTeamScore = this.game.teams.away.score;

    // check if home team is the current team and get result string
    return homeTeamId === this.currentTeam
      ? this.getResultString(homeTeamScore, awayTeamScore)
      : this.getResultString(awayTeamScore, homeTeamScore);
  }

  ngOnDestroy() {
    this.highlightsSub.unsubscribe();
  }

}
