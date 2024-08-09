import { interval, areIntervalsOverlapping, setHours } from "date-fns";
import { Event } from "../Event/Event";

export function filterEventsForDay(
  events: Event[],
  day: Date,
  from: number,
  to: number
) {
  return events.filter((event) => {
    return areIntervalsOverlapping(
      interval(setHours(day, from), setHours(day, to)),
      interval(event.startDate, event.endDate)
    );
  });
}
