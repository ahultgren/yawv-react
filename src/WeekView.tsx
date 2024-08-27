import { startOfWeek, endOfWeek, eachDayOfInterval, interval } from "date-fns";
import { Days } from "./Days/Days";
import { Event } from "./Event/Event";
import { Header } from "./Header/Header";
import { Hours, Props as HoursProps } from "./Hours/Hours";
import {
  Props as WeekViewContextProps,
  WeekViewProvider,
  useWeekView,
} from "./WeekViewContext";

export type Props = {
  fromDate?: Date;
  toDate?: Date;
  fromHour?: HoursProps["fromHour"];
  toHour?: HoursProps["toHour"];
  events?: Event[];
  styles?: WeekViewContextProps["styles"];
  locale?: WeekViewContextProps["locale"];
};

/* Comment block used by Storybook:*/

/**
 * Demonstrates all the features of WeekView. Use the controls below to play
 * with the number of days or hours, for example.
 */
export function WeekView({
  fromDate,
  toDate,
  fromHour = 0,
  toHour = 24,
  events = [],
  styles,
  locale,
}: Props = {}) {
  return (
    <WeekViewProvider styles={styles} locale={locale}>
      <WeekViewRender
        styles={styles}
        fromDate={fromDate}
        toDate={toDate}
        fromHour={fromHour}
        toHour={toHour}
        events={events}
      />
    </WeekViewProvider>
  );
}

function WeekViewRender({
  fromDate,
  toDate,
  fromHour = 0,
  toHour = 24,
  events = [],
}: Props = {}) {
  const { styles } = useWeekView();

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
