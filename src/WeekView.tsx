import { startOfWeek, endOfWeek, eachDayOfInterval, interval } from "date-fns";
import { Days } from "./Days";
import { Event } from "./Event";
import { Header } from "./Header";
import { Hours, Props as HoursProps } from "./Hours";
import { useContext } from "react";
import { WeekViewContext } from "./WeekViewContext";

export { WeekViewContext };

export type Props = {
  fromDate?: Date;
  toDate?: Date;
  fromHour?: HoursProps["fromHour"];
  toHour?: HoursProps["toHour"];
  events?: Event[];
};

/**
 * Render a grid of events in columns by day.
 */
export function WeekView({
  fromDate,
  toDate,
  fromHour = 0,
  toHour = 24,
  events = [],
}: Props = {}) {
  const { styles } = useContext(WeekViewContext);
  fromDate = fromDate || startOfWeek(new Date(), { weekStartsOn: 1 });
  toDate = toDate || endOfWeek(new Date(), { weekStartsOn: 1 });

  const days = eachDayOfInterval(
    interval(fromDate, toDate, { assertPositive: true })
  );

  return (
    <div className={styles.weekview}>
      <Header days={days}></Header>
      <Hours fromHour={fromHour} toHour={toHour}></Hours>
      <Days days={days} fromHour={fromHour} toHour={toHour} events={events} />
    </div>
  );
}
