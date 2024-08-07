import { getDay } from "date-fns";
import styles from "./WeekView.module.scss";

export type Props = {
  days: Date[];
};

export function Header({ days }: Props) {
  const daynames = getDaynames(days);

  return (
    <div className={styles.header}>
      {daynames.map((day, i) => (
        <div className={styles.dayTitle} key={i}>
          {day}
        </div>
      ))}
    </div>
  );
}

const getName = (i: number) =>
  [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][i];

export function getDaynames(days: Date[]) {
  return days.map(getDay).map(getName);
}
