import { useContext } from "react";
import { WeekViewContext } from "./WeekViewContext";
import { getDate, getDay } from "date-fns";

export type Props = {
  days: Date[];
};

export function Header({ days }: Props) {
  const daynames = getDaynames(days);
  const { styles } = useContext(WeekViewContext);

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

const getName = (i: number) =>
  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i];

export function getDaynames(days: Date[]) {
  return days.map(getDay).map(getName);
}
