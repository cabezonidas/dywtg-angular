import LeagueRecord from "./league-record";
import Team from "./team";

interface Game {
    content: {
        link: string;
    }
    gameDate: Date;
    gamePk: number;
    gameType: string;
    link: string;
    season: string;
    status: {
        abstractGameState: string;
        codedGameState: string;
        detailedState: string;
        startTimeTBD: boolean;
        statusCode: string;
    }
    teams: {
        away: {
            leagueRecord: LeagueRecord
            score: number;
            team: Team;
        };
        home: {
            leagueRecord: LeagueRecord
            score: number;
            team: Team;
        }
    };
    venue: {
        link: string;
        name: string;
    }
}
export default Game;