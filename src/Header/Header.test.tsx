import { render, screen } from "@testing-library/react";
import { Header, getDaynames } from "./Header";
import { Locale, eachDayOfInterval, interval } from "date-fns";
import { sv } from "date-fns/locale";
import { WeekViewProvider } from "../WeekViewContext";

describe("getDaynames()", () => {
  test("starts on a monday", () => {
    expect(getDaynames([new Date("2024-08-05T00:00")])[0]).toEqual("Mon");
  });
  test("starts on a sunday", () => {
    expect(getDaynames([new Date("2024-08-04T00:00")])[0]).toEqual("Sun");
  });
  test("starts on a friday", () => {
    expect(getDaynames([new Date("2024-08-09T00:00")])[0]).toEqual("Fri");
  });
  describe("supports locale", function () {
    expect(getDaynames([new Date("2024-08-09T00:00")], sv)[0]).toEqual("fre");
  });
});

describe("Header", () => {
  test("renders day names for a full week", () => {
    const fromDate = new Date("2024-08-05T00:00");
    const toDate = new Date("2024-08-11T00:00");
    const days = eachDayOfInterval(
      interval(fromDate, toDate, { assertPositive: true })
    );

    render(<Header days={days} />);

    ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => {
      const title = screen.getByText(new RegExp(day, "i"));
      expect(title).toBeInTheDocument();
    });
  });

  test("renders localized day names", () => {
    const fromDate = new Date("2024-08-05T00:00");
    const toDate = new Date("2024-08-11T00:00");
    const days = eachDayOfInterval(
      interval(fromDate, toDate, { assertPositive: true })
    );

    render(<HeaderWithLocale days={days} locale={sv} />);

    ["mån", "tis", "ons", "tor", "fre", "lör", "sön"].map((day) => {
      const title = screen.getByText(new RegExp(day, "i"));
      expect(title).toBeInTheDocument();
    });
  });
});

function HeaderWithLocale({ days, locale }: { days: Date[]; locale: Locale }) {
  return (
    <>
      <WeekViewProvider locale={locale}>
        <Header days={days} />
      </WeekViewProvider>
    </>
  );
}
