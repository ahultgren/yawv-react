import { Locale, format, setHours, setMinutes } from "date-fns";
import { useWeekView } from "../WeekViewContext";
import { IntRange } from "../utils/IntRange";
import { range } from "../utils/range";

// TODO autodoc to generate docs in storybook?
export type Props = {
  fromHour: IntRange<0, 24>;
  toHour: IntRange<1, 25>;
};

export function Hours({ fromHour, toHour }: Props) {
  if (fromHour >= toHour) {
    console.log(
      `WeekView: .from (${fromHour}) must be less than .to (${toHour}). Resetting to default values (0 and 24).`
    );
    fromHour = 0;
    toHour = 24;
  }

  const { styles, locale } = useWeekView();
  const hours = range(fromHour, toHour + 1);

  return (
    <div className={styles.column + " " + styles.hours}>
      {hours.map((hour) => (
        <div className={styles.hourTitle} key={hour}>
          {formatHour(locale, hour)}
        </div>
      ))}
    </div>
  );
}

const formatHour = (locale: Locale, hour: number) =>
  format(setMinutes(setHours(new Date(), hour), 0), "p", { locale });
