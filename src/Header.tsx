import styles from "./WeekView.module.scss";

export function Header({ startDay = 1 }: { startDay?: number } = {}) {
  const days = getDays({ startDay });

  return (
    <div className={styles.header}>
      {days.map((day) => (
        <div className={styles.dayTitle} key={day}>
          {day}
        </div>
      ))}
    </div>
  );
}

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

type DayArgs = {
  startDay: number;
};

export function getDays({ startDay }: DayArgs) {
  if (startDay === 0) {
    return weekdays;
  }

  return [...weekdays.slice(startDay), ...weekdays.slice(0, startDay)];
}
