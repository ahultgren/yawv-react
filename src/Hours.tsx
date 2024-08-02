import styles from "./WeekView.module.scss";

// TODO autodoc to generate docs in storybook?
export type Props = {
  from: IntRange<0, 24>;
  to: IntRange<1, 25>;
};

export function Hours({ from, to }: Props) {
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

function range(from: number, to: number): ReadonlyArray<number> {
  return [...Array(to - from).keys()].map((i) => i + from);
}

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;
