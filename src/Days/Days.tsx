import classnames from "classnames";
import {
  clamp,
  endOfDay,
  getHours,
  getMinutes,
  interval,
  startOfDay,
} from "date-fns";
import { useContext } from "react";
import { useWeekView } from "../WeekViewContext";
import { Props as HoursProps } from "../Hours/Hours";
import { filterEventsForDay } from "./filterEventsForDay";
import { DisplayEvent } from "../Event/DisplayEvent";
import { Event } from "../Event/Event";

export type Props = {
  events: Event[];
  days: Date[];
  fromHour: HoursProps["fromHour"];
  toHour: HoursProps["toHour"];
};

export function Days({ days, fromHour, toHour, events }: Props) {
  const { styles } = useWeekView();

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
    getClosestHour(clampToSameDay(event.startDate, day)),
    fromHour,
    toHour
  );
  const endAt = clampToTimeRange(
    getClosestHour(clampToSameDay(event.endDate, day)),
    fromHour,
    toHour
  );
  const startIsClipped = isClipped(startAt, event.startDate);
  const endIsClipped = isClipped(endAt, event.endDate);

  return {
    startAt: startAt - fromHour + 1,
    endAt: endAt - fromHour + 1,
    startIsClipped,
    endIsClipped,
  };
}

function clampToTimeRange(hour: number, from: number, to: number) {
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
