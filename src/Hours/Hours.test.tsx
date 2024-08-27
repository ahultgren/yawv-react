import { render, screen } from "@testing-library/react";
import { Hours } from "./Hours";
import { Locale } from "date-fns";
import { WeekViewProvider } from "../WeekViewContext";
import { sv } from "date-fns/locale";

describe("Hours", () => {
  describe("guards", () => {
    test("defaults if .to is less than .from", () => {
      render(<Hours fromHour={23} toHour={12} />);
      // TODO Can't figure out a good way to assert nor test this
    });
  });

  test("shows the time", () => {
    render(<Hours fromHour={10} toHour={18} />);

    expect(screen.getByText("10:00 AM")).toBeInTheDocument();
    expect(screen.getByText("6:00 PM")).toBeInTheDocument();
  });

  test("show time in the specified locale format", () => {
    render(<HoursWithLocale fromHour={10} toHour={18} locale={sv} />);

    expect(screen.getByText("10:00")).toBeInTheDocument();
    expect(screen.getByText("18:00")).toBeInTheDocument();
  });
});

function HoursWithLocale({
  fromHour,
  toHour,
  locale,
}: {
  fromHour: number;
  toHour: number;
  locale: Locale;
}) {
  return (
    <>
      <WeekViewProvider locale={locale}>
        <Hours fromHour={10} toHour={18} />
      </WeekViewProvider>
    </>
  );
}
