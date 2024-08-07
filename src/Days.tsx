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
};

export function Days({ days, from, events }: Props) {
  return (
    <div className={styles.days}>
      {days.map((day) => {
        const eventsOfTheDay = filterEventsForDay(events, day);
        return (
          <Day
            day={day}
            events={eventsOfTheDay}
            from={from}
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
}: {
  day: Date;
  events: Event[];
  from: HoursProps["from"];
}) {
  return (
    <div
      className={classnames("column", styles.column, styles.day)}
      data-date={day.toISOString()}
    >
      {events.map((event) => {
        const { startAt, endAt, startIsClipped, endIsClipped } =
          formatEventProps(event, day, from);

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

function formatEventProps(event: Event, day: Date, from: number) {
  const startAt = getClosestHours(clampToSameDay(event.startDate, day));
  const endAt = getClosestHours(clampToSameDay(event.endDate, day));
  const startIsClipped = isClipped(startAt, event.startDate);
  const endIsClipped = isClipped(endAt, event.endDate);

  return {
    startAt: startAt - from + 1,
    endAt: endAt - from + 1,
    startIsClipped,
    endIsClipped,
  };
}

function isClipped(hours: number, date: Date) {
  return getHours(date) !== hours;
}

function getClosestHours(date: Date) {
  const hours = getHours(date);
  const minutes = getMinutes(date);

  return Math.round(hours + minutes / 60);
}

function clampToSameDay(date: Date, day: Date) {
  return clamp(date, interval(startOfDay(day), endOfDay(day)));
}
