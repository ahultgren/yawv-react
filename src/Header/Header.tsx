import { useWeekView } from "../WeekViewContext";
import { Locale, formatWithOptions, getDate } from "date-fns/fp";

export function Header() {
  const { styles, locale, days } = useWeekView();
  const daynames = getDaynames(days, locale);

  return (
    <div className={styles.header}>
      {daynames.map((day, i) => (
        <div className={styles.dayTitle} key={i}>
          <div className={styles.dayTitleDate}>{getDate(days[i])}</div>
          <div className={styles.dayTitleName}>{day}</div>
        </div>
      ))}
    </div>
  );
}

export function getDaynames(
  days: Date[],
  locale: Locale | undefined = undefined
) {
  return days.map(formatWithOptions({ locale }, "EEE"));
}
