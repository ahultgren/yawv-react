import classnames from "classnames";
import { eachDayOfInterval, getHours, interval } from "date-fns";
import styles from "./WeekView.module.scss";
import { Props as HoursProps } from "./Hours";
import { filterEventsForDay } from "./utils/filterEventsForDay";
import { DisplayEvent } from "./DisplayEvent";
import { Event } from "./Event";

export type Props = {
  events: Event[];
  fromDate: Date;
  toDate: Date;
  from: HoursProps["from"];
};

export function Days({ fromDate, toDate, from, events }: Props) {
  const days = eachDayOfInterval(
    interval(fromDate, toDate, { assertPositive: true })
  );

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
        const startAt = getHours(event.startDate) - from + 1;
        const endAt = getHours(event.endDate) - from + 1;

        return (
          <DisplayEvent
            startAt={startAt}
            endAt={endAt}
            title={event.title}
            key={event.id}
          />
        );
      })}
    </div>
  );
}
