import classnames from "classnames";
import {
  clamp,
  endOfDay,
  getHours,
  getMinutes,
  interval,
  startOfDay,
} from "date-fns";
import { useWeekView } from "../WeekViewContext";
import { Props as HoursProps } from "../Hours/Hours";
import { filterEventsForDay } from "./filterEventsForDay";
import { DisplayEvent } from "../Event/DisplayEvent";
import { Event } from "../Event/Event";

export type Props = {
  events: Event[];
  fromHour: HoursProps["fromHour"];
  toHour: HoursProps["toHour"];
};

export function Days({ fromHour, toHour, events }: Props) {
  const { styles, days } = useWeekView();

  return (
    <div className={styles.days}>
      {days.map((day) => {
        const eventsOfTheDay = filterEventsForDay(
          events,
          day,
          fromHour,
          toHour
        );
        return (
          <Day
            day={day}
            events={eventsOfTheDay}
            fromHour={fromHour}
            toHour={toHour}
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
  fromHour,
  toHour,
}: {
  day: Date;
  events: Event[];
  fromHour: HoursProps["fromHour"];
  toHour: HoursProps["toHour"];
}) {
  const { styles } = useWeekView();

  return (
    <div
      className={classnames("column", styles.column, styles.day)}
      data-date={day.toISOString()}
    >
      {events.map((event) => {
        const { startAt, endAt, startIsClipped, endIsClipped } =
          formatEventProps(event, day, fromHour, toHour);

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

function formatEventProps(
  event: Event,
  day: Date,
  fromHour: number,
  toHour: number
) {
  const startAt = clampToTimeRange(
    getTick(clampToSameDay(event.startDate, day)),
    fromHour,
    toHour
  );
  const endAt = clampToTimeRange(
    getTick(clampToSameDay(event.endDate, day)),
    fromHour,
    toHour
  );
  const startIsClipped = isClipped(startAt, event.startDate);
  const endIsClipped = isClipped(endAt, event.endDate);

  return {
    startAt: startAt - fromHour * 12 + 1,
    endAt: endAt - fromHour * 12 + 1,
    startIsClipped,
    endIsClipped,
  };
}

function clampToTimeRange(hour: number, from: number, to: number) {
  return Math.min(Math.max(hour, from * 12), to * 12);
}

function isClipped(hour: number, date: Date) {
  return getTick(date) !== hour;
}

function getTick(date: Date) {
  const hour = getHours(date);
  const minutes = getMinutes(date);

  return Math.round(hour * 12 + minutes / 5);
}

function clampToSameDay(date: Date, day: Date) {
  return clamp(date, interval(startOfDay(day), endOfDay(day)));
}
