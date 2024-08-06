import { render, screen } from "@testing-library/react";
import { DisplayEvent } from "./DisplayEvent";

describe("Event", () => {
  test("renders event at the appropriate time", () => {
    render(<DisplayEvent {...{ startAt: 1, endAt: 3, title: "Event" }} />);

    expect(screen.getByText("Event")).toHaveStyle("grid-row-start: 1;");
    expect(screen.getByText("Event")).toHaveStyle("grid-row-end: 3;");
  });
});
