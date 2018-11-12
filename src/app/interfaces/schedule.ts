import ScheduleDate from "./schedule-date";

interface Schedule {
    copyright: string;
    dates: ScheduleDate[];
    totalEvents: number;
    totalGames: number;
    totalItems: number;
    totalMatches: number;
}
export default Schedule;