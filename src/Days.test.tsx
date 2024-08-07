import { render, screen } from "@testing-library/react";
import { eachDayOfInterval, interval } from "date-fns";
import { Days } from "./Days";
import styles from "./WeekView.module.scss";

describe("Days", () => {
  const fromDate = new Date("2024-08-05T00:00");
  const toDate = new Date("2024-08-11T00:00");
  const testWeek = eachDayOfInterval(
    interval(fromDate, toDate, { assertPositive: true })
  );

  test("renders a column for each day", () => {
    const { container } = render(
      <Days from={0} to={24} days={testWeek} events={[]} />
    );

    expect(container.querySelectorAll(".column").length).toEqual(7);
  });

  test("renders events in the appropriate column", () => {
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
      <Days from={0} to={24} days={testWeek} events={events} />
    );

    expect(container.querySelectorAll(".column")[0]?.children.length).toBe(1);
    expect(container.querySelectorAll(".column")[1]?.children.length).toBe(1);
    expect(container.querySelectorAll(".column")[2]?.children.length).toBe(0);
  });

  it("splits multi-day events", () => {
    const events = [
      {
        id: "mockid1",
        title: "Event",
        startDate: new Date("2024-08-05T18:00"),
        endDate: new Date("2024-08-06T11:00"),
      },
    ];
    render(<Days from={0} to={24} days={testWeek} events={events} />);

    const eventElements = screen.getAllByText("Event");

    expect(eventElements.length).toBe(2);
    expect(eventElements[0]).toHaveStyle("grid-row-start: 19;");
    expect(eventElements[0]).toHaveStyle("grid-row-end: 25;");
    expect(eventElements[0]).toHaveClass(styles.eventEndIsClipped);

    expect(eventElements[1]).toHaveStyle("grid-row-start: 1;");
    expect(eventElements[1]).toHaveStyle("grid-row-end: 12;");
    expect(eventElements[1]).toHaveClass(styles.eventStartIsClipped);
  });

  it("clips events starting before or ending after `from` and `to`", () => {
    const events = [
      {
        id: "mockid1",
        title: "Event",
        startDate: new Date("2024-08-05T05:00"),
        endDate: new Date("2024-08-05T11:00"),
      },
      {
        id: "mockid2",
        title: "Event",
        startDate: new Date("2024-08-05T15:00"),
        endDate: new Date("2024-08-05T21:00"),
      },
    ];

    render(<Days from={9} to={17} days={testWeek} events={events} />);

    const eventElements = screen.getAllByText("Event");

    expect(eventElements[0]).toHaveClass(styles.eventStartIsClipped);
    expect(eventElements[0]).not.toHaveClass(styles.eventEndIsClipped);
    expect(eventElements[1]).toHaveClass(styles.eventEndIsClipped);
    expect(eventElements[1]).not.toHaveClass(styles.eventStartIsClipped);
  });
});
