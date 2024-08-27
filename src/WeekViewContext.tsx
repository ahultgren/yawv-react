import { createContext, useContext } from "react";
import defaultStyles from "./WeekView.module.scss";
import { Locale, enUS } from "date-fns/locale";

export type Props = {
  children: React.ReactNode;
  styles?: typeof defaultStyles;
  locale?: Locale;
};

const WeekViewContext = createContext({
  styles: defaultStyles,
  locale: enUS,
});

export function WeekViewProvider({
  children,
  styles = defaultStyles,
  locale = enUS,
}: Props) {
  return (
    <WeekViewContext.Provider value={{ styles, locale }}>
      {children}
    </WeekViewContext.Provider>
  );
}

export function useWeekView() {
  return useContext(WeekViewContext);
}
