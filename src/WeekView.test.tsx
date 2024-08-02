import React from "react";
import { render, screen } from "@testing-library/react";
import { WeekView } from "./WeekView";

test("renders", () => {
  render(<WeekView />);
});
