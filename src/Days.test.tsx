import { render, screen } from "@testing-library/react";
import { Days } from "./Days";

describe("Days", () => {
  test("renders a column for each day", () => {
    const fromDate = new Date("2024-08-05T00:00");
    const toDate = new Date("2024-08-11T00:00");
    const { container } = render(
      <Days from={0} fromDate={fromDate} toDate={toDate} events={[]} />
    );

    expect(container.querySelectorAll(".column").length).toEqual(7);
  });

  test("renders events in the appropriate column", () => {
    const fromDate = new Date("2024-08-05T00:00");
    const toDate = new Date("2024-08-11T00:00");

    const events = [
      {
        id: "mockid1",
        title: "Event",
        startDate: new Date("2024-08-05T10:00"),
        endDate: new Date("2024-08-05T11:00"),
      },
      {
        id: "mockid2",
        title: "Event",
        startDate: new Date("2024-08-06T10:00"),
        endDate: new Date("2024-08-06T11:00"),
      },
    ];
    const { container } = render(
      <Days from={0} fromDate={fromDate} toDate={toDate} events={events} />
    );

    expect(container.querySelectorAll(".column")[0]?.children.length).toBe(1);
    expect(container.querySelectorAll(".column")[1]?.children.length).toBe(1);
    expect(container.querySelectorAll(".column")[2]?.children.length).toBe(0);
  });

  // TODO Events spanning multiple days (and their formatting (test a util))
});
