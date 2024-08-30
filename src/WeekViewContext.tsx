import { createContext, useContext } from "react";
import defaultStyles from "./WeekView.module.scss";
import { Locale, enUS } from "date-fns/locale";
import { startOfWeek, endOfWeek, eachDayOfInterval, interval } from "date-fns";

const WeekViewContext = createContext({
  styles: defaultStyles,
  locale: enUS,
  days: [] as Date[],
});

export type Props = {
  children: React.ReactNode;
  styles?: typeof defaultStyles;
  locale?: Locale;
  fromDate?: Date;
  toDate?: Date;
};

export function WeekViewProvider({
  children,
  styles = defaultStyles,
  locale = enUS,
  fromDate,
  toDate,
}: Props) {
  fromDate = fromDate || startOfWeek(new Date(), { weekStartsOn: 1 });
  toDate = toDate || endOfWeek(new Date(), { weekStartsOn: 1 });

  const days = eachDayOfInterval(
    interval(fromDate, toDate, { assertPositive: true })
  );

  return (
    <WeekViewContext.Provider value={{ styles, locale, days }}>
      {children}
    </WeekViewContext.Provider>
  );
}

export function useWeekView() {
  return useContext(WeekViewContext);
}
