import React from "react";
import { render, screen } from "@testing-library/react";
import { Header, getDays } from "./Header";

describe("getDays()", () => {
  test("starts on a monday", () => {
    expect(getDays({ startDay: 1 })[0]).toEqual("Monday");
  });
  test("starts on a sunday", () => {
    expect(getDays({ startDay: 0 })[0]).toEqual("Sunday");
  });
  test("starts on a friday", () => {
    expect(getDays({ startDay: 5 })[0]).toEqual("Friday");
  });
});

describe("Header", () => {
  test("renders titles for a full week", () => {
    render(<Header startDay={1} />);

    [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ].map((day) => {
      const title = screen.getByText(new RegExp(day, "i"));
      expect(title).toBeInTheDocument();
    });
  });

  test("starts on Sunday", () => {
    render(<Header startDay={0} />);

    const monday = screen.getByText("Monday");
    const sunday = screen.getByText("Sunday");
    expect(sunday.compareDocumentPosition(monday)).toEqual(
      monday.DOCUMENT_POSITION_FOLLOWING
    );
  });
});
