import { startOfWeek, endOfWeek } from "date-fns";
import { Days, Props as DayProps } from "./Days";
import { Event } from "./Event";
import { Header, Props as HeaderProps } from "./Header";
import { Hours, Props as HoursProps } from "./Hours";
import styles from "./WeekView.module.scss";

type Props = {
  startDay?: HeaderProps["startDay"];
  fromDate?: DayProps["fromDate"];
  toDate?: DayProps["toDate"];
  from?: HoursProps["from"];
  to?: HoursProps["to"];
  events?: Event[];
};

export function WeekView({
  startDay = 1,
  fromDate,
  toDate,
  from = 0,
  to = 24,
  events = [],
}: Props = {}) {
  fromDate = fromDate || startOfWeek(new Date());
  toDate = toDate || endOfWeek(new Date());

  return (
    <div className={styles.weekview}>
      <Header startDay={startDay}></Header>
      <Hours from={from} to={to}></Hours>
      <Days fromDate={fromDate} toDate={toDate} from={from} events={events} />
    </div>
  );
}
