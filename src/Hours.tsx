import { useContext } from "react";
import { WeekViewContext } from "./WeekViewContext";
import { IntRange } from "./utils/IntRange";
import { range } from "./utils/range";

// TODO autodoc to generate docs in storybook?
export type Props = {
  fromHour: IntRange<0, 24>;
  toHour: IntRange<1, 25>;
};

export function Hours({ fromHour, toHour }: Props) {
  const { styles } = useContext(WeekViewContext);

  if (fromHour >= toHour) {
    console.log(
      `WeekView: .from (${fromHour}) must be less than .to (${toHour}). Resetting to default values (0 and 24).`
    );
    fromHour = 0;
    toHour = 24;
  }

  const hours = range(fromHour, toHour + 1);

  return (
    <div className={styles.column + " " + styles.hours}>
      {hours.map((hour) => (
        <div className={styles.hourTitle} key={hour}>
          {hour}:00
        </div>
      ))}
    </div>
  );
}
