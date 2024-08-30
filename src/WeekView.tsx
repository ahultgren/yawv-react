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
    <WeekViewProvider
      styles={styles}
      locale={locale}
      fromDate={fromDate}
      toDate={toDate}
    >
      <WeekViewRender fromHour={fromHour} toHour={toHour} events={events} />
    </WeekViewProvider>
  );
}

type WeekViewRenderProps = {
  fromHour?: HoursProps["fromHour"];
  toHour?: HoursProps["toHour"];
  events?: Event[];
};

function WeekViewRender({
  fromHour = 0,
  toHour = 24,
  events = [],
}: WeekViewRenderProps = {}) {
  const { styles } = useWeekView();

  return (
    <div className={styles.weekview}>
      <Header></Header>
      <Hours fromHour={fromHour} toHour={toHour}></Hours>
      <Days fromHour={fromHour} toHour={toHour} events={events} />
    </div>
  );
}
