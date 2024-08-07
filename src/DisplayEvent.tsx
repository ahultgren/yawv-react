import styles from "./WeekView.module.scss";
import classNames from "classnames";

export type DisplayEventProps = {
  title: string;
  startAt: number;
  endAt: number;
  startIsClipped: boolean;
  endIsClipped: boolean;
};

export function DisplayEvent({
  title,
  startAt,
  endAt,
  startIsClipped,
  endIsClipped,
}: DisplayEventProps) {
  return (
    <div
      className={classNames("event", styles.event, {
        [styles.eventStartIsClipped]: startIsClipped,
        [styles.eventEndIsClipped]: endIsClipped,
      })}
      style={{
        gridRowStart: startAt,
        gridRowEnd: endAt,
      }}
    >
      {title}
    </div>
  );
}
