import { useContext } from "react";
import { WeekViewContext } from "./WeekViewContext";
import { IntRange } from "./utils/IntRange";
import { range } from "./utils/range";

// TODO autodoc to generate docs in storybook?
export type Props = {
  from: IntRange<0, 24>;
  to: IntRange<1, 25>;
};

export function Hours({ from, to }: Props) {
  const { styles } = useContext(WeekViewContext);

  if (from >= to) {
    console.log(
      `WeekView: .from (${from}) must be less than .to (${to}). Resetting to default values (0 and 24).`
    );
    from = 0;
    to = 24;
  }

  const hours = range(from, to + 1);

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
