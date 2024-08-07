import classnames from "classnames";
import {
  clamp,
  endOfDay,
  getHours,
  getMinutes,
  interval,
  startOfDay,
} from "date-fns";
import styles from "./WeekView.module.scss";
import { Props as HoursProps } from "./Hours";
import { filterEventsForDay } from "./utils/filterEventsForDay";
import { DisplayEvent } from "./DisplayEvent";
import { Event } from "./Event";

export type Props = {
  events: Event[];
  days: Date[];
  from: HoursProps["from"];
  to: HoursProps["to"];
};

export function Days({ days, from, to, events }: Props) {
  return (
    <div className={styles.days}>
      {days.map((day) => {
        const eventsOfTheDay = filterEventsForDay(events, day, from, to);
        return (
          <Day
            day={day}
            events={eventsOfTheDay}
            from={from}
            to={to}
            key={day.toISOString()}
          />
        );
      })}
    </div>
  );
}

function Day({
  day,
  events,
  from,
  to,
}: {
  day: Date;
  events: Event[];
  from: HoursProps["from"];
  to: HoursProps["to"];
}) {
  return (
    <div
      className={classnames("column", styles.column, styles.day)}
      data-date={day.toISOString()}
    >
      {events.map((event) => {
        const { startAt, endAt, startIsClipped, endIsClipped } =
          formatEventProps(event, day, from, to);

        return (
          <DisplayEvent
            startAt={startAt}
            endAt={endAt}
            startIsClipped={startIsClipped}
            endIsClipped={endIsClipped}
            title={event.title}
            key={event.id}
          />
        );
      })}
    </div>
  );
}

function formatEventProps(event: Event, day: Date, from: number, to: number) {
  const startAt = clampToTimeRange(
    getClosestHour(clampToSameDay(event.startDate, day)),
    from,
    to
  );
  const endAt = clampToTimeRange(
    getClosestHour(clampToSameDay(event.endDate, day)),
    from,
    to
  );
  const startIsClipped = isClipped(startAt, event.startDate);
  const endIsClipped = isClipped(endAt, event.endDate);

  return {
    startAt: startAt - from + 1,
    endAt: endAt - from + 1,
    startIsClipped,
    endIsClipped,
  };
}

function clampToTimeRange(hour, from, to) {
  return Math.min(Math.max(hour, from), to);
}

function isClipped(hour: number, date: Date) {
  return getHours(date) !== hour;
}

function getClosestHour(date: Date) {
  const hour = getHours(date);
  const minutes = getMinutes(date);

  return Math.round(hour + minutes / 60);
}

function clampToSameDay(date: Date, day: Date) {
  return clamp(date, interval(startOfDay(day), endOfDay(day)));
}
