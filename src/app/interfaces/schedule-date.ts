import ScheduleEvent from "./schedule-event";
import Game from "./game";
import Match from "./match";

interface ScheduleDate {
    date: string;
    events: ScheduleEvent[];
    games: Game[];
    matches: Match[];
    totalEvents: number;
    totalGames: number;
    totalItems: number;
    totalMatches: number;
}
export default ScheduleDate;