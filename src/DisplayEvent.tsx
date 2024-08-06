import styles from "./WeekView.module.scss";
import classNames from "classnames";

export type DisplayEventProps = {
  title: string;
  startAt: number;
  endAt: number;
};

export function DisplayEvent({ title, startAt, endAt }: DisplayEventProps) {
  return (
    <div
      className={classNames("event", styles.event)}
      style={{
        gridRowStart: startAt,
        gridRowEnd: endAt,
      }}
    >
      {title}
    </div>
  );
}
