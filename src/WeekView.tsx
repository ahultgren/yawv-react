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
  from?: HoursProps["from"];
  to?: HoursProps["to"];
  events?: Event[];
};

export function WeekView({
  fromDate,
  toDate,
  from = 0,
  to = 24,
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
      <Hours from={from} to={to}></Hours>
      <Days days={days} from={from} to={to} events={events} />
    </div>
  );
}
