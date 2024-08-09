import classNames from "classnames";
import { useContext } from "react";
import { WeekViewContext } from "../WeekViewContext";

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
  const { styles } = useContext(WeekViewContext);

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