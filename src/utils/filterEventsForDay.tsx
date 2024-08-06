import {
  interval,
  areIntervalsOverlapping,
  startOfDay,
  endOfDay,
} from "date-fns";
import { Event } from "../Event";

export function filterEventsForDay(events: Event[], day: Date) {
  return events.filter((event) => {
    return areIntervalsOverlapping(
      interval(startOfDay(day), endOfDay(day)),
      interval(event.startDate, event.endDate)
    );
  });
}
