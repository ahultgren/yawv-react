import { render, screen } from "@testing-library/react";
import { Header, getDaynames } from "./Header";
import { eachDayOfInterval, interval } from "date-fns";

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
});

describe("Header", () => {
  test("renders titles for a full week", () => {
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
});
