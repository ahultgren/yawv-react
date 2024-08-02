import { Header } from "./Header";
import { Hours, Props as HoursProps } from "./Hours";
import styles from "./WeekView.module.scss";

type Props = {
  startDay?: number;
  from?: HoursProps["from"];
  to?: HoursProps["to"];
};

export function WeekView({ startDay = 1, from = 0, to = 24 }: Props = {}) {
  return (
    <div className={styles.weekview}>
      <Header startDay={startDay}></Header>
      <Hours from={from} to={to}></Hours>
    </div>
  );
}
