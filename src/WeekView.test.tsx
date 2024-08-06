import React from "react";
import { render, screen } from "@testing-library/react";
import { WeekView } from "./WeekView";

describe("WeekView", () => {
  test("renders", () => {
    render(<WeekView />);
  });

  test("starts on Monday by default", () => {
    render(<WeekView />);

    const monday = screen.getByText("Monday");
    const sunday = screen.getByText("Sunday");
    expect(monday.compareDocumentPosition(sunday)).toEqual(
      monday.DOCUMENT_POSITION_FOLLOWING
    );
  });
});
