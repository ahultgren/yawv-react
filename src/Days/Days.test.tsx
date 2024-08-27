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
      <Days fromHour={0} toHour={24} days={testWeek} events={[]} />
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
      <Days fromHour={0} toHour={24} days={testWeek} events={events} />
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
    render(<Days fromHour={0} toHour={24} days={testWeek} events={events} />);

    const eventElements = screen.getAllByText("Event");

    expect(eventElements.length).toBe(2);
    expect(eventElements[0]).toHaveStyle(`grid-row-start: ${18 * 12 + 1};`);
    expect(eventElements[0]).toHaveStyle(`grid-row-end: ${24 * 12 + 1};`);
    expect(eventElements[0]).toHaveClass(styles.eventEndIsClipped);

    expect(eventElements[1]).toHaveStyle(`grid-row-start: 1;`);
    expect(eventElements[1]).toHaveStyle(`grid-row-end: ${11 * 12 + 1};`);
    expect(eventElements[1]).toHaveClass(styles.eventStartIsClipped);
  });

  it("renders events with 5-min increments", () => {
    const events = [
      {
        id: "mockid1",
        title: "Event",
        startDate: new Date("2024-08-05T00:05"),
        endDate: new Date("2024-08-05T00:25"),
      },
      {
        id: "mockid2",
        title: "Event",
        startDate: new Date("2024-08-05T11:05"),
        endDate: new Date("2024-08-05T12:00"),
      },
    ];

    render(<Days fromHour={0} toHour={24} days={testWeek} events={events} />);
    const eventElements = screen.getAllByText("Event");

    expect(eventElements[0]).toHaveStyle(`grid-row-start: 2;`);
    expect(eventElements[0]).toHaveStyle(`grid-row-end: 6;`);

    expect(eventElements[1]).toHaveStyle(`grid-row-start: ${11 * 12 + 2};`);
    expect(eventElements[1]).toHaveStyle(`grid-row-end: ${12 * 12 + 1};`);
  });

  it("rounds to nearest 5 min tick", () => {
    const events = [
      {
        id: "mockid1",
        title: "Event",
        startDate: new Date("2024-08-05T00:06"),
        endDate: new Date("2024-08-05T00:24"),
      },
      {
        id: "mockid2",
        title: "Event",
        startDate: new Date("2024-08-05T11:07"),
        endDate: new Date("2024-08-05T11:58"),
      },
    ];

    render(<Days fromHour={0} toHour={24} days={testWeek} events={events} />);
    const eventElements = screen.getAllByText("Event");

    expect(eventElements[0]).toHaveStyle(`grid-row-start: 2;`);
    expect(eventElements[0]).toHaveStyle(`grid-row-end: 6;`);

    expect(eventElements[1]).toHaveStyle(`grid-row-start: ${11 * 12 + 2};`);
    expect(eventElements[1]).toHaveStyle(`grid-row-end: ${12 * 12 + 1};`);
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

    render(<Days fromHour={9} toHour={17} days={testWeek} events={events} />);

    const eventElements = screen.getAllByText("Event");

    expect(eventElements[0]).toHaveClass(styles.eventStartIsClipped);
    expect(eventElements[0]).not.toHaveClass(styles.eventEndIsClipped);
    expect(eventElements[1]).toHaveClass(styles.eventEndIsClipped);
    expect(eventElements[1]).not.toHaveClass(styles.eventStartIsClipped);
  });

  it("discards events outside of time range", () => {
    const events = [
      {
        id: "mockid1",
        title: "Event",
        startDate: new Date("2024-08-05T05:00"),
        endDate: new Date("2024-08-05T06:00"),
      },
      {
        id: "mockid2",
        title: "Event",
        startDate: new Date("2024-08-05T20:00"),
        endDate: new Date("2024-08-05T21:00"),
      },
    ];

    render(<Days fromHour={9} toHour={17} days={testWeek} events={events} />);

    expect(screen.queryByText("Event")).not.toBeInTheDocument();
  });
});
